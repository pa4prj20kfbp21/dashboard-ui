import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Box } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import InfoIcon from "@material-ui/icons/Info";
import InfoDisplay from "../Components/InfoDisplay";
import LabelBox from "../Components/LabelBox";
import Requests from "../Utils/Requests";
import PopUpCommonInfo from "../Components/PopUpCommonInfo";
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
  const [imageSelection, setImageSelection] = useState(0);
  const [showCommon, setShowCommon] = useState(false);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const showCommonInfo = () => {
    setShowCommon(!showCommon);
  };

  const history = useHistory();
  const query = useQuery();

  // Initialise the page.
  useEffect(async () => {
    const responseImageData = await Requests.fetchDate(query.get("id"));
    let data = responseImageData.ok ? await responseImageData.json() : undefined;
    if (!data && information.loading) setInformation({ Data: {}, loading: false });

    const imageOptions = data.RGBImages;
    const monitorDate = data.Name || data.Date;
    const objectsInfo = [];
    const environemtInfoId = data.EnvironmentConditions;

    const eagerGetImageData = await Requests.eagerFetchImageInfo(imageOptions[imageSelection]);
    data = eagerGetImageData.ok ? await eagerGetImageData.json() : undefined;
    if (data && information.loading) {
      data.BoundingBoxes.forEach((o) => {
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
          EnvInfoId: environemtInfoId,
          Name: monitorDate,
          ImageOptions: imageOptions,
          ImageURL: Requests.imageURLBuild(data.ImageURL),
          ObjectsInfo: objectsInfo
        }, 
        loading: false
      });
    }
  }, []);

  // Change to different image when imageSelection changes.
  useEffect(async() => {
    if(information.loading) return;
    const objectsInfo = [];
    const infoData = information.Data;
    const eagerGetImageData = await Requests.eagerFetchImageInfo(infoData.ImageOptions[imageSelection]);
    const data = eagerGetImageData.ok ? await eagerGetImageData.json() : undefined;
    if (data) {
      data.BoundingBoxes.forEach((o) => {
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
          EnvInfoId: infoData.EnvInfoId,
          Name: infoData.Name,
          ImageOptions: infoData.ImageOptions,
          ImageURL: Requests.imageURLBuild(data.ImageURL),
          ObjectsInfo: objectsInfo
        }, 
        loading: false
      });
    }
  }, [imageSelection]);

  const returnHome = () => {
    history.push("/home?data-type=dates");
  };

  const changeSelection = (id) => {
    if (id !== selectedID) setSelectedID(id);
  };

  const moveImageSelection = (next) => {
    const numImages = information.Data.ImageOptions.length || 0;
    const nextNumber = imageSelection + (next ? 1 : -1);

    if(numImages > 0){
      if(nextNumber < 0) setImageSelection(numImages - 1);
      else if(nextNumber >= numImages) setImageSelection(0);
      else setImageSelection(nextNumber);
    }
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
          <Box display='flex' flexGrow={1}>
            <IconButton aria-label="Return to Home" onClick={returnHome} variant="contained">
              <HomeIcon />
            </IconButton>
            <h3>&nbsp;&nbsp;&nbsp;Result for&nbsp;
              {information.Data.Name ? information.Data.Name : "an item that is still loading or not available!"}
            </h3>
          </Box>
          <IconButton aria-label="Backward" onClick={() => moveImageSelection(false)} variant="contained">
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton aria-label="Forward" onClick={() => moveImageSelection(true)} variant="contained">
            <ArrowForwardIosIcon />
          </IconButton>
          <IconButton aria-label="Information" onClick={showCommonInfo} variant="contained">
            <InfoIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="ResultPageBody">
        <div className="ResultPageImageBody" onMouseMove={captureMouseInput} id="rpib69420">
          {information.Data.ImageURL ? <img src={information.Data.ImageURL} id="imgrespage2016" /> : <></>}
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
      {showCommon && information.Data.EnvInfoId ? <PopUpCommonInfo infoId={information.Data.EnvInfoId}/> : <></>}
    </div>
  );
}

export default ResultPage;
