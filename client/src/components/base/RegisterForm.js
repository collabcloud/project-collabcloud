import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactTags from "react-tag-autocomplete";

import "../../css/RegisterForm.css";

import { register } from "../../actions/registerActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const RegisterForm = withRouter(
  ({ register, registered, githubExists, attempted, wrongUser, history }) => {
    const tech_suggestions = [
      { id: 1, name: "MongoDB" },
      { id: 2, name: "Express" },
      { id: 3, name: "React" },
      { id: 4, name: "Node.js" },
      { id: 5, name: "Python" },
      { id: 6, name: "JavaScript" },
      { id: 7, name: "Java" },
      { id: 8, name: "C++" },
      { id: 9, name: "C#" },
      { id: 10, name: "HTML/CSS" },
      { id: 11, name: "Swift" },
      { id: 12, name: "SQL" },
      { id: 13, name: "MongoDB" },
      { id: 14, name: "Express" },
      { id: 15, name: "React" },
      { id: 16, name: "Angular" },
      { id: 17, name: "VueJS" },
      { id: 18, name: "Flutter" },
      { id: 19, name: "Kubernetes" },
      { id: 20, name: "Jupyter" },
      { id: 21, name: "Pytorch" },
      { id: 22, name: "Numpy" },
      { id: 23, name: "Passport" },
      { id: 24, name: "Kotlin" }
    ];

    const [tech, setTech] = useState([]);

    const [errors, setErrors] = useState([]);
    useEffect(() => {
      console.log(wrongUser);
      if (githubExists) {
        history.push({
          pathname: "/login",
          state: { type: "warning", message: "Account Exists. Please Login" }
        });
      } else if (registered) {
        history.push({
          pathname: "/login",
          state: { type: "success", message: "Welcome to Collab Cloud" }
        });
      } else if (wrongUser) {
        setErrors([
          ...errors,
          "Username must match Github username",
          "",
          "Authorizing with Github in 2 seconds"
        ]);
        setTimeout(function() {
          window.location.assign(
            "https://github.com/login/oauth/authorize?client_id=08f4f6db13802f8cd769&scope=repo"
          );
        }, 2000);
      } else if (attempted) {
        window.location.assign(
          "https://github.com/login/oauth/authorize?client_id=08f4f6db13802f8cd769&scope=repo"
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
            The form data that will be submitted.
            Simply add more entries on the object to add more
            entries in the form submission
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
      const technologies = [].concat(tech, tag);
      setTech(technologies);
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
          <label>Interested Languages/Tech</label>
          <ReactTags
            className="item"
            tags={tech}
            suggestions={tech_suggestions}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
          />
          <Form.Group controlId="formBasicCheckbox">
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
            Submit
          </Button>
        </Form>
        <div>
          <img
            alt=""
            src={require("../../logo.png")}
            width="70"
            height="35"
            style={{ marginTop: 40, marginBottom: 20 }}
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
