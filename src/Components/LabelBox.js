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


  Example HTML component:
  <LabelBox X={100} Y={150} height={100} width={100} color={"blue"} id={1} key={1} />
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
    props.select(props.id);
    setReveal(true);
  };

  const hideBox = (e) => {
    e.target.style.border = "0 none";
    props.select(-1);
    setReveal(false);
  };

  if (reveal && props.data) props.renderData(props.data);
  
  return (
    <div className="LabelBoxArea" style={styleSettingBox} onMouseEnter={showBox} onMouseLeave={hideBox}/>
  );
}

export default LabelBox;