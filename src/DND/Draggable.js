import React from "react";

export default class Draggable extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;

    let axis = this.props.axis === undefined ? "both" : this.props.axis;

    this.state = {
      element: this.props.children,
      isReadyForDrag: false,
      isDraging: false,
      evtX: 0,
      evtY: 0,
      position: [0, 0],
      delta: [0, 0],
      xAxisMove: axis === "horizontal" || axis === "both",
      yAxisMove: axis === "vertical" || axis === "both"
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.move = this.move.bind(this);
  }

  componentDidMount() {
    let box = this.refs.refdnd.getBoundingClientRect();
    this.setState({
      position: [box.x, box.y],
      delta: [
        this.state.xAxisMove ? (box.right - box.left) / 2 : 0,
        this.state.yAxisMove ? (box.bottom - box.top) / 2 : 0
      ]
    });
    window.addEventListener("mouseup", this.onMouseUp);
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("touchend", this.onTouchEnd);
    window.addEventListener("touchmove", this.onTouchMove);
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.onMouseUp);
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("touchend", this.onTouchEnd);
    window.removeEventListener("touchmove", this.onTouchMove);
  }

  start() {
    if (!this.state.isReadyForDrag && !this.state.isDraging) {
      this.setState({
        isReadyForDrag: true,
        isDraging: false
      });
    }
  }

  stop(x, y) {
    if (this.state.isReadyForDrag) {
      this.setState({
        isReadyForDrag: false
      });
    } else if (this.state.isDraging) {
      let _x = this.state.xAxisMove ? x : this.state.position[0];
      let _y = this.state.yAxisMove ? y : this.state.position[1];
      this.setState(
        {
          isDraging: false,
          evtX: _x,
          evtY: _y
        },
        function() {
          let target = document.elementFromPoint(
            this.state.evtX,
            this.state.evtY
          );
          let idFrom = this.props.id;
          if (target) {
            let droppable = target.closest(".droppable");
            if (droppable) {
              let idTo = droppable.id;
              if (idFrom !== idTo) {
                if (this.props.onDragEnd !== undefined) {
                  this.props.onDragEnd(idFrom, idTo, this.state.evtX, this.state.evtY);
                }
              } else {
                if (this.props.onDragCancel !== undefined) {
                  this.props.onDragCancel(idFrom, this.state.evtX, this.state.evtY);
                }
              }
            } else {
              if (this.props.onDragCancel !== undefined) {
                this.props.onDragCancel(idFrom, this.state.evtX, this.state.evtY);
              }
            }
          } else {
            if (this.props.onDragCancel !== undefined) {
              this.props.onDragCancel(idFrom, this.state.evtX, this.state.evtY);
            }
          }
        }
      );
    }
  }

  move(x, y) {
    let _x = this.state.xAxisMove ? x : this.state.position[0];
    let _y = this.state.yAxisMove ? y : this.state.position[1];
    if (this.state.isReadyForDrag) {
      this.setState(
        {
          isReadyForDrag: false,
          isDraging: true,
          evtX: _x,
          evtY: _y
        },
        function() {
          if (this.props.onDragStart !== undefined) {
            this.props.onDragStart(this.props.id, this.state.evtX, this.state.evtY);
          }
        }
      );
    } else if (this.state.isDraging) {
      this.setState(
        {
          evtX: _x,
          evtY: _y
        },
        function() {
          if (this.props.onDragMove !== undefined) {
            this.props.onDragMove(this.props.id, this.state.evtX, this.state.evtY);
          }
        }
      );
    }
  }

  onMouseDown(event) {
    event.preventDefault();
    this.start();
  }

  onMouseUp(event) {
    event.preventDefault();
    this.stop(event.clientX, event.clientY);
  }

  onMouseMove(event) {
    event.preventDefault();
    this.move(event.pageX, event.pageY);
  }

  onTouchStart(event) {
    event.preventDefault();
    this.start();
  }

  onTouchEnd(event) {
    event.preventDefault();
    if (event.changedTouches.length > 0) {
      let touch = event.changedTouches[0];
      this.stop(touch.clientX, touch.clientY);
    }
  }

  onTouchMove(event) {
    event.preventDefault();
    if (event.changedTouches.length > 0) {
      let touch = event.changedTouches[0];
      this.move(touch.pageX, touch.pageY);
    }
  }

  render() {
    return React.createElement(
      this.props.type,
      {
        ref: "refdnd",
        onMouseDown: event => this.onMouseDown(event),
        onTouchStart: event => this.onTouchStart(event),
        ...this.props
      },
      [
        this.props.children,
        this.state.isDraging &&
          React.createElement(
            "div",
            {
              id: "dnd",
              key: "dnd",
              ...this.props,
              style: {
                position: "absolute",
                zIndex: 1000,
                left: this.state.evtX - this.state.delta[0],
                top: this.state.evtY - this.state.delta[1],
                opacity: 0.8
              }
            },
            this.props.children
          )
      ]
    );
  }
}
