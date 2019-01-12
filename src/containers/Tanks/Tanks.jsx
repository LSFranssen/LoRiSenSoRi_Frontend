import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Tanks.css";
import Button from "../../components/Common/Button/Button";
import axios from "../../axios-users";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Tank from "./Tank/Tank";
import Spinner from "../../components/Common/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import Search from "../../components/Common/Search/Search";

class Tanks extends Component {

  componentDidMount() {
    this.props.onFetchTanks(this.props.token);
  }

  overviewHandler = tankId => {
    this.props.history.push({pathname: this.props.match.url + "/overview/" + tankId
    });
  };

  addingTankHandler = () => {
    this.props.history.push({ pathname: this.props.match.url + "/add-tank" });
  };

  // editTankHandler = (id) => {
  //   this.props.history.push({pathname: this.props.match.url + "/edit-tank/" + id});
  // }

  editTankHandler = id => {
    axios
      .get("tanks/" + id + ".json")
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  removeTankHandler = tankId => {
    this.props.onDeleteTanks(tankId);
    console.log("Removed: ")
    console.log(tankId);
  //   axios
  //     .delete("tanks/" + id + ".json")
  //     .then(response => {
  //       console.log(response);
  //       this.setState({ loading: false });
  //     })
  //     .catch(error => {
  //       this.setState({ loading: false });
  //     });
  };

  render() {
    let tanks = <Spinner />;
    if (!this.props.loading) {
      tanks = this.props.tanks.map(tank => {
        return (
          <Tank
            key={tank.tankId}
            tankId={tank.tankId}
            tanknaam={tank.tanknaam}
            status={tank.status}
            overview={() => this.overviewHandler(tank.tankId)}
            editTank={() => this.editTankHandler(tank.tankId)}
            removeTank={() => this.removeTankHandler(tank.tankId)}
          />
        );
      });
    }

    return (
      <div className={classes.Tanks}>
        <h3>Tanks</h3>
        <div className={classes.Div}>
          <Button clicked={this.addingTankHandler} name="Toevoegen">
            Toevoegen
          </Button>
          <Search />
        </div>
        {tanks}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tanks: state.tanks.tanks,
    loading: state.tanks.loading,
    token: state.auth.token,
    tankId: state.tanks.tankId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTanks: (token) => dispatch(actions.fetchTanks(token)),
    onDeleteTanks: (tankId) => dispatch(actions.deleteTank(tankId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Tanks, axios));
