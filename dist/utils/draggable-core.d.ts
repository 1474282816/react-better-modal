export interface IDraggableCoreTouchDragEvent {
    pageX: number;
    pageY: number;
    clientX: number;
    clientY: number;
    type: string;
    originalEvent: TouchEvent;
    isTouch: boolean;
}
export interface IDraggableCoreMouseDragEvent {
    pageX: number;
    pageY: number;
    clientX: number;
    clientY: number;
    type: string;
    originalEvent: MouseEvent;
    isTouch: boolean;
    offsetX: number;
    offsetY: number;
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
}
export interface IDraggableCore {
    press?: (event: IDraggableCoreTouchDragEvent | IDraggableCoreMouseDragEvent) => void;
    drag?: (event: IDraggableCoreTouchDragEvent | IDraggableCoreMouseDragEvent) => void;
    release?: (event: IDraggableCoreTouchDragEvent | IDraggableCoreMouseDragEvent) => void;
    mouseOnly?: boolean;
}
export default class DraggableCore {
    private element;
    private ignoreMouse;
    private mouseOnly;
    private pressHandler;
    private dragHandler;
    private releaseHandler;
    private readonly mousedown;
    private readonly mousemove;
    private readonly mouseup;
    private readonly restoreMouse;
    private readonly touchstart;
    private readonly touchmove;
    private readonly touchend;
    private readonly pointerdown;
    private readonly pointermove;
    private readonly pointerup;
    static supportPointerEvent(): false | {
        new (type: string, eventInitDict?: PointerEventInit | undefined): PointerEvent;
        prototype: PointerEvent;
    };
    constructor(props: Readonly<IDraggableCore>);
    bindTo(element: HTMLElement): void;
    bindToCurrent(): void;
    unbindFromCurrent(): void;
    usePointers(): false | {
        new (type: string, eventInitDict?: PointerEventInit | undefined): PointerEvent;
        prototype: PointerEvent;
    };
    update(props: IDraggableCore): void;
    destroy(): void;
}
