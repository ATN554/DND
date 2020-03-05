import React from "react";

export default class Droppable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      element: this.props.children
    };
  }

  render() {
    return React.createElement(
      this.props.type,
      { className: "droppable", ...this.props },
      this.props.children
    );
  }
}
