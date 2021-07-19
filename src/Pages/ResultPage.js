import { useHistory } from "react-router-dom";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';

function ResultPage() {
    const history = useHistory();

    const returnHome = () => {
        history.push("/home");
    }

    return (
        <div className="ResultPage">
            <AppBar position="static">
                <Toolbar>
                    <IconButton aria-label="Return to Home" onClick={returnHome} variant="contained"><HomeIcon /></IconButton>
                    <h3>&nbsp;&nbsp;&nbsp;Result</h3>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default ResultPage;
