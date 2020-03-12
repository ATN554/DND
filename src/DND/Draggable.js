import React from "react";

export default class Draggable extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;

    let axis = this.props.axis === undefined ? "both" : this.props.axis;
    let enabled = this.props.enabled === undefined ? true : this.props.enabled;

    this.state = {
      elements: this.props.children,
      isReadyForDrag: false,
      isDraging: false,
      evtX: 0,
      evtY: 0,
      position: [0, 0],
      innerShift: [0, 0],
      xAxisMove: axis === "horizontal" || axis === "both",
      yAxisMove: axis === "vertical" || axis === "both",
      enabled: enabled,
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);

    this.setEnabled = this.setEnabled.bind(this);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.move = this.move.bind(this);
  }

  componentDidMount() {
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

  setEnabled(enabled) {
    if (this.state.enabled !== enabled) {
      this.setState({enabled: enabled});
    }
  }

  start(x, y) {
    if (this.state.enabled) {
      if (!this.state.isReadyForDrag && !this.state.isDraging) {
        let box = this.refs.refdnd.getBoundingClientRect();
        let _x = this.state.xAxisMove ? x : box.x;
        let _y = this.state.yAxisMove ? y : box.y;
        let position = this.refs.refdnd.style.position;
        let positionDelta = position === "" ? [box.x, box.y] : [0, 0];
        this.setState({
          isReadyForDrag: true,
          isDraging: false,
          evtX: _x,
          evtY: _y,
          position: [box.x, box.y],
          innerShift: [
            this.state.xAxisMove ? (_x - positionDelta[0]) : 0,
            this.state.yAxisMove ? (_y - positionDelta[1]) : 0
          ]
        });
      }
    }
  }

  stop() {
    if (this.state.isReadyForDrag) {
      this.setState({
        isReadyForDrag: false
      });
    } else if (this.state.isDraging) {
      this.setState({
          isDraging: false
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
        }
      );
    }
  }

  move(x, y) {
    let _x = this.state.xAxisMove ? x : this.state.position[0];
    let _y = this.state.yAxisMove ? y : this.state.position[1];
    let allowMove = true;
    if (this.props.allowMove !== undefined) {
      allowMove = this.props.allowMove(this.state.evtX, this.state.evtY, _x, _y);
    }
    if (allowMove) {
      if (this.state.isReadyForDrag) {
        this.setState({
            isReadyForDrag: false,
            isDraging: true
          },
          function() {
            if (this.props.onDragStart !== undefined) {
              this.props.onDragStart(this.props.id, this.state.evtX, this.state.evtY);
            }
          }
        );
      } else if (this.state.isDraging) {
        this.setState({
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
  }

  onMouseDown(event) {
    event.persist();
    event.preventDefault();
    this.start(event.pageX, event.pageY);
  }

  onMouseUp(event) {
    event.preventDefault();
    this.stop();
  }

  onMouseMove(event) {
    event.preventDefault();
    this.move(event.pageX, event.pageY);
  }

  onTouchStart(event) {
    event.preventDefault();
    if (event.changedTouches.length > 0) {
      let touch = event.changedTouches[0];
      this.start(touch.pageX, touch.pageY);
    }
  }

  onTouchEnd(event) {
    event.preventDefault();
    this.stop();
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
        id: this.props.id,
        className: this.props.className,
        style: this.props.style,
        onMouseDown: event => this.onMouseDown(event),
        onTouchStart: event => this.onTouchStart(event),
      },
      [
        this.props.children,
        this.state.isDraging &&
          React.createElement(
            "div",
            {
              id: "dnd",
              key: "dnd",
              className: this.props.className,
              style: {
                ...this.props.style,
                position: "absolute",
                zIndex: 1000,
                left: this.state.evtX - this.state.innerShift[0],
                top: this.state.evtY - this.state.innerShift[1],
                opacity: 0.8
              }
            },
            this.state.elements
          )
      ]
    );
  }
}
