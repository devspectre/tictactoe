import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";

import "./index.scss";

export const AlertDlg = (props) => {
  const { open, content, onClose } = props;

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
          <div className="dialog-title">Alert</div>
        </DialogTitle>
        <DialogContent>
          <div className="content-group">{content}</div>
        </DialogContent>
        <DialogActions>
          <div className="button-group">
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogActions>
      </div>
    </Dialog>
  );
};
