import { useEffect, useState } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import SelectPlantState from "../Components/SelectPlantState";
import Requests from "../Utils/Requests";
import "./MainPage.css";

/*
  Main page.

  Lazy fetching of dates to choose from.
  MainPageOptions bar supposed to contain the buttons (from SelectPlanState.js) to show state of plant(s).

  Required state:
  options: List of JSON in the form:
    {
      Date: "20200606",
      Name: "Example One"
    }
*/
function MainPage() {
  const [options, setOptions] = useState({data: [], loading: true});

  useEffect(async () => {
    const response = await Requests.lazyFetchDates();
    const data = response.ok ? await response.json() : undefined;
    if (data && options.loading) setOptions({data: data, loading: false});
  });

  return (
    <div className="MainPage">
      <AppBar position="static">
        <Toolbar>
          <h3>Plant monitoring dashboard</h3>
        </Toolbar>
      </AppBar>
      <div className="MainPageOptions">
        {options.data.map((o, i) => {
          if (o["Name"]) return <SelectPlantState date={o["Date"].slice(0,10).replaceAll(/-/g, "")} name={o["Name"]} key={i} />;
          return <SelectPlantState date={o["Date"]} key={i} />;
        })}
      </div>
    </div>
  );
}

export default MainPage;
