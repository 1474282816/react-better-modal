# **因作者原仓库 [https://github.com/malakirti/react-modal#react-better-modal]() 404，npm 下载有问题，因此备份这一份**

# react-better-modal

🎉 A powerful modal dialog component for React.

🔥 一个功能强大的 React 弹窗组件。支持缩放、拖拽、最大化最小化、键盘事件移动弹窗位置(`↑→↓←`)、键盘事件缩放(`CTRL + ↑→↓←`)、键盘事件最大化最小化(`ALT + ↑↓`)。

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Demos](#demos)
- [TODOS](#todos)

## Installation

```shell
> npm i @dckj/react-better-modal

# or

> yarn add @dckj/react-better-modal
```

## Usage

```typescript
import React from "react";
import Modal from "@dckj/react-better-modal";
import "@dckj/react-better-modal/dist/index.css";
function onHandleMove(e) {
  console.log(e, "--->>> onHandleMove");
}
function onHandleResize(e) {
  console.log(e, "--->>> onHandleResize");
}

function onHandleOk() {
  console.log("onOk callback");
}

function onHandleCancel() {
  console.log("onCancel callback");
}

<Modal
  visible
  keyboard
  draggable
  resizable
  title="Hello Modal"
  cancelText={"自定义取消文字"}
  okText={"自定义确定文字"}
  onMove={onHandleMove}
  onResize={onHandleResize}
  onCancel={onHandleCancel}
  onOk={onHandleOk}
  onStageChange={console.log}
>
  Hello Modal!
</Modal>;
```

## API documentation

| 属性                     | 说明                                                                                                                            | 类型          | 默认值  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------- |
| appendContainer          | 设置 Modal 的 z-index                                                                                                           | number        | -       |
| visible                  | 对话框是否可见                                                                                                                  | boolean       | false   |
| theme                    | 皮肤(内置 dark 可选)                                                                                                            | string        | -       |
| keyboard                 | 是否支持键盘事件(关闭(ESC)、移动(↑→↓←)、缩放(CTRL + ↑→↓←)、最大最小化(ALT + ↑↓))                                                | boolean       | true    |
| useEsc                   | 是否支持键盘 esc 关闭，优先级低于 keyboard 参数                                                                                 | boolean       | true    |
| mask                     | 是否展示遮罩                                                                                                                    | boolean       | true    |
| maskStyle                | 遮罩样式                                                                                                                        | CSSProperties | -       |
| maskClassName            | 遮罩 class                                                                                                                      | string        | -       |
| maskClosable             | 点击蒙层是否允许关闭                                                                                                            | boolean       | false   |
| shouldUpdateOnDrag       | 拖拽过程是否允许视图元素更新                                                                                                    | boolean       | false   |
| stage                    | 对话框展示状态，默认(DEFAULT)、最大化(FULLSCREEN)、最小化(MINIMIZED)。受控属性，自动切换将无效，自行根据 onStageChange 回调控制 | string        | DEFAULT |
| initialStage             | 对话框初始展示状态。值同 stage 但优先级低于 stage                                                                               | string        | DEFAULT |
| onCancel                 | 点击遮罩层或右上角叉或取消按钮的回调                                                                                            | function(e)   | -       |
| onOk                     | 点击确定回调                                                                                                                    | function(e)   | -       |
| draggable                | 对话框是否可拖拽(只支持标题部分拖拽)                                                                                            | boolean       | true    |
| resizable                | 对话框是否可缩放                                                                                                                | boolean       | true    |
| stageChangeByDoubleClick | 对话框是否可通过双击改变状态                                                                                                    | boolean       | true    |
| onMove                   | 拖动对话框的回调                                                                                                                | function(e)   | -       |
| onResize                 | 缩放对话框的回调                                                                                                                | function(e)   | -       |
| onStageChange            | 对话框状态改变的回调                                                                                                            | function(e)   | -       |
| style                    | 可用于设置对话框样式，调位置等                                                                                                  | CSSProperties | -       |
| className                | 对话框容器的类名                                                                                                                | string        | -       |
| width                    | 对话框宽度(受控属性，自动缩放宽度将无效，自行根据 onResize 回调控制)                                                            | number        | -       |
| height                   | 对话框高度(受控属性，自动缩放高度将无效，自行根据 onResize 回调控制)                                                            | number        | -       |
| top                      | 对话框距离顶部位置(受控属性，垂直拖动将无效，自行根据 onMove 回调控制)                                                          | number        | -       |
| left                     | 对话框距离左侧位置(受控属性，水平拖动将无效，自行根据 onMove 回调控制)                                                          | number        | -       |
| initialWidth             | 对话框初始宽度                                                                                                                  | number        | 520     |
| initialHeight            | 对话框初始高度                                                                                                                  | number        | 400     |
| initialTop               | 对话框初始距离顶部位置                                                                                                          | number        | -       |
| initialLeft              | 对话框初始距离左侧位置                                                                                                          | number        | -       |
| minWidth                 | 对话框最小宽度                                                                                                                  | number        | 256     |
| minHeight                | 对话框最小高度                                                                                                                  | number        | 256     |
| zIndex                   | 设置 Modal 的 z-index                                                                                                           | number        | 1000    |
| title                    | 标题                                                                                                                            | ReactNode     | -       |
| titleBarClassName        | 对话框标题容器的类名                                                                                                            | string        | -       |
| minimizeButton           | 自定义最小化图标                                                                                                                | ReactNode     | -       |
| maximizeButton           | 自定义最大化图标                                                                                                                | ReactNode     | -       |
| restoreButton            | 自定义复原图标                                                                                                                  | ReactNode     | -       |
| closeButton              | 自定义关闭图标                                                                                                                  | ReactNode     | -       |
| contentClassName         | 对话框内容容器类名                                                                                                              | string        | -       |
| footerClassName          | 对话框底部容器类名                                                                                                              | string        | -       |
| showCancel               | 取消按钮是否可见                                                                                                                | boolean       | true    |
| showOk                   | 确定按钮是否可见                                                                                                                | boolean       | true    |
| cancelText               | 取消按钮文字                                                                                                                    | ReactNode     | 取消    |
| okText                   | 确认按钮文字                                                                                                                    | ReactNode     | 确定    |
| footer                   | 底部内容，当不需要默认底部按钮时，可以设为 footer={null}                                                                        | ReactNode     | -       |

## Demos

There are several demos hosted on CodeSandbox which demonstrate various features of react-better-modal.

1. [基础用法](https://codesandbox.io/s/react-better-modal-basic-usage-ovfj1)
2. [非受控初始宽高](https://codesandbox.io/s/react-better-modal-custom-rect-my2gl)
3. [受控宽高](https://codesandbox.io/s/react-better-modal-custom-controled-rect-1drsf)
4. [非受控初始位置](https://codesandbox.io/s/react-better-modal-custom-init-position-ut8mr)
5. [受控位置](https://codesandbox.io/s/react-better-modal-custom-init-controled-position-3d3me)
6. [非受控弹窗状态](https://codesandbox.io/s/react-better-modal-custom-window-stage-vb6lm)
7. [受控弹窗状态](https://codesandbox.io/s/react-better-modal-custom-controled-window-stage-wo0v4)
8. [键盘事件](https://codesandbox.io/s/react-better-modal-keyboard-events-wleqk)
9. [内置主题](https://codesandbox.io/s/react-better-modal-buildin-theme-zw0u4)
10. [未覆盖部分请参考 API Documentation](#api-documentation)

## TODOS

- animation
- Testing
- more themes
