import React from "react";
import "./styles.css";
import Draggable from "./DND/Draggable.js";

export default function App() {
  return (
    <table border="1px solid black">
      <thead>
        <tr>
          <Draggable type="td">
            <div id="C1">Col 1</div>
          </Draggable>
          <Draggable type="td">
            <div id="C2">Col 2</div>
          </Draggable>
          <Draggable type="td">
            <div id="C3">Col 3</div>
          </Draggable>
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
