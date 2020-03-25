import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  login: {loggedIn},
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (!localStorage.token) {
        return <Redirect to="/login" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

PrivateRoute.propTypes = {
  login: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  login: state.login
});

export default connect(mapStateToProps)(PrivateRoute);
