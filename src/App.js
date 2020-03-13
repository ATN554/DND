import React from "react";
import "./styles.css";
import Draggable from "./DND/Draggable.js";
import Droppable from "./DND/Droppable.js";
import ResizableTr from "./ResizableTr/ResizableTr.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      k1_xs: 0,
      k3_ys: 0
    };
  }

  render() {
    return (
      <table>
        <thead>
          <ResizableTr>
            <Droppable id="D1" type="th">
              <Draggable
                id="K1"
                type="div"
                axis="horizontal"
                className="th-container"
                onDragStart={(idFrom, x, y) => {
                  console.log("start", idFrom, x, y);
                  this.setState({ k1_xs: x });
                }}
                onDragEnd={(idFrom, idTo, x, y) => {
                  console.log("end", idFrom, idTo, x, y);
                }}
                onDragCancel={(idFrom, x, y) => {
                  console.log("cancel", idFrom, x, y);
                }}
              >
                Col 1
              </Draggable>
            </Droppable>
            <Droppable id="D2" type="th">
              <Draggable
                id="K2"
                type="div"
                axis="horizontal"
                className="th-container"
                onDragStart={(idFrom, x, y) => {
                  console.log("start", idFrom, x, y);
                }}
                onDragEnd={(idFrom, idTo, x, y) => {
                  console.log("end", idFrom, idTo, x, y);
                }}
                onDragCancel={(idFrom, x, y) => {
                  console.log("cancel", idFrom, x, y);
                }}
              >
                Col 2
              </Draggable>
            </Droppable>
            <Droppable id="D3" type="th">
              <Draggable
                id="K3"
                type="div"
                className="th-container"
                axis="horizontal"
                onDragStart={(idFrom, x, y) => {
                  console.log("start", idFrom, x, y);
                  this.setState({ k3_ys: y });
                }}
                onDragEnd={(idFrom, idTo, x, y) => {
                  console.log("end", idFrom, idTo, x, y);
                }}
                onDragCancel={(idFrom, x, y) => {
                  console.log("cancel", idFrom, x, y);
                }}
              >
                Col 3
              </Draggable>
            </Droppable>
          </ResizableTr>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
