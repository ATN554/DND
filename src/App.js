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
            <Draggable 
              id="K1" 
              type="div" 
              axis="horizontal" 
              onDragStart={(a, b, c)=>{console.log("start", a, b, c)}} 
              onDragMove={(a, b, c)=>{console.log("move",a, b, c)}}
              onDragEnd={(a, b, c, d)=>{console.log("end",a, b, c ,d)}}
              onDragCancel={(a, b, c)=>{console.log("cancel",a, b, c)}}
            >
              Col 1
            </Draggable>
          </Droppable>
          <Droppable id="D2" type="th">
            <Draggable 
              id="K2" 
              type="div"
              onDragStart={(a, b, c)=>{console.log("start", a, b, c)}} 
              onDragMove={(a, b, c)=>{console.log("move",a, b, c)}}
              onDragEnd={(a, b, c, d)=>{console.log("end",a, b, c ,d)}}
              onDragCancel={(a, b, c)=>{console.log("cancel",a, b, c)}}
            >
              Col 2
            </Draggable>
          </Droppable>
          <Droppable id="D3" type="th">
            <Draggable 
              id="K3" 
              type="div" 
              axis="vertical"
              onDragStart={(a, b, c)=>{console.log("start", a, b, c)}} 
              onDragMove={(a, b, c)=>{console.log("move",a, b, c)}}
              onDragEnd={(a, b, c, d)=>{console.log("end",a, b, c ,d)}}
              onDragCancel={(a, b, c)=>{console.log("cancel",a, b, c)}}
            >
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
