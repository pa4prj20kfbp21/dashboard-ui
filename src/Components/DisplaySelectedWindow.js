import { useEffect, useState } from "react";
import { AppBar, Toolbar, Box, IconButton, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Requests from "../Utils/Requests";
import HighLight from "./HighLight";
import "./DisplaySelectedWindow.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 100
  }
}));

/*
  Required props:
  EnvironmentalRef: Associated with image data so make easily retrievable.

  Example HTML component:
  <DisplaySelectedWindow reference={refId} exit={exitPictureView} />
*/
function DisplaySelectedWindow(props) {
  const [currentPage, setCurrentPage] = useState(-1);
  const [imageIDs, setImageIDs] = useState([]);
  const [information, setInformation] = useState({});
  const [highlight, setHighlight] = useState({});

  const handlePageChange = (e) => {
    e.preventDefault();
    setCurrentPage(e.target.value);
  };

  const classes = useStyles();

  // Initialise a list of images to be shown.
  useEffect(async () => {
    try {
      if (props.reference) {
        const getImageDataIds = await Requests.fetchDateByRefId(props.reference);
        const data = getImageDataIds.ok ? await getImageDataIds.json() : [];

        setImageIDs(data[0].RGBImages);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(async() => {
    try {
      if (currentPage >= 0) {
        const getImageData = await Requests.eagerFetchImageInfo(imageIDs[currentPage]);
        const data = getImageData.ok ? await getImageData.json() : {};

        setInformation(data);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentPage]);

  useEffect(async() => {
    try{
      if(information.BoundingBoxes) {
        setHighlight(information.BoundingBoxes.filter(o => o.ObjectID.Object.EasyId === props.ezid)[0]);
      }
    } catch (e) {
      console.error(e);
    }
  }, [information]);

  if (props.reference) {
    return (
      <div className="DisplaySelectedWindow">
        <AppBar position="relative">
          <Toolbar>
            <Box display="flex" flexGrow={1}>
              <h3>Page &nbsp;</h3>
              <FormControl className={classes.formControl} inputProps={{ "aria-label": "Without label" }}>
                <InputLabel>Page</InputLabel>
                <Select value={currentPage} onChange={handlePageChange}>
                  {currentPage === -1 ? <MenuItem value={-1} key={-1}>Select Page</MenuItem> : ""}
                  {imageIDs.map((o,i) => {
                    return <MenuItem value={i} key={i}>{`${i + 1}`}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Box>
            <IconButton aria-label="Information" variant="contained" onClick={props.exit} >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="DisplaySelectedWindowImage">
          {information.ImageURL ? <img src={Requests.imageURLBuild(information.ImageURL)} /> : ""}
          {highlight ? <HighLight
            X={highlight["X"]}
            Y={highlight["Y"]}
            height={highlight["Height"]}
            width={highlight["Width"]}
            color={highlight["Color"]}
            id={"tropbelle"}
          /> : ""}
        </div>
      </div>
    );
  }
  return (
    <></>
  );
}

export default DisplaySelectedWindow;