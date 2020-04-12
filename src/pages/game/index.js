import React, { Component } from 'react';
import './index.scss';

import { connect } from 'react-redux';

import {
    WinGameDlg,
    EndGameDlg
} from "../../components";

import img_logo from 'assets/images/logo_small.png';
import o_icon from 'assets/images/o-icon.png';
import x_icon from 'assets/images/x-icon.png';
import o_mark from 'assets/images/o-mark.png';
import x_mark from 'assets/images/x-mark.png';




function Square(props) {
    return (
        <div className="sqaure" onClick={props.onClick}>
            {props.value && <img className="" src={(props.value === "X") ? x_mark : o_mark}></img>}
        </div>
    );
}

class Board extends Component {
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
    const winClass = (props.win_cnt === props.value) ? "select" : "";
    const classStr = "row_win " + winClass;
    return (
        <div className={classStr}>
            <div className="win_bar"></div>
        </div>
    );
}

function SuccessColumnSquare(props) {
    const winClass = (props.win_cnt === props.value) ? "select" : "";
    const classStr = "column_win " + winClass;
    return (
        <div className={classStr}>
            <div className="win_bar"></div>
        </div>
    );
}

class SucessBoard extends Component {

    renderSRSquare(i) {
        return (
            <SuccessRowSquare
                value={i}
                win_cnt={this.props.cnt}
            />
        );
    }
    renderSCSquare(i) {
        return (
            <SuccessColumnSquare
                value={i}
                win_cnt={this.props.cnt}
            />
        );
    }

    render() {
        const winClass = (this.props.cnt !== null) ? "select" : "";
        const classStr = "success-overlay " + winClass;
        let slashCls = (this.props.cnt === 6) ? "dash" : ((this.props.cnt === 7) ? "slash" : "");
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

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showWinGameDlg: false,
            xIsStart: true,
            isStarted: false,
            winnerName: "",
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true
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
                    squares: squares
                }
            ]),
            isStarted: true,
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            ...this.state,
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    goHomePage = () => {
        this.history.push("/");
    }

    reStartGame = () => {
        this.jumpTo(0);
        setTimeout(() => {
            this.win_timer = null;
            this.setState({ ...this.state, showWinGameDlg: false, isStarted: false });
        }, 500);
    }

    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { player: squares[a], cnt: i };
            }
        }
        return null;
    };

    setPlayer1First = () => {
        if (this.state.isStarted)
            return;

        this.setState({ ...this.state, xIsNext: true, xIsStart: true });
    }
    setPlayer2First = () => {
        if (this.state.isStarted)
            return;

        this.setState({ ...this.state, xIsNext: false, xIsStart: false });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);
        let winnerName = null;
        let isFull = false;
        if (winner) {
            if (this.state.xIsStart) {
                winnerName = (winner.player === 'X') ? this.props.player1name : this.props.player2name;
            } else {
                winnerName = (winner.player === 'X') ? this.props.player2name : this.props.player1name;
            }
            if (this.win_timer === null) {
                this.setState({ ...this.state, winnerName: winnerName });
                this.win_timer = setTimeout(() => {
                    this.setState({ ...this.state, showWinGameDlg: true, winnerName: winnerName });
                }, 2000);
            }
        } else if(this.state.showWinGameDlg === false && current.squares.length === 9 ) {
            isFull = true
            for (const square of current.squares){
                if (square === null){
                    isFull = false;
                    break;
                }
            }
        }

        const player1_sel = (this.state.xIsNext) ? "select" : "";
        const player2_sel = (!this.state.xIsNext) ? "select" : "";

        return (
            <div className="container game-container">
                <WinGameDlg
                    open={winnerName !== null && this.state.showWinGameDlg}
                    onStart={this.reStartGame}
                    onQuit={this.goHomePage}
                    name={winnerName}
                />
                <EndGameDlg
                    open={isFull}
                    onStart={this.reStartGame}
                    onQuit={this.goHomePage}
                />
                <div className="header">
                    <img src={img_logo}></img>
                    <div className="users-info">
                        <div className={"input-group " + player1_sel} onClick={this.setPlayer1First}>
                            <div className="label"><img className="" src={x_icon}></img> Player 1</div>
                            <div className="player-name">{this.props.player1name}</div>
                        </div>
                        <div className={"input-group " + player2_sel} onClick={this.setPlayer2First}>
                            <div className="label"><img className="" src={o_icon}></img> Player 2</div>
                            <div className="player-name">{this.props.player2name}</div>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <div className="info">{(!this.state.isStarted) ? "You can select the First Player by Player's name." : ""}</div>
                    <div className="board">
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
                        <Board
                            squares={current.squares}
                            onClick={i => this.handleClick(i)}
                        />
                        <SucessBoard
                            cnt={winner && winner.cnt}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        player1name: state.players.player1name,
        player2name: state.players.player2name
    };
};

export default connect(mapStateToProps)(Game);