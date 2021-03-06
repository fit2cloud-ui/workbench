# f2c-workbench

f2c-workbench 是基于浏览器的工作台前端框架组件，提供可拖拽的分割面板、以及工作台的基本结构和样式

在线预览网址：https://fit2cloud-ui.github.io/workbench

## 安装

推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

```sh
npm install f2c-workbench
```

因为需要使用scss，所以需要安装sass，(sass-loader要求11以下)

```sh
npm install -D sass-loader@10.1.0 sass@1.43.4
```

## 引入

```js
import Workbench from "f2c-workbench"
import "f2c-workbench/src/styles/index.scss";

Vue.use(Workbench);
```

## 使用

```js
<workbench ref="workbench" :title="title">

</workbench>
```

## API 文档

### Attributes
 参数 |  说明  |  类型  |  可选值  |  默认值  |
 --- | ------| :-----: | :----: | :------: 
 title       | 头部标题 | String | - | - 
 app-menu    | 头部导航 | Array | - | -
 logo  | 头部Logo | String | - | -
 sidebar | 左侧侧边栏导航 | Array | - | - 
 footerClass | 定义footer ClassName | String | - | -
 footerStyle | 定义footer Style | Object | - | -
 :visible-bottom-panel | 内容面板是否显示bottom面板（终端面板） | Boolean | - | false
 :visible-left-panel | 自定义的状态下控制左侧面板是否展开 | Boolean | - | false
 contextmenu | 内容面板右键tab时菜单 | Array | - | -

### Events
  事件名 |  说明 |  参数	
 --------- | ---------- | -------- | 
 changeSidebar  | 左侧侧边栏菜单切换时触发的事件 | 当前菜单的实例 
 actived  | 内容面板标签被激活时触发 | { id, name, icon, iconClass, closable }
 deleted  | 内容面板标签被删除时触发 | { id, name, icon, iconClass, closable }
 onContextmenu | 如果使用contextmenu属性时，内容面板标签被右键时触发 | id
 drop  | 内容面板使用draggable时，当拖到内容面板区域并释放时触发 | -

### Methods
  方法名    |    说明   |  参数  
 --------- | ---------- | -------- 
 activate   | 激活内容面板某个标签（需使用ref） | id  

### Slot
  name    |    说明    
 --------- | ---------- 
  —— | 内容面板的内容 
 sidebar | 左侧侧边栏的内容 
 sidebar-components | 左侧侧边栏展开后的内容 
 footer | footer的内容 
 bottom-panel | 内容面板中bottom面板的内容（终端面板）

### app-menu Attributes
   参数  |    说明   |   类型 | 可选值 | 默认值
 ----- | -------- | :------: | :-----: | :-----: 
 name  | 菜单名称 | String | - | - 
 icon  | 图标（class）| String | - | - 
 submenu  | 子菜单 | Array | - | - 

### submenu Attributes
  参数 |  说明  |   类型   |  可选值  |  默认值  
  -----  | ------ | :------: | :------: | :-------:
 name    | 菜单名称 | String | - | - 
 submenu   | 子菜单（如果有hotkey，该属性失效） | Array | - | - 
 hotkey    | 快捷键（如果有submenu，该属性失效） | String | - | - 
 divided   | 分割线 | Boolean | - | false 
 isSet   | 是否已选择 | Boolean | - | false 

### submenu Events
  事件名 |   说明   |  参数  
  --------- | ---------- | -------- 
  click   | 子菜单点击事件 | 当前子菜单的实例 

### Sidebar Attributes
  参数  |   说明   |   类型   | 可选值 |  默认值  
 ----- | -------- | :------: | :-------: | :------: 
 name     | 名称 | String  | - | - 
 icon      | 图标（class） | String | - | - 
 hotkey    | 快捷键 | String | - | - 
 location    | 位置 | String | top / bottom | top  
 component    | 要展开的组件 | Component  | - | - 
 ...(component) | component组件里的所有属性和事件 | - | - | - 
 type   | 触发后的方式 | String | popover / - | - 
 submenu   | 子菜单（如果是popover方式时使用） | Array | （同头部子菜单属性） | - 

### contextmenu Attributes
  参数  |   说明   |   类型   | 可选值 |  默认值  
 ----- | -------- | :------: | :-------: | :------: 
 id  | 唯一id | String | - | - 
 label  | 名称 | String | - | - 
 key    | 快捷键 | String | - | - 
 type   | 设置分割线(设置该属性，其他属性都失效) | String | divided | - 
 iconClass    | 图标（class） | String | - | - 

### contextmenu Events
  事件名 |   说明   |  参数  
  --------- | ---------- | -------- 
 execute  | 回调 | - 


 ### 文件 Widgets Attributes 

 ##### （*激活文件时，交互的属性）

  参数  |   说明   |   类型   | 可选值 |  默认值  
 ----- | -------- | :------: | :-------: | :------: 
 id     | 文件唯一id | String | - | - 
 name   | 文件显示名称 | String | - | - 
 iconClass    | 图标（class） | String | - | - 
 components   | 文件 | Component | - | - 

