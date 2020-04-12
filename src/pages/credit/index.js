import React, { Component } from 'react';
import './index.scss';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { Button } from "@material-ui/core";

import img_logo from 'assets/logo.png';


class Credit extends Component {
    constructor(props) {
        super(props);
        this.history = props.history;
        this.state = {
            credits: []
        }
        this.getCreditList();
    }

    componentDidMount() {
        
    }

    getFetchAsync = async (url) => {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }

    getCreditList = async () => {
        const credits_url = "http://api.tvmaze.com/people/1/castcredits";
        const credits = await this.getFetchAsync(credits_url);

        for (const credit of credits) {
            const credit_url = credit["_links"]["character"]["href"];
            const credit_info = await this.getFetchAsync(credit_url);

            this.props.handleAddCreditName(credit_info["name"]);
        }
    }

    goHomePage = () => {
        this.history.push("/");
    }

    render() {
        let credit_list = [];
        for (const credit_name of this.props.credits) {
            credit_list.push(
                <div className="credit-item">
                    {credit_name}
                </div>
            );
        }

        return (
            <div className="container credit-container">
                <img className="logo" src={img_logo} alt="logo"></img>
                <div className="title">Credit</div>
                <div className="credit-list">
                    <div className="credit-list-container">
                        {credit_list}
                    </div>
                </div>
                <Button onClick={this.goHomePage}>Back</Button>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        credits: state.credits.list,
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        handleAddCreditName: (credit_name) => { dispatch(actions.addCreditName(credit_name)) }
    };
};

export default connect(mapStateToProps, mapDispatchProps)(Credit);