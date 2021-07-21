import "./InfoDisplay.css";

/*
  Required props:
  Data: Object{
    itemType: Red Tomato
    measurement: 25ml
  }
  x: relative triggered x position
  y: relative triggered y position
  width: relative width of parent container
  height: relative height of parent container

  Example HTML component:
  <InfoDisplay data={{ "Object": "Red Tomato", "Volume": "65ml" }} x={10} y={10} height={100} width={100} />
*/
function InfoDisplay(props) {

  if (props.data) {
    let dataString = [];
    let i = 0;
    try {
      const keys = Object.keys(props.data);
      for (const key of keys) dataString.push(<h4 key={i++}>{`${key}: ${props.data[key]}`}</h4>);
    } catch (err) {
      dataString = [];
    }

    let transformingStyle = {};

    transformingStyle[(props.x < props.width / 2) ? "right" : "left"] = "10%";
    transformingStyle[(props.y < props.height / 2) ? "bottom" : "top"] = "10vh";

    return (
      <div className="InfoDisplayBox" style={transformingStyle}>
        {dataString}
      </div>
    );
  }
  return (
    <></>
  );
}

export default InfoDisplay;