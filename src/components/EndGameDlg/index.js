import React from "react";
import './index.scss';

import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";

import victory_icon from 'assets/images/victory-icon.png';

export const EndGameDlg = props => {
    const { open, onStart, onQuit } = props;
    let content = "";

    content = "Draw!";

    if (!open) {
        return (<div></div>);
    }

    return (
        <Dialog open={open}
            PaperProps={{
                style: {
                    width: "430px",
                    boxShadow: "0 3px 21px rgba(1, 1, 1, 0.43)",
                    borderRadius: "3px",
                    border: "2px solid #474747",
                    backgroundColor: "#383838"
                },
            }}
        >
            <div className="win-game-dlg-container">
                <DialogTitle>
                    <div className="dialog-title">{content}</div>
                </DialogTitle>
                <DialogContent>
                    <div className="content-group">
                        <img className="" src={victory_icon}></img>
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
