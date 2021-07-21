import { AppBar, Toolbar } from "@material-ui/core";
import SelectPlantState from "../Components/SelectPlantState";
import "./MainPage.css";

/*
  Main page.

  Lazy fetching of dates to choose from.
  MainPageOptions bar supposed to contain the buttons (from SelectPlanState.js) to show state of plant(s).

  Required state:
  options: List of JSON in the form:
    {
      date: "20200606",
      name: "Example One" <-- optional.
    }
*/
function MainPage() {
  // TODO: helper function to help render buttons without hard-coding them.
  const options = [
    {
      date: "20210606",
      name: "6th June 2021"
    }
  ];

  return (
    <div className="MainPage">
      <AppBar position="static">
        <Toolbar>
          <h3>Plant monitoring dashboard</h3>
        </Toolbar>
      </AppBar>
      <div className="MainPageOptions">
        {options.map((o, i) => {
          if(o["name"]) return <SelectPlantState date={o["date"]} name={o["name"]} key={i}/>;
          return <SelectPlantState date={o["date"]} key={i}/>;
        })}
      </div>
    </div>
  );
}

export default MainPage;
