import { AppBar, Toolbar } from "@material-ui/core";
import SelectPlantState from "../Components/SelectPlantState";
import "./MainPage.css";

/*
  Main page.

  Lazy fetching of dates to choose from.
  MainPageOptions bar supposed to contain the buttons (from SelectPlanState.js) to show state of plant(s).
*/
function MainPage() {
  // TODO: helper function to help render buttons without hard-coding them.
  return (
    <div className="MainPage">
      <AppBar position="static">
        <Toolbar>
          <h3>Plant monitoring dashboard</h3>
        </Toolbar>
      </AppBar>
      <div className="MainPageOptions">
        <SelectPlantState date={"20210606"} name={"6th June 2021"} />
      </div>
    </div>
  );
}

export default MainPage;
