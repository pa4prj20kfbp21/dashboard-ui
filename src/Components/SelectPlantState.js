import { Button, Typography } from "@material-ui/core";

/*
  Required props:
  Date: preferrably in a human readable form

  Example HTML component:
  <SelectPlantState date={"20210506"} name={"6th May 2021"} />
*/
function SelectPlantState(props) {

  let buttonRender;

  try {
    buttonRender = props.name ? 
    <Button variant="contained" href={`/monitor_result?date=${props.date}&name=${props.name}`} style={{textTransform: "none"}}>
      <Typography variant="subtitle1">{props.name}</Typography>
    </Button> : 
    <Button variant="contained" href={`/monitor_result?date=${props.date}`} style={{textTransform: "none"}}>
      <Typography variant="subtitle1">Data for<br />{props.date}</Typography>
    </Button>;
  } catch (err) {
    buttonRender = <></>;
  }

  return (
    <div className="PlantStateButton">
      {buttonRender}
    </div>
  );

}

export default SelectPlantState;