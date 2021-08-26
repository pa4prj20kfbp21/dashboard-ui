import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Box, IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import Requests from "../Utils/Requests";
import "./MainPage.css";

/*
  Fruit Table

  Display fruit progression of fruits on a table with interactive images that show its location.

  ObjectsInfo: []List of JSON. The JSON should be in the form:
    ResultFromTime: [] Data detailing info of plant along with created timestamp.
    PlantInfo: Plant type (in this case is Tomato).
    EasyID: Human readable ID. <-- Might not include.

*/
function FruitTable() {
  const [information, setInformation] = useState({ Data: {}, loading: true });

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const history = useHistory();
  const query = useQuery();

  const returnHome = () => {
    history.push("/home");
  };

  // Initially get all the object data that can be used to populate the table.
  useEffect(async () => {
    const responseFruitData = await Requests.fetchAllInfoPlantPart(query.get("id"));
    let data = responseFruitData.ok ? await responseFruitData.json() : undefined;
    if (!data && information.loading) setInformation({ Data: {}, loading: false });

    // Get relevant data info for different times.
    const objectsInfo = [];
    data.forEach((o) => {
      objectsInfo.push({
        Data: o["Data"],
        Updated: o["createdAt"].slice(0,10).replaceAll(/-/g, "")
      });
    });


    const responseFruitCommonInfo = await Requests.fetchDetailedInfoAboutPlantPart(query.get("id"));
    data = responseFruitCommonInfo.ok ? await responseFruitCommonInfo.json() : undefined;
    if (!data && information.loading) setInformation({ Data: {}, loading: false });

    const dataResult = {
      Results: objectsInfo,
      Name: data["Name"],
      EasyId: data["EasyId"]
    };

    setInformation({Data: dataResult, loading: false});
  }, []);

  console.log(information);
  return (
    <div className="FruitTable">
      <AppBar position="relative">
        <Toolbar>
          <Box display='flex' flexGrow={1}>
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

      </div>
    </div>
  );
}

export default FruitTable;
