import { AppBar, Toolbar } from "@material-ui/core"

function MainPage() {
  return (
    <div className="MainPage">
        <AppBar position="static">
            <Toolbar>
                <h3>Plant monitoring dashboard</h3>
            </Toolbar>
        </AppBar>
    </div>
  );
}

export default MainPage;
