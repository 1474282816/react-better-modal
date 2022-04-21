import React, { Component } from 'react';
import { IDraggableEvent } from './draggable';
import { IDraggableCoreMouseDragEvent as MouseDragEvent, IDraggableCoreTouchDragEvent as TouchDragEvent } from './utils/draggable-core';
export declare type THEME = '' | 'dark';
export declare type WINDOW_STAGE = 'DEFAULT' | 'FULLSCREEN' | 'MINIMIZED';
export interface IStageChangeEvent {
    nativeEvent: MouseEvent;
    state: string;
    syntheticEvent: React.MouseEvent;
    target: Modal;
}
export interface IModalEvent {
    width: number;
    height: number;
    top: number;
    left: number;
    target: Modal;
    nativeEvent: PointerEvent;
    drag: boolean;
    end: boolean;
}
export interface IModalProps {
    appendContainer?: HTMLElement;
    visible?: boolean;
    theme?: THEME;
    keyboard?: boolean;
    useEsc?: boolean;
    mask?: boolean;
    maskStyle?: {
        [key: string]: string | number;
    };
    maskClassName?: string;
    maskClosable?: boolean;
    shouldUpdateOnDrag?: boolean;
    stage?: WINDOW_STAGE;
    initialStage?: WINDOW_STAGE;
    onCancel?: () => void;
    onOk?: () => void;
    draggable?: boolean;
    resizable?: boolean;
    stageChangeByDoubleClick?: boolean;
    onMove?: (event: MouseDragEvent | TouchDragEvent | IDraggableEvent | IStageChangeEvent | IModalEvent) => void;
    onResize?: (event: MouseDragEvent | TouchDragEvent | IDraggableEvent | IStageChangeEvent | IModalEvent) => void;
    onStageChange?: (event: IStageChangeEvent) => void;
    style?: {
        [key: string]: string | number;
    };
    className?: string;
    width?: number;
    height?: number;
    top?: number;
    left?: number;
    initialWidth?: number;
    initialHeight?: number;
    initialTop?: number;
    initialLeft?: number;
    minWidth?: number;
    minHeight?: number;
    zIndex?: number;
    title?: string;
    titleBarClassName?: string;
    minimizeButton?: React.ReactElement;
    maximizeButton?: React.ReactElement;
    restoreButton?: React.ReactElement;
    closeButton?: React.ReactElement;
    contentClassName?: string;
    children?: React.ReactElement;
    footerClassName?: string;
    showCancel?: boolean;
    showOk?: boolean;
    cancelText?: string;
    okText?: string;
    footer?: React.ReactElement;
}
export interface IModalState {
    stage?: string;
    width: number;
    height: number;
    top: number;
    left: number;
    isDragging: boolean;
}
export default class Modal extends Component<IModalProps, IModalState> {
    private windowCoordinatesState;
    static getDerivedStateFromProps(nextProps: IModalProps): {
        stage: string;
        width: number;
        height: number;
        top: number;
        left: number;
        isDragging: boolean;
    } | null;
    constructor(props: Readonly<IModalProps>);
    onHandleKeyDown: (event: React.KeyboardEvent) => void;
    dispatchMoveEvent(callback: {
        (event: IStageChangeEvent | IModalEvent): void;
    }, event: any, drag: boolean, end: boolean): void;
    handleMinimize: (event: React.MouseEvent | React.KeyboardEvent) => void;
    handleFullscreen: (event: React.MouseEvent | React.KeyboardEvent) => void;
    handleRestore: (event: React.MouseEvent | React.KeyboardEvent) => void;
    onHandleMaskClick: (event: React.MouseEvent) => void;
    handleCloseWindow: (event: React.MouseEvent | React.KeyboardEvent) => void;
    onHandleOk: (event: React.MouseEvent) => void;
    doubleClickStageChange: (event: React.MouseEvent) => void;
    onPress: (data: IDraggableEvent) => void;
    onDrag: (data: IDraggableEvent) => void;
    onRelease: (data: IDraggableEvent) => void;
    onHandleResize: (event: TouchDragEvent | MouseDragEvent, props: {
        direction: string;
        end: boolean;
    }) => void;
    getInitialWidth(): number;
    getInitialHeight(): number;
    getInitialTop(): number;
    getInitialLeft(): number;
    get windowStage(): string | undefined;
    get width(): number;
    get height(): number;
    get top(): number;
    get left(): number;
    render(): JSX.Element | null;
}
