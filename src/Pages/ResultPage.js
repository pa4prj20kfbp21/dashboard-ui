import { useHistory, useLocation } from "react-router-dom";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

/*
    Required props:
    dateTaken: preferrably in epoch timestamp.

    Required states:
    Medium: image(s) or point cloud if possible. <-- not confirmed.
    ObjectInfo: Meta information needed for LabelBox.

    LabelBox component will be used to show plant information below AppBar.
*/
function ResultPage() {
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
    </div>
  );
}

export default ResultPage;
