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
    this.props.onFetchTanks();
  }

  overviewHandler = id => {
    this.props.history.push({pathname: this.props.match.url + "/overview/" + id
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

  removeTankHandler = id => {
    this.props.onDeleteTanks(id);
    console.log(id);
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
            key={tank.id}
            id={tank.id}
            tanknaam={tank.tankData.tanknaam}
            status={tank.tankData.status}
            overview={() => this.overviewHandler(tank.id)}
            editTank={() => this.editTankHandler(tank.id)}
            removeTank={() => this.removeTankHandler(tank.id)}
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
    loading: state.tanks.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTanks: () => dispatch(actions.fetchTanks()),
    onDeleteTanks: (id) => dispatch(actions.deleteTank(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Tanks, axios));
