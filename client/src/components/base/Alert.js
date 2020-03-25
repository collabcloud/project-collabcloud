import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import '../../css/Alerts.css';

// TODO: Fix CSS for alerts 

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
            <div>{alert.msg}</div>
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
