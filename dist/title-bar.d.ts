import React, { Component } from 'react';
import { IDraggableEvent } from './draggable';
export interface ITitleBar {
    className?: string;
    stage?: string;
    draggable?: boolean;
    onMinimizeButtonClick?: (event: React.MouseEvent) => void;
    onFullScreenButtonClick?: (event: React.MouseEvent) => void;
    onRestoreButtonClick?: (event: React.MouseEvent) => void;
    onCloseButtonClick?: (event: React.MouseEvent) => void;
    onDoubleClick?: (event: React.MouseEvent) => void;
    minimizeButton?: React.ReactElement;
    maximizeButton?: React.ReactElement;
    restoreButton?: React.ReactElement;
    closeButton?: React.ReactElement;
    onPress?: (event: IDraggableEvent) => void;
    onDrag?: (event: IDraggableEvent) => void;
    onRelease?: (event: IDraggableEvent) => void;
    children?: React.ReactElement | string | undefined | null;
}
export default class TitleBar extends Component<ITitleBar> {
    constructor(props: Readonly<ITitleBar>);
    render(): JSX.Element;
}
