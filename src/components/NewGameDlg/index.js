import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";

import * as actions from "../../store/actions";
import "./index.scss";
import OIcon from "assets/images/o-icon-small.svg";
import XIcon from "assets/images/x-icon-small.svg";

class NewGameDlg extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      player1name: props.player1name,
      player2name: props.player2name,
    };
  }

  onChangePlayer1 = (e) => {
    this.setState({ ...this.state, player1name: e.target.value });
  };
  onChangePlayer2 = (e) => {
    this.setState({ ...this.state, player2name: e.target.value });
  };

  onClickStart = () => {
    this.props.handleSetPlayerName(
      this.state.player1name,
      this.state.player2name
    );
    this.props.onStart(
      !(this.state.player1name === "" || this.state.player2name === "")
    );
  };

  render() {
    const { open } = this.props;

    const player1_icon = this.props.player_icon === "X" ? XIcon : OIcon;
    const player1_alt = this.props.player_icon === "X" ? "XIcon" : "OIcon";
    const player2_icon = this.props.player_icon === "X" ? OIcon : XIcon;
    const player2_alt = this.props.player_icon === "X" ? "OIcon" : "XIcon";

    return (
      <Dialog
        open={open}
        PaperProps={{
          style: {
            width: "430px",
            boxShadow: "0 3px 21px rgba(1, 1, 1, 0.43)",
            borderRadius: "3px",
            border: "2px solid #474747",
            backgroundColor: "#383838",
          },
        }}
      >
        <div className="new-game-dlg-container">
          <DialogTitle>
            <div className="dialog-title">Start a New Game</div>
          </DialogTitle>
          <DialogContent>
            <div className="input-group">
              <label>
                <img
                  className="player-icon"
                  src={player1_icon}
                  alt={player1_alt}
                ></img>{" "}
                Player 1
              </label>
              <input
                type="text"
                value={this.state.player1name}
                onChange={this.onChangePlayer1}
              />
            </div>
            <div className="input-group">
              <label>
                <img
                  className="player-icon"
                  src={player2_icon}
                  alt={player2_alt}
                ></img>{" "}
                Player 2
              </label>
              <input
                type="text"
                value={this.state.player2name}
                onChange={this.onChangePlayer2}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <div className="button-group">
              <Button onClick={this.onClickStart} color="primary">
                Start!
              </Button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    player_icon: state.players.player_icon,
    player1name: state.players.player1name,
    player2name: state.players.player2name,
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    handleSetPlayerName: (player1, player2) => {
      dispatch(actions.setPlayerName(player1, player2));
    },
  };
};

export default connect(mapStateToProps, mapDispatchProps)(NewGameDlg);