import React from "react";

export default class Draggable extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;

    this.state = {
      element: this.props.children,
      isDrag: false,
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
  }

  onMouseDown(event) {
    event.persist();
    this.setState({ isDrag: true, evtX: event.pageX, evtY: event.pageY });
  }

  onMouseUp(event) {
    event.persist();
    this.setState(
      { isDrag: false, evtX: event.pageX, evtY: event.pageY },
      function() {
        console.log(this.state.evtX, this.state.evtY);
        console.log(
          document.elementFromPoint(this.state.evtX, this.state.evtY)
        );
      }
    );
  }

  onMouseMove(event) {
    event.persist();
    this.setState({ evtX: event.pageX, evtY: event.pageY });
  }

  render() {
    return (
      <React.Fragment>
        {React.createElement(
          this.props.type,
          {
            ref: "refdnd",
            onMouseDown: event => this.onMouseDown(event),
            onMouseUp: event => this.onMouseUp(event),
            onMouseMove: event => this.onMouseMove(event)
          },
          [
            this.props.children,
            this.state.isDrag &&
              React.createElement(
                "div",
                {
                  id: "dnd",
                  key: "dnd",
                  style: {
                    position: "absolute",
                    zIndex: 1000,
                    left: this.state.evtX - this.state.size[0],
                    top: this.state.evtY - this.state.size[1],
                    border: "1px solid black",
                    borderRadius: "5px 5px 5px 5px",
                    opacity: 0.8,
                    background: "#FFF",
                    padding: "5px"
                  }
                },
                this.props.children
              )
          ]
        )}
      </React.Fragment>
    );
  }
}
