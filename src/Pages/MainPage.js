import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppBar, Toolbar, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import SelectPlantState from "../Components/SelectPlantState";
import SelectFruitState from "../Components/SelectFruitState";
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
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let useDataType;
  const query = useQuery();
  switch(query.get("data-type")){
    case "fruits":
      useDataType = "fruits";
      break;
    default:
      useDataType = "dates";
  }

  const [options, setOptions] = useState({data: [], loading: true});
  const [dataType, setDataType] = useState(useDataType);
  const [resultList, setResultList] = useState([]);

  useEffect(async () => {
    let response;

    switch(dataType){
      case "dates": {
        response = await Requests.lazyFetchDates();
        break;
      }

      case "fruits": {
        response = await Requests.lazyFetchObjects("fruits");
        break;
      }

      default: { // In case error.
        response = await Requests.lazyFetchDates();
        break;
      }
    }

    const data = response.ok ? await response.json() : undefined;
    setOptions({data: data, loading: false});
  }, [dataType]);

  const renderOptions = () => {
    const HtmlElements = [];

    switch(dataType){
      case "dates": 
        options.data.map((o, i) => {
          if (o["Name"]) {HtmlElements.push(<SelectPlantState 
            date={o["Date"].slice(0,10).replaceAll(/-/g, "")} 
            name={o["Name"]} 
            objectId={o["ID"]}
            key={i} 
          />);
          }
          else {
            HtmlElements.push(<SelectPlantState 
              date={o["Date"]} 
              objectId={o["ID"]} 
              key={i} 
            />);
          }
        });
        break;

      case "fruits": 
        options.data.map((o, i) => {
          HtmlElements.push(<SelectFruitState 
            date={o["CreatedDate"]} 
            name={o["Name"]} 
            objectId={o["EasyId"]}
            realId={o["ID"]}
            key={i} 
          />);
        });
        break;
    }
    return HtmlElements;
  };

  useEffect(async () => {
    setResultList(renderOptions());
  }, [options]);

  const handleOptionChange = (e) => {
    e.preventDefault();
    setDataType(e.target.value);
  };

  return (
    <div className="MainPage">
      <AppBar position="static">
        <Toolbar>
          <h3>Plant monitoring dashboard</h3>
        </Toolbar>
      </AppBar>
      <div className="MainPageOptionTypes">
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Get values by:
          </FormLabel>
          <RadioGroup row defaultValue="right" value={dataType} onChange={handleOptionChange}>
            <FormControlLabel value="dates" control={<Radio />} label="Dates" />
            <FormControlLabel value="fruits" control={<Radio />} label="Fruits" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="MainPageOptions">
        {resultList.map(o => {return o;})}
      </div>
    </div>
  );
}

export default MainPage;
