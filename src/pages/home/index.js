import React from "react";
import { Button } from "@material-ui/core";

import { NewGameDlg, AlertDlg } from "../../components";

import "./index.scss";
import LogoImage from "assets/images/logo.svg";
import LogoutImage from "assets/images/logout-icon.svg";

function goExitPage() {
  window.location.href = "https://github.com/seedboxtech/frontend-dev-test";
}

class Home extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { showNewGameDlg: false, showAlertDlg: false };
    this.history = props.history;
  }

  showNewGameDlg = () => {
    this.setState({ ...this.state, showNewGameDlg: true });
  };

  goCreditPage = () => {
    this.history.push("/credit");
  };

  goGamePage = (is_passed) => {
    if (!is_passed) {
      this.setState({ ...this.state, showNewGameDlg: false });
      this.setState({ ...this.state, showAlertDlg: true });
    } else {
      this.history.push("/game");
    }
  };

  closeAlertDlg = () => {
    this.setState({ ...this.state, showAlertDlg: false });
    this.setState({ ...this.state, showNewGameDlg: true });
  };

  render() {
    return (
      <div className="container home-container">
        <header>
          <img className="logo" src={LogoImage} alt="logo"></img>
        </header>
        <section className="button-group">
          <Button onClick={this.showNewGameDlg}>New Game</Button>
          <Button onClick={this.goCreditPage}>Credit</Button>
          <Button onClick={goExitPage}>
            <span style={{ marginRight: "10px" }}>Exit</span>
            <img src={LogoutImage} alt="logout"></img>
          </Button>
          <NewGameDlg
            open={this.state.showNewGameDlg}
            onStart={this.goGamePage}
          />
          <AlertDlg
            open={this.state.showAlertDlg}
            content="Please fill all the Players Name."
            onClose={() => {
              this.setState({ ...this.state, showAlertDlg: false });
            }}
          />
        </section>
      </div>
    );
  }
}

export default Home;