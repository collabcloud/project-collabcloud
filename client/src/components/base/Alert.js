import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import '../../css/Alerts.css';

const AlertView = ({ alerts }) => {
  const [state, setState] = useState("");  
  useEffect(
    function(){
      setState("");
    }
  ,[alerts])
  return (
    <div className="alerts-body">
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map(alert => (
          <div key={alert.id} className={`collab-alerts ${alert.alertType}`}>
            <p className="alerts-text">{alert.msg}</p>
          </div>
        ))}
    </div>
  );
};

AlertView.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(AlertView);
