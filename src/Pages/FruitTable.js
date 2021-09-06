import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Box, IconButton, Button } from "@material-ui/core";
import DisplaySelectedWindow from "../Components/DisplaySelectedWindow";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import Requests from "../Utils/Requests";
import Paper from "@material-ui/core/Paper";
import "./FruitTable.css";


const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});

const defaultInformationValue = { Data: {Results: []}, loading: false };
const defaultNoShowPicture = {Show: false, RefId: ""};

/*
  Fruit Table

  Display fruit progression of fruits on a table with interactive images that show its location.

  ObjectsInfo: []List of JSON. The JSON should be in the form:
    ResultFromTime: [] Data detailing info of plant along with created timestamp.
    PlantInfo: Plant type (in this case is Tomato).
    EasyID: Human readable ID.

*/
function FruitTable() {
  const [information, setInformation] = useState({ Data: {Results: []}, loading: true });
  const [showPicture, setShowPicture] = useState(defaultNoShowPicture);
  const [pictureWindow, setPictureWindow] = useState(<></>);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const history = useHistory();
  const query = useQuery();

  const returnHome = () => {
    history.push("/home?data-type=fruits");
  };

  const classes = useStyles();

  const showPictureOnScreen = (e, referId) => {
    e.preventDefault();
    setShowPicture({Show: true, RefId: referId});
  };

  const exitPictureView = () => {
    setShowPicture(defaultNoShowPicture);
  };

  const convertJSONtoReadable = (data) => {
    let dataString = [];
    let i = 0;
    try{
      const keys = Object.keys(data).filter(a => a.toLowerCase() != "environmentref");
      for (const key of keys) dataString.push(<h4 key={i++}>{`${key}: ${data[key]}`}</h4>);
    }catch(e){
      dataString = [];
    }
    
    return dataString;
  };

  // Initially get all the object data that can be used to populate the table.
  useEffect(async () => {
    const responseFruitData = await Requests.fetchAllInfoPlantPart(query.get("id"));
    let data = responseFruitData.ok ? await responseFruitData.json() : undefined;
    if (!data && information.loading) setInformation(defaultInformationValue);

    // Get relevant data info for different times.
    const objectsInfo = [];
    data.forEach((o) => {
      objectsInfo.push({
        Data: o["Data"],
        Updated: o["createdAt"].slice(0, 10).replaceAll(/-/g, "")
      });
    });

    const responseFruitCommonInfo = await Requests.fetchDetailedInfoAboutPlantPart(query.get("id"));
    data = responseFruitCommonInfo.ok ? await responseFruitCommonInfo.json() : undefined;
    if (!data && information.loading) setInformation(defaultInformationValue);

    const dataResult = {
      Results: objectsInfo,
      Name: data["Name"],
      EasyId: data["EasyId"]
    };

    setInformation({ Data: dataResult, loading: false });
  }, []);

  // Make picture window appear.
  useEffect(() => {
    if(!showPicture.Show) setPictureWindow(<></>);
    else setPictureWindow(<DisplaySelectedWindow reference={showPicture.RefId} exit={exitPictureView} />);
  }, [showPicture]);

  return (
    <div className="FruitTable">
      <AppBar position="relative">
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <IconButton aria-label="Return to Home" onClick={returnHome} variant="contained">
              <HomeIcon />
            </IconButton>
            <h3>
              &nbsp;&nbsp;&nbsp;Table for&nbsp;
              {information.Data.EasyId > -1 ? `a plant with ID of ${information.Data.EasyId}` : "an item that is still loading or not available!"}
            </h3>
          </Box>
          <IconButton aria-label="Information" variant="contained">
            <InfoIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="FruitTableBody">
        <div className="FruitTableData">
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Information</TableCell>
                  <TableCell align="center">Views</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {information.Data.Results.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" align="center">
                      {data.Updated}
                    </TableCell>
                    <TableCell align="center">
                      {convertJSONtoReadable(data.Data).map(o => {return o;})}
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" onClick={(e) => {showPictureOnScreen(e, data.Data["EnvironmentRef"]);}}>
                        View Location
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {pictureWindow}
      </div>
    </div>
  );
}

export default FruitTable;
