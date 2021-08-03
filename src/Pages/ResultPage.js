import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import InfoDisplay from "../Components/InfoDisplay";
import LabelBox from "../Components/LabelBox";
import Requests from "../Utils/Requests";
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
  const [selectedID, setSelectedID] = useState(-1);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [information, setInformation] = useState({ Data: {}, loading: true });
  const [imageSelection] = useState(0);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const history = useHistory();
  const query = useQuery();

  useEffect(async () => {
    // Get the image IDs. 
    const responseImageData = await Requests.fetchDate(query.get("id"));
    let data = responseImageData.ok ? await responseImageData.json() : undefined;
    if (!data && information.loading) setInformation({ Data: {}, loading: false });

    const imageOptions = data.RGBImages;
    const monitorDate = data.Name || data.Date;
    const objectsInfo = [];

    const eagerGetImageData = await Requests.eagerFetchImageInfo(imageOptions[imageSelection]);
    data = eagerGetImageData.ok ? await eagerGetImageData.json() : undefined;
    if (data && information.loading) {
      data.BoundingBoxes.forEach((o,i) => {
        let data = o["ObjectID"]["Data"];
        data["Name"] = o["ObjectID"]["Object"]["Name"];

        objectsInfo.push({
          X: o["X"],
          Y: o["Y"],
          height: o["Height"],
          width: o["Width"],
          color: o["Color"],
          data: data
        });
      });

      setInformation({
        Data: {
          Name: monitorDate,
          ImageOptions: imageOptions,
          ImageURL: Requests.imageURLBuild(data.ImageURL),
          ObjectsInfo: objectsInfo
        }, 
        loading: false
      });
    }
  }, []);

  const returnHome = () => {
    history.push("/home");
  };

  const changeSelection = (id) => {
    if (id !== selectedID) setSelectedID(id);
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

  return (
    <div className="ResultPage">
      <AppBar position="relative">
        <Toolbar>
          <IconButton aria-label="Return to Home" onClick={returnHome} variant="contained">
            <HomeIcon />
          </IconButton>
          <h3>&nbsp;&nbsp;&nbsp;Result for&nbsp;
            {information.Data.Name ? information.Data.Name : "an item that is still loading or not available!"}
          </h3>
        </Toolbar>
      </AppBar>
      <div className="ResultPageBody">
        <div className="ResultPageImageBody" onMouseMove={captureMouseInput} id="rpib69420">
          {information.Data.ImageURL ? <img src={information.Data.ImageURL} /> : <></>}
          {information.Data.ObjectsInfo ? information.Data.ObjectsInfo.map((o, i) => {
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
          }) : <></>}
        </div>
        {selectedID < 0 ? <></> : <InfoDisplay
          data={information.Data.ObjectsInfo ? information.Data.ObjectsInfo[selectedID]["data"] : {}}
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
