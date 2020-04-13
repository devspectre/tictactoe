import React from "react";
import { connect } from "react-redux";

import { EndGameDlg } from "../../components";
import * as actions from "../../store/actions";

import "./index.scss";
import logo from "assets/images/logo-small.svg";
import OIcon from "assets/images/o-icon-small.svg";
import XIcon from "assets/images/x-icon-small.svg";
import OMark from "assets/images/o-icon.svg";
import XMark from "assets/images/x-icon.svg";

function Square(props) {
  return (
    <div className="sqaure" onClick={props.onClick}>
      {props.value && (
        <img
          className=""
          src={props.value === "X" ? XMark : OMark}
          alt="stone"
        ></img>
      )}
    </div>
  );
}

class Board extends React.PureComponent {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="play_ground">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
      </div>
    );
  }
}

function SuccessRowSquare(props) {
  const winClass = props.win_cnt === props.value ? "select" : "";
  const classStr = "row_win " + winClass;
  return (
    <div className={classStr}>
      <div className="win_bar"></div>
    </div>
  );
}

function SuccessColumnSquare(props) {
  const winClass = props.win_cnt === props.value ? "select" : "";
  const classStr = "column_win " + winClass;
  return (
    <div className={classStr}>
      <div className="win_bar"></div>
    </div>
  );
}

function DrawBoard(props) {
  return (
    <div>
      <div className="board_row">
        <div className="row"></div>
        <div className="row"></div>
        <div className="row"></div>
      </div>
      <div className="board_column">
        <div className="column"></div>
        <div className="column"></div>
        <div className="column"></div>
      </div>
    </div>
  );
}

class SucessBoard extends React.PureComponent {
  renderSRSquare(i) {
    return <SuccessRowSquare value={i} win_cnt={this.props.cnt} />;
  }
  renderSCSquare(i) {
    return <SuccessColumnSquare value={i} win_cnt={this.props.cnt} />;
  }

  render() {
    const winClass = this.props.cnt !== null ? "select" : "";
    const classStr = "success-overlay " + winClass;
    let slashCls =
      this.props.cnt === 6 ? "dash" : this.props.cnt === 7 ? "slash" : "";
    slashCls = "board_diagonal " + slashCls;
    return (
      <div className={classStr}>
        <div className="board_row">
          {this.renderSRSquare(0)}
          {this.renderSRSquare(1)}
          {this.renderSRSquare(2)}
        </div>
        <div className="board_column">
          {this.renderSCSquare(3)}
          {this.renderSCSquare(4)}
          {this.renderSCSquare(5)}
        </div>
        <div className={slashCls}>
          <div className="win_rect">
            <div className="win_bar"></div>
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    const xIsStart = props.player_icon === "X" ? true : false;
    this.state = {
      endGameDlgType: "win",
      showEndGameDlg: false,
      isStarted: false,
      winnerName: "",
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsStart: xIsStart,
      xIsNext: xIsStart,
    };

    this.history = props.history;
    if (this.props.player1name === "" || this.props.player2name === "") {
      this.history.push("/");
    }
    this.win_timer = null;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = this.calculateWinner(squares);

    if (winner || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      ...this.state,
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      isStarted: true,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      ...this.state,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  goHomePage = () => {
    this.history.push("/");
  };

  restartGame = () => {
    this.jumpTo(0);
    setTimeout(() => {
      this.win_timer = null;
      this.setState({ ...this.state, showEndGameDlg: false, isStarted: false });
    }, 500);
  };

  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { player: squares[a], cnt: i };
      }
    }
    return null;
  };

  setPlayer1First = () => {
    if (this.state.isStarted) return;
    const xIsStart = this.props.player_icon === "X" ? true : false;

    this.setState({ ...this.state, xIsNext: xIsStart, xIsStart: xIsStart });
  };
  setPlayer2First = () => {
    if (this.state.isStarted) return;
    const xIsStart = this.props.player_icon === "X" ? false : true;

    this.setState({ ...this.state, xIsNext: xIsStart, xIsStart: xIsStart });
  };

  changePlayerIcon = () => {
    if (this.state.isStarted) return;
    this.setState({
      ...this.state,
      xIsNext: !this.state.xIsNext,
      xIsStart: !this.state.xIsStart,
    });
    this.props.handleSetPlayerIcon();
  };
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    let winnerName = null;
    let isFull = false;
    if (winner) {
      winnerName = this.props.player2name;
      if (winner.player === this.props.player_icon) {
        winnerName = this.props.player1name;
      }

      if (this.win_timer === null) {
        this.win_timer = setTimeout(() => {
          this.setState({ ...this.state, winnerName: winnerName });
          this.setState({
            ...this.state,
            showEndGameDlg: true,
            endGameDlgType: "win",
            winnerName: winnerName,
          });
        }, 2000);
      }
    } else if (
      this.state.showEndGameDlg === false &&
      current.squares.length === 9
    ) {
      isFull = true;
      for (const square of current.squares) {
        if (square === null) {
          isFull = false;
          break;
        }
      }
      if (isFull) {
        this.setState({
          ...this.state,
          showEndGameDlg: true,
          endGameDlgType: "draw",
        });
      }
    }

    let player1_sel = "";
    let player2_sel = "select";
    if (
      (this.state.xIsNext && this.props.player_icon === "X") ||
      (!this.state.xIsNext && this.props.player_icon === "O")
    ) {
      player1_sel = "select";
      player2_sel = "";
    }

    const player1_icon = this.props.player_icon === "X" ? XIcon : OIcon;
    const player1_alt = this.props.player_icon === "X" ? "XIcon" : "OIcon";
    const player2_icon = this.props.player_icon === "X" ? OIcon : XIcon;
    const player2_alt = this.props.player_icon === "X" ? "OIcon" : "XIcon";

    return (
      <div className="container game-container">
        <EndGameDlg
          type={this.state.endGameDlgType}
          open={this.state.showEndGameDlg}
          onStart={this.restartGame}
          onQuit={this.goHomePage}
          name={winnerName}
        />
        <header className="header">
          <img src={logo} alt="logo"></img>
          <div className="users-info">
            <div className={"input-group " + player1_sel}>
              <div className="label" onClick={this.changePlayerIcon}>
                <img className="" src={player1_icon} alt={player1_alt}></img>{" "}
                Player 1
              </div>
              <div className="player-name" onClick={this.setPlayer1First}>
                {this.props.player1name}
              </div>
            </div>
            <div className={"input-group " + player2_sel}>
              <div className="label" onClick={this.changePlayerIcon}>
                <img className="" src={player2_icon} alt={player2_alt}></img>{" "}
                Player 2
              </div>
              <div className="player-name" onClick={this.setPlayer2First}>
                {this.props.player2name}
              </div>
            </div>
          </div>
        </header>
        <section className="body">
          <div className="info">
            {!this.state.isStarted
              ? "Click on player's name to switch first play and on icon to switch icon"
              : ""}
          </div>
          <div className="board">
            <DrawBoard />
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
            <SucessBoard cnt={winner && winner.cnt} />
          </div>
        </section>
      </div>
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
    handleSetPlayerIcon: () => {
      dispatch(actions.setPlayerIcon());
    },
  };
};
export default connect(mapStateToProps, mapDispatchProps)(Game);