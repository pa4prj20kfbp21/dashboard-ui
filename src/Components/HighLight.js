import "./HighLight.css";

/*
  Required props:
  ID: unique integer for every labelbox
  X: left offset in px
  Y: down offset in px
  Height: box height in px
  Width: box width in px
  Color: color of the outline border


  Example HTML component:
  <Highlight X={100} Y={150} height={100} width={100} color={"blue"} id={1} />
*/
function HighLight(props) {

  const styleSettingBox = {
    left: `${props.X - 5}px`,
    top: `${props.Y - 5}px`,
    height: `${props.height}px`,
    width: `${props.width}px`,
    border: `5px double ${props.color ? props.color : "black"}`
  };

  return (
    <div className="HighLightArea" style={styleSettingBox} />
  );
}

export default HighLight;
