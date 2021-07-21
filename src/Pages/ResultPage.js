import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import InfoDisplay from "../Components/InfoDisplay";
import LabelBox from "../Components/LabelBox";
import "./ResultPage.css";

/*
  Required props:
  dateTaken: preferrably in epoch timestamp.

  Required states:
  Medium: image(s) or point cloud if possible. <-- Point Cloud not confirmed.
  ObjectsInfo: []List of JSON. The JSON should be in the form:
    ID: used to identify unique of object.
    X: left offset in px
    Y: down offset in px
    Height: box height in px
    Width: box width in px
    Color: color of the outline border

  LabelBox component will be used to show plant information in ResultPageImageBody.
*/
function ResultPage() {
  const objectsInfo = [
    {
      X: 80,
      Y: 204,
      height: 135,
      width: 132,
      color: "yellow",
      data: { "Object": "Red Tomato", "Volume": "65ml" }
    },{
      X: 196,
      Y: 177,
      height: 120,
      width: 128,
      color: "yellow",
      data: { "Object": "Red Tomato", "Volume": "55ml" }
    },{
      X: 85,
      Y: 19,
      height: 60,
      width: 75,
      color: "red",
      data: { "Object": "Leaf", "Length": "2.4cm" }
    },{
      X: 179,
      Y: 50,
      height: 67,
      width: 50,
      color: "red",
      data: { "Object": "Leaf", "Length": "2.2cm" }
    }
]; // TODO: Populate this without hardcoding.

  const [selectedID, setSelectedID] = useState(-1);
  const [cursorPosition, setCursorPosition] = useState({x: 0, y:0});

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const history = useHistory();
  const query = useQuery();

  const returnHome = () => {
    history.push("/home");
  };

  const changeSelection = (id) => {
    if(id !== selectedID) setSelectedID(id);
  };

  const captureMouseInput = (e) => {
    const objectProperties = document.getElementById("rpib69420").getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - objectProperties.left, 
      y: e.clientY - objectProperties.top,
      height: objectProperties.height,
      width: objectProperties.width
    });
  };

  // TODO: helper function that allows rendering different image without hardcoding.
  return (
    <div className="ResultPage">
      <AppBar position="relative">
        <Toolbar>
          <IconButton aria-label="Return to Home" onClick={returnHome} variant="contained">
            <HomeIcon />
          </IconButton>
          <h3>&nbsp;&nbsp;&nbsp;Result for {query.get("name") || query.get("date")}</h3>
        </Toolbar>
      </AppBar>
      <div className="ResultPageBody">
        <div className="ResultPageImageBody" onMouseMove={captureMouseInput} id="rpib69420">
          <img src={`${query.get("date")}.png`} />
          {objectsInfo.map((o,i) => {
            return (<LabelBox 
              X={o["X"]} 
              Y={o["Y"]} 
              height={o["height"]} 
              width={o["width"]} 
              color={o["color"] || "black"} 
              id={i}
              key={i} 
              select={changeSelection} 
            />);
          })}
        </div>
        {selectedID < 0 ? <></> : <InfoDisplay 
          data={objectsInfo[selectedID]["data"]} 
          x={cursorPosition["x"]} 
          y={cursorPosition["y"]}
          height={cursorPosition["height"]}
          width={cursorPosition["width"]}
        />}
      </div>
    </div>
  );
}

export default ResultPage;
