import React, { Fragment, Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.responseInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    componentWillUnmount() {
        axios.interceptors.request.eject(this.requestInterceptor);
        axios.interceptors.request.eject(this.responseInterceptor);
    }

    render() {
      return (
        <Fragment>
          <Modal show={this.state.error} clicked={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
