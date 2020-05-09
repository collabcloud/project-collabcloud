import React, { useState, useEffect } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { Form, Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import ReactTags from "react-tag-autocomplete";

import "../../../css/RegisterForm.css";
import tech_suggestions_array from "../../../utils/techSuggestions";

import { register } from "../../../actions/registerActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
const tech_suggestions = tech_suggestions_array;

// This component is used in RegisterPage2.js
const RegisterForm = withRouter(
  ({ register, registered, githubExists, attempted, wrongUser, history }) => {

    const [tech, setTech] = useState([]);
    const [errors, setErrors] = useState([]);

    // Runs whenever any of the variables in the dependency array (second parameter) changes
    useEffect(() => {
      if (githubExists) {
        history.push({
          pathname: "/login",
          state: { type: "warning", message: "Account Exists. Please Login" }
        });
      } else if (registered) {
        history.push({
          pathname: "/login",
          state: { type: "success", message: "Welcome to CollabCloud" }
        });
      } else if (wrongUser) {
        // TODO: Fix bug here, error message appears multiple times (it should only appear once)
        setErrors([
          ...errors,
          "Username must match Github username",
          "",
          "Authorizing with Github in 2 seconds"
        ]);
        // TODO: Get these values from an env file
        setTimeout(function() {
          window.location.assign(
            "https://github.com/login/oauth/authorize?client_id=6f0b64a238f52e8c9523&scope=repo"
          );
        }, 2000);
      } else if (attempted) {
        window.location.assign(
          "https://github.com/login/oauth/authorize?client_id=6f0b64a238f52e8c9523&scope=repo"
        );
      }
    }, [
      register,
      registered,
      githubExists,
      attempted,
      wrongUser,
      history,
      errors
    ]);

    /*
     * The form data that will be submitted. 
     * Simply add more entries on the object to 
     * add more entries in the form submission
     */
    const [formData, setFormData] = useState({
      username: "",
      password: "",
      confirmpassword: "",
      email: ""
    });

    /**
     * Modify the formData when something has been changed
     *
     */
    function handleAddition(tag) {
      if (tech.some(tech_tag => tech_tag.id !== tag.id) || tech.length === 0) {
        const technologies = [].concat(tech, tag);
        setTech(technologies);
      }
    }

    function handleDelete(i) {
      const technologies = tech.slice(0);
      technologies.splice(i, 1);
      setTech(technologies);
    }

    const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /**
     * Submit the form through redux to the server
     *
     * */
    //TODO: Redirect to /login if loggedIn is true
    async function onSubmit(e) {
      e.preventDefault();
      if (!e.currentTarget.terms.checked) {
        setErrors([...errors, "Please accept the Terms and Conditions"]);
        return;
      } else {
        setErrors([]);
      }
      formData["technologies"] = tech;
      console.log(JSON.stringify(formData));
      githubAuth(register, formData);
    }

    return (
      <div>
        <Form onSubmit={onSubmit} className="register-form">
          <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">This needs to be the same as your GitHub username</Tooltip>}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label className="float-left">Username</Form.Label>
              <Form.Control
                required
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={onChange}
                />
              <Form.Control.Feedback type="invalid">
                Please enter a username
              </Form.Control.Feedback>
            </Form.Group>
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Your password must be at least 8 characters long. All passwords are hashed. Your password hashes will never be shared with anyone.</Tooltip>}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="float-left">Password</Form.Label>
              <Form.Control
                required
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your password
              </Form.Control.Feedback>
            </Form.Group>
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Enter the same password as above</Tooltip>}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="float-left">Confirm Password</Form.Label>
              <Form.Control
                required
                name="confirmpassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmpassword}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter password confirmation
              </Form.Control.Feedback>
            </Form.Group>
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Your email will be used to reset your password in case you forget. Your email will never be shared with anyone.</Tooltip>}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="float-left">Email</Form.Label>
              <Form.Control
                required
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter Email{" "}
              </Form.Control.Feedback>
            </Form.Group>
          </OverlayTrigger>

          <p id="interested-languages-label">Interested Languages/Tech</p>
          <ReactTags
            className="item"
            id="language-tag-input"
            tags={tech}
            suggestions={tech_suggestions}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
          />

          <Form.Group controlId="formBasicCheckbox" id="tos-checkbox">
            <Form.Check type="checkbox" name="terms" className="float-left" />
            <label htmlFor="terms">
              I agree to the <a href="register2">Terms of service </a>
            </label>
          </Form.Group>
        
          <ul
            style={{ listStyleType: "none", margin: "auto", padding: 0 }}
            className="errors"
          >
            {errors.map((value, index) => {
              return <li key={index}>{value}</li>;
            })}
          </ul>

          <Button variant="outline-primary" type="submit" block>
            Complete Registration
          </Button>
        </Form>
        <div>
          <img
            alt="CollabCloud-logo"
            src={require("../../../logo.png")}
            width="70"
            height="35"
            style={{ marginTop: 20, marginBottom: 20 }}
          />
        </div>
      </div>
    );
  }
);

/**
 * This function retrieves the code that github puts on the URL
 * and makes a fetch to the express endpoint /api/users/register/github
 * ?code=something
 */
async function githubAuth(register, formData) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  const get_code = code => {
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === code) {
        return pair[1];
      }
    }
  };
  const code = get_code("code");
  if (code) {
    register(code, formData);
  }
}
/**
 *
 * Standard function that maps Redux state to the Props of Register2
 */
function mapStateToProps(state) {
  return {
    registered: state.register.registered,
    githubExists: state.register.githubExists,
    attempted: state.register.attempted,
    wrongUser: state.register.wrongUser
  };
}

/**
 *
 * Standard function that maps Redux action dispatches to the Props of Register2
 */
function mapDispatchToProps(dispatch) {
  return {
    register: (auth_code, formData) => {
      dispatch(register(auth_code, formData));
    }
  };
}

/**
 * Standard connect call
 */
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
