import React, { Component } from 'react';
import { IDraggableCoreMouseDragEvent as MouseDragEvent, IDraggableCoreTouchDragEvent as TouchDragEvent } from './utils/draggable-core';
export interface IDraggableEvent {
    target: any;
    event: MouseDragEvent | TouchDragEvent;
    element: HTMLElement;
}
export interface IDraggable {
    onPress?: (e: IDraggableEvent) => void;
    onDrag?: (e: IDraggableEvent) => void;
    onRelease?: (e: IDraggableEvent) => void;
    children: React.ReactElement;
}
export default class Draggable extends Component<IDraggable> {
    private element;
    private readonly assignRef;
    private draggable;
    constructor(props: Readonly<IDraggable>);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}
