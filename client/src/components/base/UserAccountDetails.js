import React, {useState} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {update_user_info} from "../../actions/userActions";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";



const UserAccountDetails = ({title,uid,firstname,lastname,city,province,description,update_user_info}) => {
  //in the future the hooks will be info queried from DB
  const [name, setName] = useState("Jarrod");
  const [last_name, setlastName] = useState("lastname");
  const [email, setEmail] = useState("w/e@gmail.com");
  const [cityfield, setCity] = useState("city");

  const onSubmit = (e) => {
    e.preventDefault();
    // //console.log(login)
  
    // //how to do checks?
 

    submitUserProfile(update_user_info, uid,name,last_name, cityfield, "Ontario", "");        
}

  
  return(
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form onSubmit={onSubmit}>
              <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">First Name</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="First Name"
                    value={name}
                    onChange={e => {setName(e.target.value)}}
                  />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Last Name</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Last Name"
                    value={last_name}
                    onChange={e => {setlastName(e.target.value)}}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    placeholder="Email Address"
                    value={email}
                    onChange={e => {setEmail(e.target.value)}}
                    autoComplete="email"
                  />
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="fePassword">Password</label>
                  <FormInput
                    type="password"
                    id="fePassword"
                    placeholder="Password"
                    value="password"
                    autoComplete="current-password"
                  />
                </Col>
              </Row>
              
              <Row form>
                {/* City */}
                <Col md="6" className="form-group">
                  <label htmlFor="feCity">City</label>
                  <FormInput
                    id="feCity"
                    placeholder="City"
                    value = {cityfield}
                    onChange={e => {setCity(e.target.value)}}
                  />
                </Col>
                {/* State */}
                <Col md="4" className="form-group">
                  <label htmlFor="feInputState">State</label>
                  <FormSelect id="feInputState">
                    <option>Choose...</option>
                    <option>...</option>
                  </FormSelect>
                </Col>
                {/* Zip Code */}
                <Col md="2" className="form-group">
                  <label htmlFor="feZipCode">Zip</label>
                  <FormInput
                    id="feZipCode"
                    placeholder="Zip"
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Description */}
                <Col md="12" className="form-group">
                  <label htmlFor="feDescription">Description</label>
                  <FormTextarea id="feDescription" rows="3" />
                </Col>
              </Row>
              <Button type="submit">Update Account</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
)};

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};

async function submitUserProfile(update_user_info,uid,name,last_name,city_field, province,description){
  //console.log(username);
  //console.log(password);
  console.log("send to update user info action");
  console.log(name);
  await update_user_info({uid,name, last_name, city_field, province,description});
}


UserAccountDetails.propTypes = {
	update_user_info: PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
  return {
    uid: state.userinfo.profile.uid,
    firstname: state.userinfo.profile.firstname,
    lastname: state.userinfo.profile.lastname,
    city: state.userinfo.profile.city,
    province: state.userinfo.profile.province,
    description: state.userinfo.profile.description
  }
}





export default connect(mapStateToProps, {update_user_info})(UserAccountDetails);
