import React, { Component } from "react";

import Modal from "../../components/Common/Modal/Modal";
import classes from "./withErrorHandler.css";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    componentWillMount() {
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
    }

    clearError = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal className={classes.Modal} show={this.state.error} 
          modalClosed={this.clearError}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
