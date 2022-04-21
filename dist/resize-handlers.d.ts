/// <reference types="react" />
import { IDraggableCoreMouseDragEvent as MouseDragEvent, IDraggableCoreTouchDragEvent as TouchDragEvent } from './utils/draggable-core';
export interface IPropsEvent {
    target: any;
    event: TouchDragEvent | MouseDragEvent;
    element: HTMLElement;
}
export interface IResizeHandlers {
    onResize: (e: TouchDragEvent | MouseDragEvent, params: {
        direction: string;
        end: boolean;
    }) => void;
}
export default function ResizeHandlers(props: Readonly<IResizeHandlers>): JSX.Element;
