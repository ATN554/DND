import React from "react";

export default class Draggable extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;

    this.state = {
      element: this.props.children,
      isReadyForDrag: false,
      isDraging: false,
      evtX: 0,
      evtY: 0,
      size: [0, 0]
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
      size: [(box.right - box.left) / 2, (box.bottom - box.top) / 2]
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
      this.setState(
        {
          isDraging: false,
          evtX: x,
          evtY: y
        },
        function() {
          let target = document.elementFromPoint(
            this.state.evtX,
            this.state.evtY
          );
          console.log(target);
          if (target) {
            let droppable = target.closest(".droppable");
            if (droppable) {
              console.log("from: ", this.props.id, "to: ", droppable.id);
            }
          }
        }
      );
    }
  }

  move(x, y) {
    if (this.state.isReadyForDrag) {
      this.setState({
        isReadyForDrag: false,
        isDraging: true,
        evtX: x,
        evtY: y
      });
    } else if (this.state.isDraging) {
      this.setState({ evtX: x, evtY: y });
    }
  }

  onMouseDown() {
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

  onTouchStart() {
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
                left: this.state.evtX - this.state.size[0],
                top: this.state.evtY - this.state.size[1],
                opacity: 0.8
              }
            },
            this.props.children
          )
      ]
    );
  }
}
