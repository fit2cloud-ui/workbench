<template>
  <div class="workbench-lumino" id="workflow-panel">
    <div ref="main" id="main" class="pa-4 fill-height" :style="{'min-height': minHeight}"></div>
    <div v-show="false">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import LuminoWidget from "./lumino-widget";
import { CommandRegistry } from "@lumino/commands";
import { BoxPanel, DockPanel, Widget, ContextMenu } from "@lumino/widgets";
/**
 * A component to wrap the Lumino application.
 *
 * It will create a BoxPanel (left to right, no gutters) with a dock
 * panel. Each component created in the default slot will be added
 * to an invisible area.
 *
 * Upon creation, the component will take care to transfer the $el
 * of each children component to the Lumino widget div, creating the
 * impression that the component was created inside the tab/widget.
 *
 * Lumino uses DOM, and Vue the VDOM. So this is an approach that
 * works, but there could be alternative approaches too. Feel free
 * to adapt it to your use case as necessary.
 *
 * @since 0.2
 */

export default {
  name: "Lumino",

  props: {
    tabTitleProp: {
      type: String,
      default: "name",
    },
    height: {
      type: [Number, String],
      default: 200,
    },
    contextmenu: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    height() {
      this.main.update();
    },
  },
  computed: {
    minHeight() {
      return `calc(100vh - ${this.height}px - 70px)`;
    },
  },

  /**
   * Data for the Lumino component
   */
  data() {
    return {
      // create a box panel, which holds the dock panel, and controls its layout
      main: new BoxPanel({ direction: "left-to-right", spacing: 0 }),
      // create dock panel, which holds the widgets
      dock: new DockPanel(),
      widgets: [],
      myLuminoWidget: [],
    };
  },

  /**
   * Here we define the ID's for the Lumino DOM elements, and add the Dock panel to the main
   * Box panel. In the next tick of Vue, the DOM element and the Vue element/ref are attached.
   */
  created() {
    this.dock.id = "dock";
    this.main.id = "main";
    this.main.addWidget(this.dock);
    window.onresize = () => {
      this.main.update();
    };
    BoxPanel.setStretch(this.dock, 1);
    const vm = this;
    this.$nextTick(() => {
      Widget.attach(vm.main, vm.$refs.main);
      this.syncWidgets();
    });
    this.createContextmenu();
  },

  /**
   * Every time a new child element is added to the slot, this method will
   * be called. It will iterate the children elements looking for new ones
   * to add.
   *
   * The removal is handled via event listeners from Lumino.
   */
  updated() {
    this.syncWidgets();
  },

  methods: {
    /**
     * Iterates through the component children, looking for newly created
     * components, and then creates a related Lumino Widget for this component.
     */
    syncWidgets() {
      const tabTitleProp = this.$props.tabTitleProp;
      this.$children
        .filter((child) => !this.widgets.includes(child.$attrs.id))
        .forEach((newChild) => {
          const id = `${newChild.$attrs.id}`;
          const name = newChild.$attrs[tabTitleProp]
            ? newChild.$attrs[tabTitleProp]
            : newChild.$options.name;
          const iconClass = newChild.$attrs?.iconClass;
          this.addWidget({ id, name, iconClass });
          this.$nextTick(() => {
            document.getElementById(id).appendChild(newChild.$el);
          });
        });
    },

    createContextmenu() {
      if (this.contextmenu.length > 0) {
        let commands = new CommandRegistry();
        this.contextmenu.map((item) => {
          if (item.type !== "divided") {
            commands.addCommand(item.id, item);
            item.key &&
              commands.addKeyBinding({
                keys: [item.key],
                selector: "body",
                command: item.id,
              });
          }
        });
        let menu = new ContextMenu({ commands: commands });

        document.addEventListener("contextmenu", (event) => {
          if (menu.open(event)) {
            event.preventDefault();
            this.onWidgetContextmenu(event);
          }
        });
        this.contextmenu.forEach((item) => {
          if (item.type === "divided") {
            menu.addItem({
              type: "separator",
              selector: ".lm-TabBar-tab",
            });
          } else {
            menu.addItem({
              command: item.id,
              selector: ".lm-TabBar-tab",
            });
          }
        });
      }
    },

    /**
     * Create a widget.
     *
     * @param id {String} - widget ID
     * @param name {String} - widget name
     * @param iconClass {String} - widget iconClass
     */
    addWidget({ id, name, iconClass }) {
      this.widgets.push(id);
      const luminoWidget = new LuminoWidget(
        id,
        name,
        iconClass,
        /* closable */ true
      );
      this.dock.addWidget(luminoWidget);
      this.dock.activateWidget(luminoWidget);
      this.myLuminoWidget.push(luminoWidget);
      // give time for Lumino's widget DOM element to be created
      this.$nextTick(() => {
        document
          .getElementById(id)
          .addEventListener("lumino:activated", this.onWidgetActivated);
        document
          .getElementById(id)
          .addEventListener("lumino:deleted", this.onWidgetDeleted);
      });
    },

    /**
     * Activate a widget.
     *
     * @param id {String} - widget ID
     */
    activateWidget(id) {
      const luminoWidget = this.myLuminoWidget.filter(
        (item) => item.id === id
      )[0];
      this.dock.activateWidget(luminoWidget);
    },

    /**
     * React to a activated event.
     *
     * @param customEvent {
     *   detail: {
     *     id: string,
     *     name: string,
     *     iconClass: string,
     *     closable: boolean
     *   }
     * }}
     */
    onWidgetActivated(customEvent) {
      this.$emit("lumino:activated", customEvent.detail);
    },

    /**
     * React to a deleted event.
     *
     * @param customEvent {
     *   detail: {
     *     id: string,
     *     name: string,
     *     iconClass: string,
     *     closable: boolean
     *   }
     * }}
     */
    onWidgetDeleted(customEvent) {
      const id = customEvent.detail.id;
      this.widgets.splice(this.widgets.indexOf(id), 1);
      document
        .getElementById(id)
        .removeEventListener("lumino:deleted", this.onWidgetDeleted);
      document
        .getElementById(id)
        .removeEventListener("lumino:activated", this.onWidgetActivated);
      this.$emit("lumino:deleted", customEvent.detail);
    },

    /**
     * React to a contextmenu event.
     *
     */
    onWidgetContextmenu(event) {
      let id = "";
      const node = event.target;
      if (node?.dataset?.id) {
        id = event.target?.dataset?.id;
      } else {
        id = node.parentNode?.dataset?.id;
      }
      this.$emit("lumino:contextmenu", id);
    },
  },
};
</script>

<style lang="scss">
</style>
