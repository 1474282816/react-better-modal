(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('react-dom')) :
    typeof define === 'function' && define.amd ? define(['react', 'react-dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ReactModal = factory(global.React, global.ReactDom));
}(this, (function (React, reactDom) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var Optimization = /** @class */ (function (_super) {
        __extends(Optimization, _super);
        function Optimization() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Optimization.prototype.shouldComponentUpdate = function (nextProps) {
            return nextProps.shouldUpdateOnDrag || !nextProps.isDragging;
        };
        Optimization.prototype.render = function () {
            return this.props.children;
        };
        return Optimization;
    }(React.Component));

    function classNames() {
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        return names
            .filter(Boolean)
            .map(function (arg) {
            if (Array.isArray(arg)) {
                return classNames.apply(void 0, arg);
            }
            if (typeof arg === 'object') {
                return Object.keys(arg)
                    .map(function (key, idx) { return arg[idx] || (arg[key] && key) || null; })
                    .filter(function (el) { return el !== null; })
                    .join(' ');
            }
            return arg;
        })
            .filter(Boolean)
            .join(' ');
    }

    // eslint-disable-next-line max-params
    function dispatchEvent(eventHandler, dispatchedEvent, target, eventData) {
        if (eventHandler) {
            var eventBaseData = {
                target: target,
                syntheticEvent: dispatchedEvent,
                nativeEvent: dispatchedEvent.nativeEvent,
            };
            eventHandler.call(undefined, __assign(__assign({}, eventBaseData), eventData));
        }
    }

    var proxy = function (a, b) {
        return function (e) { return b(a(e)); };
    };
    var noop = function () { };
    var preventDefault = function (event) { return event.preventDefault(); };
    var touchRegExp = /touch/;
    // 300ms is the usual mouse interval.
    // However, an underpowered mobile device under a heavy load may queue mouse events for a longer period.
    var IGNORE_MOUSE_TIMEOUT = 2000;
    function normalizeTouchEvent(e) {
        return {
            pageX: e.changedTouches[0].pageX,
            pageY: e.changedTouches[0].pageY,
            clientX: e.changedTouches[0].clientX,
            clientY: e.changedTouches[0].clientY,
            type: e.type,
            originalEvent: e,
            isTouch: true,
        };
    }
    function normalizeMouseEvent(e) {
        return {
            pageX: e.pageX,
            pageY: e.pageY,
            clientX: e.clientX,
            clientY: e.clientY,
            type: e.type,
            originalEvent: e,
            isTouch: false,
            offsetX: e.offsetX,
            offsetY: e.offsetY,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            altKey: e.altKey,
        };
    }
    function normalizeEvent(e) {
        if (e.type.match(touchRegExp)) {
            return normalizeTouchEvent(e);
        }
        return normalizeMouseEvent(e);
    }
    var DraggableCore = /** @class */ (function () {
        function DraggableCore(props) {
            var _this = this;
            this.element = null;
            var _a = props.press, press = _a === void 0 ? noop : _a, _b = props.drag, drag = _b === void 0 ? noop : _b, _c = props.release, release = _c === void 0 ? noop : _c, _d = props.mouseOnly, mouseOnly = _d === void 0 ? false : _d;
            this.pressHandler = proxy(normalizeEvent, press);
            this.dragHandler = proxy(normalizeEvent, drag);
            this.releaseHandler = proxy(normalizeEvent, release);
            this.ignoreMouse = false;
            this.mouseOnly = mouseOnly;
            this.touchstart = function (e) {
                if (e.touches.length === 1) {
                    _this.pressHandler(e);
                }
            };
            this.touchmove = function (e) {
                if (e.touches.length === 1) {
                    _this.dragHandler(e);
                }
            };
            this.touchend = function (e) {
                // the last finger has been lifted, and the user is not doing gesture.
                // there might be a better way to handle this.
                if (e.touches.length === 0 && e.changedTouches.length === 1) {
                    _this.releaseHandler(e);
                    _this.ignoreMouse = true;
                    setTimeout(_this.restoreMouse, IGNORE_MOUSE_TIMEOUT);
                }
            };
            this.restoreMouse = function () {
                _this.ignoreMouse = false;
            };
            this.mousedown = function (e) {
                var which = e.which;
                if ((which && which > 1) || _this.ignoreMouse) {
                    return;
                }
                document.addEventListener('mousemove', _this.mousemove);
                document.addEventListener('mouseup', _this.mouseup);
                _this.pressHandler(e);
            };
            this.mousemove = function (e) {
                _this.dragHandler(e);
            };
            this.mouseup = function (e) {
                document.removeEventListener('mousemove', _this.mousemove);
                document.removeEventListener('mouseup', _this.mouseup);
                _this.releaseHandler(e);
            };
            this.pointerdown = function (e) {
                if (e.isPrimary && e.button === 0) {
                    document.addEventListener('pointermove', _this.pointermove);
                    document.addEventListener('pointerup', _this.pointerup);
                    document.addEventListener('pointercancel', _this.pointerup);
                    document.addEventListener('contextmenu', preventDefault);
                    _this.pressHandler(e);
                }
            };
            this.pointermove = function (e) {
                if (e.isPrimary) {
                    _this.dragHandler(e);
                }
            };
            this.pointerup = function (e) {
                if (e.isPrimary) {
                    document.removeEventListener('pointermove', _this.pointermove);
                    document.removeEventListener('pointerup', _this.pointerup);
                    document.removeEventListener('pointercancel', _this.pointerup);
                    document.removeEventListener('contextmenu', preventDefault);
                    _this.releaseHandler(e);
                }
            };
        }
        DraggableCore.supportPointerEvent = function () {
            return typeof window !== 'undefined' && window.PointerEvent;
        };
        DraggableCore.prototype.bindTo = function (element) {
            if (element === this.element) {
                return;
            }
            if (this.element) {
                this.unbindFromCurrent();
            }
            this.element = element;
            this.bindToCurrent();
        };
        DraggableCore.prototype.bindToCurrent = function () {
            var element = this.element;
            if (!element)
                return;
            if (this.usePointers()) {
                element.addEventListener('pointerdown', this.pointerdown);
                return;
            }
            element.addEventListener('mousedown', this.mousedown);
            if (!this.mouseOnly) {
                element.addEventListener('touchstart', this.touchstart);
                element.addEventListener('touchmove', this.touchmove);
                element.addEventListener('touchend', this.touchend);
            }
        };
        DraggableCore.prototype.unbindFromCurrent = function () {
            var element = this.element;
            if (!element)
                return;
            if (this.usePointers()) {
                element.removeEventListener('pointerdown', this.pointerdown);
                element.removeEventListener('pointermove', this.pointermove);
                element.removeEventListener('pointerup', this.pointerup);
                element.removeEventListener('contextmenu', preventDefault);
                element.removeEventListener('pointercancel', this.pointerup);
                return;
            }
            element.removeEventListener('mousedown', this.mousedown);
            if (!this.mouseOnly) {
                element.removeEventListener('touchstart', this.touchstart);
                element.removeEventListener('touchmove', this.touchmove);
                element.removeEventListener('touchend', this.touchend);
            }
        };
        DraggableCore.prototype.usePointers = function () {
            return !this.mouseOnly && DraggableCore.supportPointerEvent();
        };
        DraggableCore.prototype.update = function (props) {
            var _a = props.press, press = _a === void 0 ? noop : _a, _b = props.drag, drag = _b === void 0 ? noop : _b, _c = props.release, release = _c === void 0 ? noop : _c, _d = props.mouseOnly, mouseOnly = _d === void 0 ? false : _d;
            this.pressHandler = proxy(normalizeEvent, press);
            this.dragHandler = proxy(normalizeEvent, drag);
            this.releaseHandler = proxy(normalizeEvent, release);
            this.mouseOnly = mouseOnly;
        };
        DraggableCore.prototype.destroy = function () {
            this.unbindFromCurrent();
            this.element = null;
        };
        return DraggableCore;
    }());

    var Draggable = /** @class */ (function (_super) {
        __extends(Draggable, _super);
        function Draggable(props) {
            var _this = _super.call(this, props) || this;
            var onPress = props.onPress, onDrag = props.onDrag, onRelease = props.onRelease;
            _this.element = null;
            _this.assignRef = function (element) {
                if (!element || _this.element === element)
                    return;
                _this.element = element;
            };
            _this.draggable = new DraggableCore({
                press: function (event) {
                    if (_this.element && onPress) {
                        onPress.call(undefined, {
                            event: event,
                            target: _this,
                            element: _this.element,
                        });
                    }
                },
                drag: function (event) {
                    if (_this.element && onDrag) {
                        onDrag.call(undefined, {
                            event: event,
                            target: _this,
                            element: _this.element,
                        });
                    }
                },
                release: function (event) {
                    if (_this.element && onRelease) {
                        onRelease.call(undefined, {
                            event: event,
                            target: _this,
                            element: _this.element,
                        });
                    }
                },
            });
            return _this;
        }
        Draggable.prototype.componentDidMount = function () {
            if (this.element) {
                this.draggable.bindTo(this.element);
            }
        };
        Draggable.prototype.componentWillUnmount = function () {
            this.draggable.destroy();
        };
        Draggable.prototype.render = function () {
            var children = this.props.children;
            return React__default['default'].cloneElement(React__default['default'].Children.only(children), {
                ref: this.assignRef,
            });
        };
        return Draggable;
    }(React.Component));

    var DEFAULT_WIDTH = 520;
    var DEFAULT_HEIGHT = 400;
    var DEFAULT_MIN_WIDTH = 256;
    var DEFAULT_MIN_HEIGHT = 200;
    var DEFAULT_STEP = 5;
    var windowStage = {
        DEFAULT: 'DEFAULT',
        FULLSCREEN: 'FULLSCREEN',
        MINIMIZED: 'MINIMIZED',
    };
    var directions = ['n', 'e', 's', 'w', 'se', 'sw', 'ne', 'nw'];
    var keys = {
        backspace: 8,
        tab: 9,
        enter: 13,
        shift: 16,
        esc: 27,
        space: 32,
        pageUp: 33,
        pageDown: 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        delete: 46,
    };

    function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

    var _ref$3 = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("style", null));

    var _ref2$3 = /*#__PURE__*/React.createElement("path", {
      d: "M960 576H64c-35.4 0-64-28.6-64-64s28.6-64 64-64h896c35.4 0 64 28.6 64 64s-28.6 64-64 64z"
    });

    function SvgIconMinimize(props) {
      return /*#__PURE__*/React.createElement("svg", _extends$3({
        className: "icon-minimize_svg__icon",
        viewBox: "0 0 1024 1024",
        xmlns: "http://www.w3.org/2000/svg",
        width: 200,
        height: 200
      }, props), _ref$3, _ref2$3);
    }

    function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

    var _ref$2 = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("style", null));

    var _ref2$2 = /*#__PURE__*/React.createElement("path", {
      d: "M877.625 118.25h-731.25C99.793 118.25 62 156.043 62 202.625v618.75c0 46.582 37.793 84.375 84.375 84.375h731.25c46.582 0 84.375-37.793 84.375-84.375v-618.75c0-46.582-37.793-84.375-84.375-84.375zm0 692.578c0 5.8-4.746 10.547-10.547 10.547H156.922c-5.8 0-10.547-4.746-10.547-10.547V399.5h731.25v411.328z"
    });

    function SvgIconMaximize(props) {
      return /*#__PURE__*/React.createElement("svg", _extends$2({
        className: "icon-maximize_svg__icon",
        viewBox: "0 0 1024 1024",
        xmlns: "http://www.w3.org/2000/svg",
        width: 200,
        height: 200
      }, props), _ref$2, _ref2$2);
    }

    function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

    var _ref$1 = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("style", null));

    var _ref2$1 = /*#__PURE__*/React.createElement("path", {
      d: "M902 32H302c-49.688 0-90 40.313-90 90v90h-90c-49.688 0-90 40.313-90 90v600c0 49.688 40.313 90 90 90h600c49.688 0 90-40.313 90-90v-90h90c49.688 0 90-40.313 90-90V122c0-49.688-40.313-90-90-90zM722 902H122V512h600v390zm180-180h-90V302c0-49.688-40.313-90-90-90H302v-90h600v600z"
    });

    function SvgIconRestore(props) {
      return /*#__PURE__*/React.createElement("svg", _extends$1({
        className: "icon-restore_svg__icon",
        viewBox: "0 0 1024 1024",
        xmlns: "http://www.w3.org/2000/svg",
        width: 200,
        height: 200
      }, props), _ref$1, _ref2$1);
    }

    function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

    var _ref = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("style", null));

    var _ref2 = /*#__PURE__*/React.createElement("path", {
      d: "M506.375 433.25l-315-320.625c-22.5-22.5-56.25-22.5-84.375 0-22.5 22.5-22.5 56.25 0 84.375l320.625 315L107 832.625c-22.5 22.5-22.5 56.25 0 84.375 22.5 22.5 56.25 22.5 84.375 0L512 596.375 832.625 917c22.5 22.5 56.25 22.5 84.375 0 22.5-22.5 22.5-56.25 0-84.375L590.75 512l320.625-320.625c22.5-22.5 22.5-56.25 0-84.375-22.5-22.5-56.25-22.5-84.375 0L506.375 433.25z"
    });

    function SvgIconClose(props) {
      return /*#__PURE__*/React.createElement("svg", _extends({
        className: "icon-close_svg__icon",
        viewBox: "0 0 1024 1024",
        xmlns: "http://www.w3.org/2000/svg",
        width: 200,
        height: 200
      }, props), _ref, _ref2);
    }

    var TitleBar = /** @class */ (function (_super) {
        __extends(TitleBar, _super);
        function TitleBar(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {};
            return _this;
        }
        TitleBar.prototype.render = function () {
            var _a = this.props, className = _a.className, _b = _a.stage, stage = _b === void 0 ? windowStage.DEFAULT : _b, draggable = _a.draggable, onMinimizeButtonClick = _a.onMinimizeButtonClick, onFullScreenButtonClick = _a.onFullScreenButtonClick, onRestoreButtonClick = _a.onRestoreButtonClick, onCloseButtonClick = _a.onCloseButtonClick, onDoubleClick = _a.onDoubleClick, minimizeButton = _a.minimizeButton, maximizeButton = _a.maximizeButton, restoreButton = _a.restoreButton, closeButton = _a.closeButton, children = _a.children;
            var minimizeButtonRender = minimizeButton ? (React__default['default'].cloneElement(minimizeButton, { stage: stage, onClick: onMinimizeButtonClick })) : (React__default['default'].createElement("button", { type: "button", className: "rm-button rm-button-icon", onClick: onMinimizeButtonClick },
                React__default['default'].createElement(SvgIconMinimize, { className: "rm-icon", "aria-hidden": "true" })));
            var maximizeButtonRender = maximizeButton ? (React__default['default'].cloneElement(maximizeButton, { stage: stage, onClick: onFullScreenButtonClick })) : (React__default['default'].createElement("button", { type: "button", className: "rm-button rm-button-icon", onClick: onFullScreenButtonClick },
                React__default['default'].createElement(SvgIconMaximize, { className: "rm-icon", "aria-hidden": "true" })));
            var restoreButtonRender = restoreButton ? (React__default['default'].cloneElement(restoreButton, { stage: stage, onClick: onRestoreButtonClick })) : (React__default['default'].createElement("button", { type: "button", className: "rm-button rm-button-icon", onClick: onRestoreButtonClick },
                React__default['default'].createElement(SvgIconRestore, { className: "rm-icon", "aria-hidden": "true" })));
            var closeButtonRender = closeButton ? (React__default['default'].cloneElement(closeButton, { stage: stage, onClick: onCloseButtonClick })) : (React__default['default'].createElement("button", { type: "button", className: "rm-button rm-button-icon", onClick: onCloseButtonClick },
                React__default['default'].createElement(SvgIconClose, { className: "rm-icon", "aria-hidden": "true" })));
            return (React__default['default'].createElement(Draggable, { onPress: this.props.onPress, onDrag: this.props.onDrag, onRelease: this.props.onRelease },
                React__default['default'].createElement("div", { style: { touchAction: 'none', cursor: draggable ? 'move' : 'default' }, className: classNames('rm-window-title-bar', className), onDoubleClick: onDoubleClick },
                    React__default['default'].createElement("div", { className: "window-title" },
                        React__default['default'].createElement("span", { className: "text" }, children || '')),
                    React__default['default'].createElement("div", { className: "window-actions" },
                        stage === windowStage.DEFAULT && minimizeButtonRender,
                        stage === windowStage.DEFAULT && maximizeButtonRender,
                        stage !== windowStage.DEFAULT && restoreButtonRender,
                        closeButtonRender))));
        };
        return TitleBar;
    }(React.Component));

    var FooterBar = /** @class */ (function (_super) {
        __extends(FooterBar, _super);
        function FooterBar(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {};
            return _this;
        }
        FooterBar.prototype.render = function () {
            var _a = this.props, className = _a.className, _b = _a.showCancel, showCancel = _b === void 0 ? true : _b, _c = _a.showOk, showOk = _c === void 0 ? true : _c, _d = _a.cancelText, cancelText = _d === void 0 ? '取消' : _d, _e = _a.okText, okText = _e === void 0 ? '确定' : _e, onCancel = _a.onCancel, onOk = _a.onOk, footer = _a.footer;
            return (React__default['default'].createElement("div", { className: classNames('rm-window-footer', className) }, footer || (React__default['default'].createElement(React__default['default'].Fragment, null,
                showCancel && (React__default['default'].createElement("button", { type: "button", className: "rm-button footer-button", onClick: onCancel }, cancelText)),
                showOk && (React__default['default'].createElement("button", { type: "button", className: "rm-button footer-button button-primary", onClick: onOk }, okText))))));
        };
        return FooterBar;
    }(React.Component));

    function ResizeHandlers(props) {
        var onResize = props.onResize;
        function onDrag(data, key) {
            var event = data.event;
            event.originalEvent.preventDefault();
            if (onResize) {
                onResize(event, { direction: key, end: false });
            }
        }
        function onRelease(data, key) {
            var event = data.event;
            event.originalEvent.preventDefault();
            if (onResize) {
                onResize(event, { direction: key, end: true });
            }
        }
        return (React__default['default'].createElement("div", null, directions.map(function (key) { return (React__default['default'].createElement(Draggable, { key: key, onDrag: function (data) { return onDrag(data, key); }, onRelease: function (data) { return onRelease(data, key); } },
            React__default['default'].createElement("div", { style: { display: 'block', touchAction: 'none' }, className: "rm-resize-handle " + key }))); })));
    }

    var Modal = /** @class */ (function (_super) {
        __extends(Modal, _super);
        function Modal(props) {
            var _this = _super.call(this, props) || this;
            _this.onHandleKeyDown = function (event) {
                var _a = _this.props, _b = _a.keyboard, keyboard = _b === void 0 ? true : _b, _c = _a.useEsc, useEsc = _c === void 0 ? true : _c, _d = _a.resizable, resizable = _d === void 0 ? true : _d, propsMinWidth = _a.minWidth, propsMinHeight = _a.minHeight, onResize = _a.onResize, onStageChange = _a.onStageChange, onCancel = _a.onCancel, onMove = _a.onMove;
                var minWidth = propsMinWidth || DEFAULT_MIN_WIDTH;
                var minHeight = propsMinHeight || DEFAULT_MIN_HEIGHT;
                if (!keyboard) {
                    return;
                }
                if (event.target !== event.currentTarget) {
                    return;
                }
                // resize
                if (event.ctrlKey && resizable) {
                    switch (event.keyCode) {
                        case keys.up:
                            event.preventDefault();
                            // eslint-disable-next-line max-depth
                            if (minHeight <= _this.height - DEFAULT_STEP) {
                                _this.setState({ height: _this.height - DEFAULT_STEP });
                            }
                            break;
                        case keys.right:
                            _this.setState({ width: _this.width + DEFAULT_STEP });
                            break;
                        case keys.down:
                            event.preventDefault();
                            _this.setState({ height: _this.height + DEFAULT_STEP });
                            break;
                        case keys.left:
                            // eslint-disable-next-line max-depth
                            if (minWidth <= _this.width - DEFAULT_STEP) {
                                _this.setState({ width: _this.width - DEFAULT_STEP });
                            }
                            break;
                        default:
                            return;
                    }
                    if (onResize) {
                        _this.dispatchMoveEvent(onResize, event, false, false);
                    }
                    return;
                }
                // stage change: default、fullscreen、minimized
                if (event.altKey) {
                    switch (event.keyCode) {
                        case keys.up:
                            // eslint-disable-next-line max-depth
                            if (_this.windowStage === windowStage.MINIMIZED) {
                                _this.handleRestore(event);
                                dispatchEvent(onStageChange, event, _this, { state: windowStage.DEFAULT });
                            }
                            else if (_this.windowStage === windowStage.DEFAULT) {
                                _this.handleFullscreen(event);
                                dispatchEvent(onStageChange, event, _this, { state: windowStage.FULLSCREEN });
                            }
                            break;
                        case keys.down:
                            if (_this.windowStage === windowStage.FULLSCREEN) {
                                _this.handleRestore(event);
                                dispatchEvent(onStageChange, event, _this, { state: windowStage.DEFAULT });
                            }
                            else if (_this.windowStage === windowStage.DEFAULT) {
                                _this.handleMinimize(event);
                                dispatchEvent(onStageChange, event, _this, { state: windowStage.MINIMIZED });
                            }
                            break;
                    }
                    return;
                }
                // move
                if (!event.ctrlKey) {
                    switch (event.keyCode) {
                        case keys.esc:
                            if (useEsc && onCancel) {
                                event.preventDefault();
                                _this.handleCloseWindow(event);
                            }
                            return;
                        case keys.up:
                            _this.setState({ top: _this.state.top - DEFAULT_STEP });
                            break;
                        case keys.right:
                            _this.setState({ left: _this.state.left + DEFAULT_STEP });
                            break;
                        case keys.down:
                            _this.setState({ top: _this.state.top + DEFAULT_STEP });
                            break;
                        case keys.left:
                            _this.setState({ left: _this.state.left - DEFAULT_STEP });
                            break;
                        default:
                            return;
                    }
                }
                if (onMove) {
                    _this.dispatchMoveEvent(onMove, event, false, false);
                }
            };
            // eslint-disable-next-line react/sort-comp
            _this.handleMinimize = function (event) {
                event.preventDefault();
                _this.windowCoordinatesState.widthBeforeAction = _this.width;
                _this.windowCoordinatesState.heightBeforeAction = _this.height;
                _this.windowCoordinatesState.topBeforeAction = _this.top;
                _this.windowCoordinatesState.leftBeforeAction = _this.left;
                _this.setState({
                    stage: windowStage.MINIMIZED,
                    height: 0,
                });
                dispatchEvent(_this.props.onStageChange, event, _this, { state: windowStage.MINIMIZED });
            };
            _this.handleFullscreen = function (event) {
                event.preventDefault();
                _this.windowCoordinatesState.widthBeforeAction = _this.width;
                _this.windowCoordinatesState.heightBeforeAction = _this.height;
                _this.windowCoordinatesState.topBeforeAction = _this.top;
                _this.windowCoordinatesState.leftBeforeAction = _this.left;
                _this.setState({
                    stage: windowStage.FULLSCREEN,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    top: 0,
                    left: 0,
                });
                dispatchEvent(_this.props.onStageChange, event, _this, { state: windowStage.FULLSCREEN });
            };
            _this.handleRestore = function (event) {
                event.preventDefault();
                if (_this.windowStage === windowStage.MINIMIZED) {
                    _this.setState({
                        stage: windowStage.DEFAULT,
                        height: _this.windowCoordinatesState.heightBeforeAction,
                    });
                }
                else if (_this.windowStage === windowStage.FULLSCREEN) {
                    _this.setState({
                        stage: windowStage.DEFAULT,
                        width: _this.windowCoordinatesState.widthBeforeAction,
                        height: _this.windowCoordinatesState.heightBeforeAction,
                        top: _this.windowCoordinatesState.topBeforeAction,
                        left: _this.windowCoordinatesState.leftBeforeAction,
                    });
                }
                dispatchEvent(_this.props.onStageChange, event, _this, { state: windowStage.DEFAULT });
            };
            _this.onHandleMaskClick = function (event) {
                var maskClosable = _this.props.maskClosable;
                if (maskClosable) {
                    _this.handleCloseWindow(event);
                }
            };
            _this.handleCloseWindow = function (event) {
                event.preventDefault();
                dispatchEvent(_this.props.onCancel, event, _this, { state: undefined });
            };
            _this.onHandleOk = function (event) {
                event.preventDefault();
                dispatchEvent(_this.props.onOk, event, _this, { state: undefined });
            };
            _this.doubleClickStageChange = function (event) {
                var _a = _this.props.stageChangeByDoubleClick, stageChangeByDoubleClick = _a === void 0 ? true : _a;
                if (!stageChangeByDoubleClick) {
                    return;
                }
                if (_this.windowStage === windowStage.FULLSCREEN || _this.windowStage === windowStage.MINIMIZED) {
                    _this.handleRestore(event);
                }
                else {
                    _this.handleFullscreen(event);
                }
            };
            _this.onPress = function (data) {
                var e = data.event;
                _this.windowCoordinatesState.differenceTop = e.pageY - _this.top;
                _this.windowCoordinatesState.differenceLeft = e.pageX - _this.left;
            };
            _this.onDrag = function (data) {
                var e = data.event;
                var _a = _this.props, _b = _a.draggable, draggable = _b === void 0 ? true : _b, onMove = _a.onMove;
                e.originalEvent.preventDefault();
                if (_this.windowStage !== windowStage.FULLSCREEN && draggable) {
                    _this.setState({
                        top: Math.max(e.pageY - _this.windowCoordinatesState.differenceTop, 0),
                        left: e.pageX - _this.windowCoordinatesState.differenceLeft,
                        isDragging: true,
                    });
                    if (onMove) {
                        _this.dispatchMoveEvent(onMove, e, true, false);
                    }
                }
            };
            _this.onRelease = function (data) {
                var e = data.event;
                var _a = _this.props, _b = _a.draggable, draggable = _b === void 0 ? true : _b, onMove = _a.onMove;
                if (_this.windowStage !== windowStage.FULLSCREEN && draggable) {
                    if (onMove) {
                        _this.dispatchMoveEvent(onMove, e, true, true);
                    }
                }
                _this.setState({
                    isDragging: false,
                });
            };
            _this.onHandleResize = function (event, props) {
                var currentWidth = _this.width;
                var currentHeight = _this.height;
                var minWidth = _this.props.minWidth || DEFAULT_MIN_WIDTH;
                var minHeight = _this.props.minHeight || DEFAULT_MIN_HEIGHT;
                var heightDifference = _this.top - event.pageY;
                var widthDifference = _this.left - event.pageX;
                var newWidth = event.pageX - _this.left;
                var newHeight = event.pageY - _this.top;
                var newState = __assign(__assign({}, _this.state), { isDragging: !props.end });
                if (props.direction.indexOf('n') >= 0 && minHeight - (currentHeight + heightDifference) < 0) {
                    newState.top = event.pageY;
                    newState.height = currentHeight + heightDifference;
                }
                if (props.direction.indexOf('s') >= 0 && minHeight - newHeight < 0) {
                    newState.height = newHeight;
                }
                if (props.direction.indexOf('w') >= 0 && minWidth - (currentWidth + widthDifference) < 0) {
                    newState.left = event.pageX;
                    newState.width = currentWidth + widthDifference;
                }
                if (props.direction.indexOf('e') >= 0 && minWidth - newWidth < 0) {
                    newState.width = newWidth;
                }
                _this.setState(newState);
                if (_this.props.onResize) {
                    _this.dispatchMoveEvent(_this.props.onResize, event, true, props.end);
                }
            };
            _this.state = {
                stage: props.stage || props.initialStage || windowStage.DEFAULT,
                width: _this.getInitialWidth(),
                height: _this.getInitialHeight(),
                top: _this.getInitialTop(),
                left: _this.getInitialLeft(),
                isDragging: false,
            };
            _this.windowCoordinatesState = {
                widthBeforeAction: _this.getInitialWidth(),
                heightBeforeAction: _this.getInitialHeight(),
                topBeforeAction: _this.getInitialTop(),
                leftBeforeAction: _this.getInitialLeft(),
                differenceTop: 0,
                differenceLeft: 0,
            };
            return _this;
        }
        Modal.getDerivedStateFromProps = function (nextProps) {
            // 弹窗关闭的时候重置为初始数据
            if (nextProps.visible === false) {
                var width = DEFAULT_WIDTH;
                if (nextProps.width !== undefined) {
                    width = nextProps.width;
                }
                else if (nextProps.initialWidth !== undefined) {
                    width = nextProps.initialWidth;
                }
                var height = DEFAULT_HEIGHT;
                if (nextProps.height !== undefined) {
                    height = nextProps.height;
                }
                else if (nextProps.initialHeight !== undefined) {
                    height = nextProps.initialHeight;
                }
                var top_1;
                if (nextProps.top !== undefined) {
                    top_1 = nextProps.top;
                }
                else if (nextProps.initialTop !== undefined) {
                    top_1 = nextProps.initialTop;
                }
                else {
                    top_1 = window.innerHeight / 2 - height / 2;
                }
                var left = void 0;
                if (nextProps.left !== undefined) {
                    left = nextProps.left;
                }
                else if (nextProps.initialLeft !== undefined) {
                    left = nextProps.initialLeft;
                }
                else {
                    left = window.innerWidth / 2 - width / 2;
                }
                return {
                    stage: windowStage.DEFAULT,
                    width: width,
                    height: height,
                    top: top_1,
                    left: left,
                    isDragging: false,
                };
            }
            return null;
        };
        // eslint-disable-next-line max-params
        Modal.prototype.dispatchMoveEvent = function (callback, event, drag, end) {
            if (!callback) {
                return;
            }
            callback.call(undefined, {
                nativeEvent: event.nativeEvent ? event.nativeEvent : event.originalEvent,
                drag: drag,
                end: end,
                target: this,
                width: this.state.width,
                height: this.state.height,
                top: this.state.top,
                left: this.state.left,
            });
        };
        Modal.prototype.getInitialWidth = function () {
            var width = DEFAULT_WIDTH;
            if (this.props.width !== undefined) {
                width = this.props.width;
            }
            else if (this.props.initialWidth !== undefined) {
                width = this.props.initialWidth;
            }
            return width;
        };
        Modal.prototype.getInitialHeight = function () {
            var height = DEFAULT_HEIGHT;
            if (this.props.height !== undefined) {
                height = this.props.height;
            }
            else if (this.props.initialHeight !== undefined) {
                height = this.props.initialHeight;
            }
            return height;
        };
        Modal.prototype.getInitialTop = function () {
            if (this.props.top !== undefined) {
                return this.props.top;
            }
            if (this.props.initialTop !== undefined) {
                return this.props.initialTop;
            }
            var height = DEFAULT_HEIGHT;
            if (this.props.height !== undefined) {
                height = this.props.height;
            }
            else if (this.props.initialHeight !== undefined) {
                height = this.props.initialHeight;
            }
            return window.innerHeight / 2 - height / 2;
        };
        Modal.prototype.getInitialLeft = function () {
            if (this.props.left !== undefined) {
                return this.props.left;
            }
            if (this.props.initialLeft !== undefined) {
                return this.props.initialLeft;
            }
            var width = DEFAULT_WIDTH;
            if (this.props.width !== undefined) {
                width = this.props.width;
            }
            else if (this.props.initialWidth !== undefined) {
                width = this.props.initialWidth;
            }
            return window.innerWidth / 2 - width / 2;
        };
        Object.defineProperty(Modal.prototype, "windowStage", {
            get: function () {
                return this.props.stage || this.state.stage;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Modal.prototype, "width", {
            get: function () {
                var width = this.props.width || this.state.width;
                if (this.windowStage === windowStage.FULLSCREEN) {
                    width = window.innerWidth; // @todo 取直接容器宽度
                }
                return width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Modal.prototype, "height", {
            get: function () {
                var height = this.props.height || this.state.height;
                if (this.windowStage === windowStage.MINIMIZED) {
                    height = 0;
                }
                else if (this.windowStage === windowStage.FULLSCREEN) {
                    height = window.innerHeight; // @todo 取直接容器高度
                }
                return height;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Modal.prototype, "top", {
            get: function () {
                if (this.windowStage !== windowStage.FULLSCREEN) {
                    return Math.max(this.props.top || this.state.top || 0, 0);
                }
                return 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Modal.prototype, "left", {
            get: function () {
                if (this.windowStage !== windowStage.FULLSCREEN) {
                    return Math.max(this.props.left || this.state.left || 0, 0);
                }
                return 0;
            },
            enumerable: false,
            configurable: true
        });
        Modal.prototype.render = function () {
            // 暂时暴力处理。@todo 隐藏保留组件
            if (!this.props.visible)
                return null;
            var _a = this.props, appendContainer = _a.appendContainer, theme = _a.theme, _b = _a.mask, mask = _b === void 0 ? true : _b, maskStyle = _a.maskStyle, maskClassName = _a.maskClassName, _c = _a.shouldUpdateOnDrag, shouldUpdateOnDrag = _c === void 0 ? false : _c, _d = _a.draggable, draggable = _d === void 0 ? true : _d, _e = _a.resizable, resizable = _e === void 0 ? true : _e, title = _a.title, titleBarClassName = _a.titleBarClassName, style = _a.style, className = _a.className, _f = _a.zIndex, zIndex = _f === void 0 ? 1000 : _f, contentClassName = _a.contentClassName, children = _a.children, footerClassName = _a.footerClassName, _g = _a.showCancel, showCancel = _g === void 0 ? true : _g, _h = _a.showOk, showOk = _h === void 0 ? true : _h, cancelText = _a.cancelText, okText = _a.okText, footer = _a.footer;
            var isDragging = this.state.isDragging;
            var Window = (React__default['default'].createElement(React__default['default'].Fragment, null,
                mask && (React__default['default'].createElement("div", { style: __assign(__assign({}, maskStyle), { zIndex: zIndex }), className: classNames('rm-mask', maskClassName), onClick: this.onHandleMaskClick })),
                React__default['default'].createElement("div", { style: __assign({ width: this.width, height: this.height, top: this.top, left: this.left, zIndex: zIndex + 1 }, style), className: classNames('rm-window', className, theme, {
                        'rm-window-minimized': this.windowStage === 'MINIMIZED',
                    }), tabIndex: -1, onFocus: function (e) { return e.target.classList.add('rm-state-focused'); }, onBlur: function (e) { return e.target.classList.remove('rm-state-focused'); }, onKeyDown: this.onHandleKeyDown },
                    React__default['default'].createElement(Optimization, { shouldUpdateOnDrag: shouldUpdateOnDrag, isDragging: isDragging },
                        React__default['default'].createElement(TitleBar, { className: titleBarClassName, stage: this.windowStage, draggable: draggable, onDoubleClick: this.doubleClickStageChange, onMinimizeButtonClick: this.handleMinimize, onFullScreenButtonClick: this.handleFullscreen, onRestoreButtonClick: this.handleRestore, onCloseButtonClick: this.handleCloseWindow, minimizeButton: this.props.minimizeButton, maximizeButton: this.props.maximizeButton, restoreButton: this.props.restoreButton, closeButton: this.props.closeButton, onPress: this.onPress, onDrag: this.onDrag, onRelease: this.onRelease }, title),
                        this.windowStage !== windowStage.MINIMIZED ? (React__default['default'].createElement("div", { className: classNames('rm-window-content', contentClassName) }, children)) : null,
                        (this.windowStage !== windowStage.MINIMIZED && (showCancel || showOk) && footer !== null) && (React__default['default'].createElement(FooterBar, { className: footerClassName, showCancel: showCancel, showOk: showOk, cancelText: cancelText, okText: okText, onCancel: this.handleCloseWindow, onOk: this.onHandleOk, footer: footer })),
                        this.windowStage === windowStage.DEFAULT && resizable && (React__default['default'].createElement(ResizeHandlers, { onResize: this.onHandleResize }))))));
            if (!appendContainer) {
                return reactDom.createPortal(Window, document.body);
            }
            if (appendContainer instanceof HTMLElement) {
                return reactDom.createPortal(Window, appendContainer);
            }
            return Window;
        };
        return Modal;
    }(React.Component));

    return Modal;

})));
