import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";

import "./index.scss";
import VictoryIcon from "assets/images/victory-icon.svg";

export const EndGameDlg = (props) => {
  const { type, open, onStart, onQuit, name } = props;
  let content = "";

  if (type === "win") {
    if (name === "" || name === null) {
      return <div></div>;
    }
    content = "Victory to " + name + "!";
  } else {
    content = "Draw!";
  }

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
      <div className="win-game-dlg-container">
        <DialogTitle>
          <div className="dialog-title">{content}</div>
        </DialogTitle>
        <DialogContent>
          <div className="content-group">
            <img className="" src={VictoryIcon} alt="victory_icon"></img>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="button-group">
            <Button onClick={onStart} color="primary">
              Restart
            </Button>
            <Button onClick={onQuit} color="primary">
              Quit
            </Button>
          </div>
        </DialogActions>
      </div>
    </Dialog>
  );
};
