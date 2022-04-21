import React, { Component } from 'react';
export interface IOptimization {
    shouldUpdateOnDrag: boolean;
    isDragging: boolean;
    children: React.ReactElement;
}
export default class Optimization extends Component<IOptimization> {
    shouldComponentUpdate(nextProps: Readonly<IOptimization>): boolean;
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> & React.ReactNode;
}
