# Workbench

Workbench 是基于浏览器的工作台前端框架组件，提供可拖拽的分割面板、以及工作台的基本结构和样式

在线预览网址：https://fit2cloud-ui.github.io/workbench

## 安装
```
npm install Workbench --save
```

## 引入
```
import Workbench from "Workbench"

Vue.use(Workbench);
```
## 使用
```
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
 submenu   | 子菜单 | Array | - | - 
 hotkey    | 关键字 | String | - | - 
 divided   | 分割线 | Boolean | - | false 
 isSet   | 是否已选择 | Boolean | - | false 

### submenu Events
  事件名 |   说明   |  参数  
  --------- | ---------- | -------- 
  click   | 子菜单点击事件 | 当前子菜单的实例 

### Sidebar Attributes
  参数  |   说明   |   类型   | 可选值 |  默认值  
 ----- | -------- | :------: | :-------: | :------: 
 name     | 名称 | String | - | - 
 icon      | 图标（class） | String | - | - 
 hotkey    | 关键字 | String | - | - 
 location    | 位置 | String | top / bottom | top  
 component    | 要展开的组件 | String | - | - 
 ...(component) | component组件里的所有属性和事件 | - | - | - 
 type   | 触发后的方式 | String | popover / - | - 
 submenu   | 子菜单（如果是popover方式时使用） | Array | （同头部子菜单属性） | - 



 ### 文件 Widgets Attributes 

 ##### （*激活文件时，交互的属性）

  参数  |   说明   |   类型   | 可选值 |  默认值  
 ----- | -------- | :------: | :-------: | :------: 
 id     | 文件唯一id | String | - | - 
 name   | 文件显示名称 | String | - | - 
 iconClass    | 图标（class） | String | - | - 
 icon    | 图标（url） | String | - | - 
 components   | 文件（文件名） | String | - | - 

