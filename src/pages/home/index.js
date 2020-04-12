import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import img_logo from 'assets/logo.png';
import img_logout from 'assets/images/noun_logout.png';
import './index.scss';
import {
    NewGameDlg,
    AlertDlg
} from "../../components";

class Home extends Component {
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

    goExitPage = () => {
        // this.history.push("/exit");
        window.location.href = "https://github.com/seedboxtech/frontend-dev-test";
    };

    goGamePage = (is_passed) => {
        if (!is_passed) {
            this.setState({ ...this.state, showNewGameDlg: false });
            this.setState({ ...this.state, showAlertDlg: true });
        }else {
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
                <img className="logo" src={img_logo}></img>
                <div className="button-group">
                    <Button onClick={this.showNewGameDlg}>New Game</Button>
                    <Button onClick={this.goCreditPage}>Credit</Button>
                    <Button onClick={this.goExitPage}>Exit <img src={img_logout}></img></Button>
                </div>

                <NewGameDlg
                    open={this.state.showNewGameDlg}
                    onStart={this.goGamePage}
                />
                <AlertDlg
                    open={this.state.showAlertDlg}
                    content="Please fill all the Players Name."
                    onClose={() => { this.setState({ ...this.state, showAlertDlg: false }) }}
                />
            </div>
        );
    }
};

export default Home;