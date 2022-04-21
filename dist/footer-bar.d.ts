import React, { Component } from 'react';
export interface IFooterBar {
    className?: string;
    showCancel?: boolean;
    showOk?: boolean;
    cancelText?: string;
    okText?: string;
    onCancel?: (event: any) => void;
    onOk?: (event: any) => void;
    footer?: React.ReactElement;
}
export default class FooterBar extends Component<IFooterBar> {
    constructor(props: Readonly<IFooterBar>);
    render(): JSX.Element;
}
