import { useHistory, useLocation } from "react-router-dom";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import LabelBox from "../Components/LabelBox";
import HomeIcon from "@material-ui/icons/Home";

/*
    Required props:
    dateTaken: preferrably in epoch timestamp.

    Required states:
    Medium: image(s) or point cloud if possible. <-- not confirmed.
    ObjectInfo: Meta information needed for LabelBox.

    LabelBox component will be used to show plant information below AppBar.
*/
function ResultPage(props) {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const history = useHistory();
  const query = useQuery();

  const returnHome = () => {
    history.push("/home");
  };

  // TODO: helper function that adds LabelBox renders based on props.
  return (
    <div className="ResultPage">
      <AppBar position="static">
        <Toolbar>
          <IconButton aria-label="Return to Home" onClick={returnHome} variant="contained">
            <HomeIcon />
          </IconButton>
          <h3>&nbsp;&nbsp;&nbsp;Result for {query.get("name") || query.get("date")}</h3>
        </Toolbar>
      </AppBar>
      <img src={`${query.get("date")}.png`} />
      <LabelBox X={80} Y={260} height={130} width={125} id={1} data={{ "Object": "Red Tomato", "Volume": "65ml" }} />
      <LabelBox X={190} Y={230} height={120} width={125} id={2} data={{ "Object": "Red Tomato", "Volume": "55ml" }} />
      <LabelBox X={85} Y={75} height={60} width={70} id={3} data={{ "Object": "Leaf", "Length": "2.4cm" }} />
      <LabelBox X={180} Y={105} height={70} width={40} id={1} data={{ "Object": "Leaf", "Length": "2.2cm" }} />
    </div>
  );
}

export default ResultPage;
