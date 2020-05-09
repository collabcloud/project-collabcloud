import React from "react";
import RegisterForm from "../../../components/specialized/Account/RegisterForm";
import Card from "react-bootstrap/Card";
import "../../../css/LoginForm.css";

// After the user enters their username and password on GitHub, GitHub redirects the user to this page
const Register2 = props => {
  return (
    <div>
      <Card
        bg="light"
        className="login-form"
        style={{ width: "30rem", marginTop: 50 }}
      >
        <h1 className="header" style={{ marginTop: 20 }}>
          Register
        </h1>
        <p> Almost done! Complete your registration by filling in the information below </p>
        <RegisterForm />
      </Card>
    </div>
  );
};

export default Register2;