import { Button, Typography } from "@material-ui/core";

/*
  Required props:
  Name and Id

  Example HTML component:
  <SelectPlantState objectId={"87ef68e76f8aw"} name={"Tomato"} date={154849434753} />
*/
function SelectFruitState(props) {

  let buttonRender;

  try {
    buttonRender =
      <Button variant="contained" href={`/fruit_table?id=${props.realId}`} style={{ textTransform: "none" }}>
        <Typography variant="body1" gutterBottom>
          Item ID: {props.objectId}<br/>{props.name}<br/>
          First Detected: {props.date.replace(/T/, " ").replace(/\..+/, "")}
        </Typography>
      </Button>;
  } catch (err) {
    console.log(err);
    buttonRender = <></>;
  }

  return (
    <div className="FruitStateButton">
      {buttonRender}
    </div>
  );

}

export default SelectFruitState;