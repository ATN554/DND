import React from "react";
import Draggable from "../DND/Draggable.js";

export default class ResizableTr extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;

    let enabled = this.props.enabled === undefined ? true : this.props.enabled;

    let elements = this.props.children;
    let modElements = React.Children.map(elements, (child, idx) => {
      return React.cloneElement(
        child,
        { ...child.props, style: { overflow: "hidden", whiteSpace: "nowrap" } },
        [
          child.props.children,
          <Draggable
            id={"resizable-tr-" + idx}
            key={"resizable-tr-" + idx}
            type="div"
            className="th-resizer"
            axis="horizontal"
            onDragStart={(idFrom, x, y) => {
              this.onDragStart(idFrom, x, y);
            }}
            onDragMove={(idFrom, x, y) => {
              this.onDragMove(idFrom, x, y);
            }}
            onDragEnd={(idFrom, idTo, x, y) => {
              this.onDragStop(idFrom, x, y);
            }}
            onDragCancel={(idFrom, x, y) => {
              this.onDragStop(idFrom, x, y);
            }}
            allowMove={(xs, ys, xe, ye) => {
              return true;
            }}
          >
            &nbsp;
          </Draggable>
        ]
      );
    });

    this.state = {
      elements: modElements,
      enabled: enabled,
      pageX: undefined,
      curCol: undefined,
      curColWidth: undefined
    };

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
  }

  onDragStart(idFrom, x, y) {
    let elem = document.getElementById(idFrom);
    let curCol = elem.previousElementSibling; //.parentElement;
    let cs = getComputedStyle(curCol);
    let width =
      curCol.offsetWidth -
      parseFloat(cs.paddingLeft) -
      parseFloat(cs.paddingRight) -
      parseFloat(cs.borderLeftWidth) -
      parseFloat(cs.borderRightWidth);
    this.setState({
      curCol: curCol,
      pageX: x,
      curColWidth: width
    });
  }

  onDragMove(idFrom, x, y) {
    let curCol = this.state.curCol;
    if (curCol) {
      let diffX = x - this.state.pageX;
      curCol.style.width = this.state.curColWidth + diffX + "px";
    }
  }

  onDragStop(idFrom, x, y) {
    this.setState({
      curCol: undefined,
      pageX: undefined,
      curColWidth: undefined
    });
  }

  setEnabled(enabled) {
    if (this.state.enabled !== enabled) {
      this.setState({ enabled: enabled });
    }
  }

  render() {
    return React.createElement(
      "tr",
      {
        ref: "reftrresizer",
        id: this.props.id,
        className: this.props.className,
        style: this.props.style
      },
      this.state.elements
    );
  }
}
