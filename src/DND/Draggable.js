import React from "react";

export default class Draggable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      element: this.props.children,
      isDrag: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.persist();
    console.log(event);
    this.setState({ isDrag: true });
  }

  render() {
    return (
      <React.Fragment>
        {React.createElement(
          this.props.type,
          { onClick: event => this.onClick(event) },
          this.props.children
        )}
        {this.state.isDrag &&
          React.createElement(
            this.props.type,
            {
              style: {
                position: "absolute",
                zIndex: 1000,
                left: 50,
                top: 100
              }
            },
            this.props.children
          )}
      </React.Fragment>
    );
  }
}
