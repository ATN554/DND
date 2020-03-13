import React from "react";
import "./styles.css";
import Draggable from "./DND/Draggable.js";
import Droppable from "./DND/Droppable.js";
import ResizableTr from "./ResizableTr/ResizableTr.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <table>
        <thead>
          <ResizableTr maxWidth={250}>
            <Droppable id="Droppable1" type="th">
              <Draggable
                id="Draggable1"
                type="div"
                axis="horizontal"
                className="th-container"
                onDragStart={(idFrom, x, y) => {console.log("start", idFrom, x, y);}}
                onDragEnd={(idFrom, idTo, x, y) => {console.log("end", idFrom, idTo, x, y);}}
                onDragCancel={(idFrom, x, y) => {console.log("cancel", idFrom, x, y);}}
              >
                <table style={{width: "100%"}}>
                  <tbody>
                    <tr>
                      <td style={{width: "100%"}}>Заголовок №1</td>
                      <td><input style={{padding: "0px", margin: "0px"}} type="button" value="m" onClick={() => alert("Открыть меню")}/></td>
                      <td><input style={{padding: "0px", margin: "0px"}} type="button" value="g" onClick={() => alert("Добавить в группу")}/></td>
                    </tr>
                  </tbody>
                </table>
              </Draggable>
            </Droppable>
            <Droppable id="Droppable2" type="th">
              <Draggable
                id="Draggable2"
                type="div"
                axis="horizontal"
                className="th-container"
                onDragStart={(idFrom, x, y) => {console.log("start", idFrom, x, y);}}
                onDragEnd={(idFrom, idTo, x, y) => {console.log("end", idFrom, idTo, x, y);}}
                onDragCancel={(idFrom, x, y) => {console.log("cancel", idFrom, x, y);}}
              >
                <table style={{width: "100%"}}>
                  <tbody>
                    <tr>
                      <td style={{width: "100%"}}>Колонка №2</td>
                      <td><input style={{padding: "0px", margin: "0px"}} type="button" value="m" onClick={() => alert("Открыть меню")}/></td>
                      <td><input style={{padding: "0px", margin: "0px"}} type="button" value="g" onClick={() => alert("Добавить в группу")}/></td>
                    </tr>
                  </tbody>
                </table>
              </Draggable>
            </Droppable>
            <Droppable id="Droppable3" type="th">
              <Draggable
                id="Draggable3"
                type="div"
                className="th-container"
                axis="horizontal"
                onDragStart={(idFrom, x, y) => {console.log("start", idFrom, x, y);}}
                onDragEnd={(idFrom, idTo, x, y) => {console.log("end", idFrom, idTo, x, y);}}
                onDragCancel={(idFrom, x, y) => {console.log("cancel", idFrom, x, y);}}
              >
                <table style={{width: "100%"}}>
                  <tbody>
                    <tr>
                      <td style={{width: "100%"}}>Кол. №3</td>
                      <td><input style={{padding: "0px", margin: "0px"}} type="button" value="m" onClick={() => alert("Открыть меню")}/></td>
                      <td><input style={{padding: "0px", margin: "0px"}} type="button" value="g" onClick={() => alert("Добавить в группу")}/></td>
                    </tr>
                  </tbody>
                </table>
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
