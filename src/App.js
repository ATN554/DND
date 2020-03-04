import React from "react";
import "./styles.css";
import Draggable from "./DND/Draggable.js";

export default function App() {
  return (
    <table border="1px solid black">
      <thead>
        <tr>
          <Draggable type="td">
            <div>Col 1</div>
          </Draggable>
          <td>Col 2</td>
          <td>Col 3</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>A</td>
          <td>B</td>
          <td>C</td>
        </tr>
      </tbody>
    </table>
  );
}
