import React from "react";
import "./styles.css";
import Draggable from "./DND/Draggable.js";
import Droppable from "./DND/Droppable.js";
import ResizableTr from "./ResizableTr/ResizableTr.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resizer: 
        <div style={{width: "100%", height: "100%", position: 'relative'}}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAFEAYAAADUFFrcAAABN2lDQ1BBZG9iZSBSR0IgKDE5OTgpAAAokZWPv0rDUBSHvxtFxaFWCOLgcCdRUGzVwYxJW4ogWKtDkq1JQ5ViEm6uf/oQjm4dXNx9AidHwUHxCXwDxamDQ4QMBYvf9J3fORzOAaNi152GUYbzWKt205Gu58vZF2aYAoBOmKV2q3UAECdxxBjf7wiA10277jTG+38yH6ZKAyNguxtlIYgK0L/SqQYxBMygn2oQD4CpTto1EE9AqZf7G1AKcv8ASsr1fBBfgNlzPR+MOcAMcl8BTB1da4Bakg7UWe9Uy6plWdLuJkEkjweZjs4zuR+HiUoT1dFRF8jvA2AxH2w3HblWtay99X/+PRHX82Vun0cIQCw9F1lBeKEuf1UYO5PrYsdwGQ7vYXpUZLs3cLcBC7dFtlqF8hY8Dn8AwMZP/fNTP8gAAAAJcEhZcwAACxMAAAsTAQCanBgAAAWzaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MiA3OS4xNjA5MjQsIDIwMTcvMDcvMTMtMDE6MDY6MzkgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTAzLTE1VDExOjI0KzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTAzLTE1VDExOjI0KzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wMy0xNVQxMToyNCswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowZTVjZTliMS1iZTQzLTBkNDQtODc0MS1jMzYxNDk5ODdmMGMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpmM2IyNDE3Ny04YjUxLTM1NDktOWEyNi03MjAzMzBhZTZmZmMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1YjcyYzUxNi1lMDJmLWZhNGEtYjc3Mi1lZmZhODljMzJhODgiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1YjcyYzUxNi1lMDJmLWZhNGEtYjc3Mi1lZmZhODljMzJhODgiIHN0RXZ0OndoZW49IjIwMjAtMDMtMTVUMTE6MjQrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjBlNWNlOWIxLWJlNDMtMGQ0NC04NzQxLWMzNjE0OTk4N2YwYyIgc3RFdnQ6d2hlbj0iMjAyMC0wMy0xNVQxMToyNCswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5vZgVHAAAAHUlEQVQImWNgYGBgYGDYv5/h////////Z4ABbCIAcG0Qb/Z4AYIAAAAASUVORK5CYII=" 
              alt="x"
              className="th-resizer-img"
          />
        </div>
      ,
    };
  }

  render() {
    return (
      <div style={{ position: "absolute" }}>
      <div style={{ position: "static" }}>
      <table>
        <thead>
          <ResizableTr 
            maxWidth={250}
            resizer={this.state.resizer}
          >
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
                <table style={{width: "100%", height: "100%"}}>
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
                <table style={{width: "100%", height: "100%"}}>
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
                <table style={{width: "100%", height: "100%"}}>
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
      </div>
      </div>
    );
  }
}
