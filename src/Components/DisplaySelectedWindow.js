import { useEffect, useState } from "react";
import { AppBar, Toolbar, Box, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Requests from "../Utils/Requests";
import "./DisplaySelectedWindow.css";

/*
  Required props:
  EnvironmentalRef: Associated with image data so make easily retrievable.

  Example HTML component:
  <DisplaySelectedWindow reference={refId} exit={exitPictureView} />
*/
function DisplaySelectedWindow(props) {
  // const [currentPage, setCurrentPage] = useState(0);
  const [imageIDs, setImageIDs] = useState([]);

  // Initialise a list of images to be shown.
  useEffect(async () => {
    try{
      if(props.reference){
        const getImageDataIds = await Requests.fetchDateByRefId(props.reference);
        const data = getImageDataIds.ok ? await getImageDataIds.json() : [];

        setImageIDs(data[0].RGBImages);
      } 
    }catch(e){
      console.error(e);
    }
  }, []);

  if (props.reference) {
    return (
      <div className="DisplaySelectedWindow">
        <AppBar position="relative">
          <Toolbar>
            <Box display="flex" flexGrow={1}>
              <h3>Image Window</h3>
            </Box>
            <IconButton aria-label="Information" variant="contained" onClick={props.exit} >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="DisplaySelectedWindowImage">
          <h1>{imageIDs.length}</h1>
        </div>
      </div>
    );
  }
  return (
    <></>
  );
}

export default DisplaySelectedWindow;