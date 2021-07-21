import "./LabelBox.css";
import { useState } from "react";

/*
  Required props:
  ID: unique integer for every labelbox
  X: left offset in px
  Y: down offset in px
  Height: box height in px
  Width: box width in px
  Color: color of the outline border
  Data: Object{
    itemType: Red Tomato
    measurement: 25ml
  }

  Example HTML component:
  <LabelBox X={100} Y={150} height={100} width={100} color={"blue"} id={1} data={{ "Object": "Red Tomato", "Volume": "65ml" }} />
*/
function LabelBox(props) {
  const [reveal, setReveal] = useState(false);

  const styleSettingBox = {
    left: `${props.X - (reveal ? 5 : 0)}px`,
    top: `${props.Y - (reveal ? 5 : 0)}px`,
    height: `${props.height}px`,
    width: `${props.width}px`
  };

  const showBox = (e) => {
    e.target.style.border = `5px double ${props.color ? props.color : "black"}`;
    setReveal(true);
  };

  const hideBox = (e) => {
    e.target.style.border = "0 none";
    setReveal(false);
  };

  if (reveal && props.data) {
    let keys;
    let dataString = [];
    try {
      keys = Object.keys(props.data);
      for (const key of keys) dataString.push(<h4>{`${key}: ${props.data[key]}`}</h4>);
    } catch (err) {
      dataString = [];
    }

    return (
      <>
        <div className="LabelBoxArea" style={styleSettingBox} onMouseOver={showBox} onMouseLeave={hideBox} />
        <div className="LabelBoxInfo">
          {dataString}
        </div>
      </>
    );
  }
  return (
    <div className="LabelBoxArea" style={styleSettingBox} onMouseEnter={showBox} onMouseLeave={hideBox} />
  );
}

export default LabelBox;