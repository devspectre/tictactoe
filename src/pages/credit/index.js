import React from "react";
import { connect } from "react-redux";
import { Button, List } from "@material-ui/core";

import * as actions from "../../store/actions";
import "./index.scss";
import LogoImage from "assets/images/logo.svg";

class Credit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.history = props.history;
    this.state = {
      scrollTop: 0,
      credits: [],
    };

    this.props.handleInitCreditList();

    this.getCreditListForFiveTimes();
  }

  getCreditListForFiveTimes = async () => {
    await this.getCreditList();
    await this.getCreditList();
    await this.getCreditList();
    await this.getCreditList();
    await this.getCreditList();
  };

  getFetchAsync = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  };

  getCreditList = async () => {
    const credits_url = "https://api.tvmaze.com/people/1/castcredits";
    const credits = await this.getFetchAsync(credits_url);

    for (const credit of credits) {
      const credit_url = credit["_links"]["character"]["href"];

      // due to cors policy, it should be redirected to https
      const credit_info = await this.getFetchAsync(
        credit_url.replace("http", "https")
      );

      this.props.handleAddCreditName(credit_info["name"]);
    }
  };

  goHomePage = () => {
    this.history.push("/");
  };

  handleScroll(e) {
    let element = e.target;
    const scrollTop = element.scrollTop;
    document.getElementById("show_list").scrollTop = scrollTop;
  }

  render() {
    let credit_list = [];
    let key = 0;
    for (const credit_name of this.props.credits) {
      credit_list.push(
        <div className="credit-item" key={key++}>
          {credit_name}
        </div>
      );
    }

    return (
      <div className="container credit-container">
        <header>
          <img className="logo" src={LogoImage} alt="logo"></img>
          <h1 className="title">Credit</h1>
        </header>
        <section className="credit-list">
          <div className="list-show">
            <List id="show_list" className="credit-list-container">
              {credit_list}
            </List>
          </div>
          <div className="list-mask">
            <List
              className="credit-list-container"
              onScroll={this.handleScroll}
            >
              {credit_list}
            </List>
          </div>
        </section>
        <section className="button-group">
          <Button onClick={this.goHomePage}>Back</Button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    credits: state.credits.list,
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    handleAddCreditName: (credit_name) => {
      dispatch(actions.addCreditName(credit_name));
    },
    handleInitCreditList: () => {
      dispatch(actions.initCreditList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchProps)(Credit);