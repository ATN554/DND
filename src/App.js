import React from "react";
import "./styles.css";
import Draggable from "./DND/Draggable.js";
import Droppable from "./DND/Droppable.js";

export default function App() {
  return (
    <table>
      <thead>
        <tr>
          <Droppable id="D1" type="th">
            <Draggable id="K1" type="div">
              Col 1
            </Draggable>
          </Droppable>
          <Droppable id="D2" type="th">
            <Draggable id="K2" type="div">
              Col 2
            </Draggable>
          </Droppable>
          <Droppable id="D3" type="th">
            <Draggable id="K3" type="div">
              Col 3
            </Draggable>
          </Droppable>
        </tr>
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
      </tbody>
    </table>
  );
}
