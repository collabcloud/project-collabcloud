import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logout } from '../../../actions/loginActions'
import { useHistory } from "react-router-dom";

const Logout = (props) => {
    const history = useHistory();
    useEffect(() => {
        props.logout();
        history.push("/login");
    }, [])

    return (
        <div> 
            <p>logging you out...</p>           
        </div>
)};
  
function mapDispatchToProps(dispatch){
    return {
        logout: () => {
            dispatch(logout());
        }
    };
}
  
export default connect(null, mapDispatchToProps)(Logout);