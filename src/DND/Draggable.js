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
  }

  componentDidMount() {
    let box = this.refs.refdnd.getBoundingClientRect();
    this.setState({
      size: [(box.right - box.left) / 2, (box.bottom - box.top) / 2]
    });
    console.log("add");
    window.addEventListener("mouseup", this.onMouseUp);
    window.addEventListener("mousemove", this.onMouseMove);
  }

  componentWillUnmount() {
    console.log("remove");
    window.removeEventListener("mouseup", this.onMouseUp);
    window.removeEventListener("mousemove", this.onMouseMove);
  }

  onMouseDown(event) {
    event.persist();
    if (!this.state.isReadyForDrag && !this.state.isDraging) {
      this.setState({
        isReadyForDrag: true,
        isDraging: false
      });
    }
  }

  onMouseUp(event) {
    event.preventDefault();
    if (this.state.isReadyForDrag) {
      this.setState({
        isReadyForDrag: false
      });
    } else if (this.state.isDraging) {
      this.setState(
        {
          isDraging: false,
          evtX: event.clientX,
          evtY: event.clientY
        },
        function() {
          let target = document.elementFromPoint(
            this.state.evtX,
            this.state.evtY
          );
          let droppable = target.closest(".droppable");
          if (droppable) {
            console.log("from: ", this.props.id, "to: ", droppable.id);
          }
        }
      );
    }
  }

  onMouseMove(event) {
    event.preventDefault();
    if (this.state.isReadyForDrag) {
      this.setState({
        isReadyForDrag: false,
        isDraging: true,
        evtX: event.pageX,
        evtY: event.pageY
      });
    } else if (this.state.isDraging) {
      this.setState({ evtX: event.pageX, evtY: event.pageY });
    }
  }

  render() {
    return React.createElement(
      this.props.type,
      {
        ref: "refdnd",
        onMouseDown: event => this.onMouseDown(event),
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
