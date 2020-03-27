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



const UserAccountDetails = ({title,uid,username,firstname,lastname,city,province,description,update_user_info}) => {
  const [name, setName] = useState(firstname);
  const [last_name, setlastName] = useState(lastname);
  const [email, setEmail] = useState("w/e@gmail.com");
  const [cityfield, setCity] = useState(city);
  const [descriptionfield, setDesc] = useState(description);
  const [provincefield, setProvince] = useState(province);

  const onSubmit = (e) => {
    e.preventDefault();
    submitUserProfile(update_user_info, uid,username,name,last_name, cityfield, provincefield, descriptionfield);        
}


  
  return(
  <Card style={{height: '30rem',backgroundColor: '#343a40'}}>
    <CardHeader style={{color: 'white'}}>
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <ListGroup small>
      <ListGroupItem className="p-1">
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
                    disabled={true}
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
                <Col md="6" className="form-group">
                  <label htmlFor="feInputState">Province</label>
                  <FormSelect id="feInputState" onChange={e => {setProvince(e.target.value)}}>
                    <option>Choose...</option>
                    <option value="AB">Alberta</option>
                    <option value="BC">British Columbia</option>
                    <option value="MB">Manitoba</option>
                    <option value="NB">New Brunswick</option>
                    <option value="NL">Newfoundland and Labrador</option>
                    <option value="NS">Nova Scotia</option>
                    <option value="ON">Ontario</option>
                    <option value="PE">Prince Edward Island</option>
                    <option value="QC">Quebec</option>
                    <option value="SK">Saskatchewan</option>
                    <option value="NT">Northwest Territories</option>
                    <option value="NU">Nunavut</option>
                    <option value="YT">Yukon</option>
                  </FormSelect>
                </Col>
              </Row>
              <Row form>
                {/* Description */}
                <Col md="12" className="form-group">
                  {/* <label htmlFor="feDescription">Description</label> */}
                  <FormTextarea id="feDescription" rows="3" value={descriptionfield} onChange={e => {setDesc(e.target.value)}}/>
                </Col>
              </Row>
              <Button type="submit">Update Profile</Button>
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

async function submitUserProfile(update_user_info,uid,username,name,last_name,city_field, province,description){
  await update_user_info({uid,username,name, last_name, city_field, province,description});
}


UserAccountDetails.propTypes = {
	update_user_info: PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
  return {
    uid: state.login.profile.uid,
    username: state.login.profile.username,
    firstname: state.login.profile.firstname,
    lastname: state.login.profile.lastname,
    city: state.login.profile.city,
    province: state.login.profile.province,
    description: state.login.profile.description
  }
}





export default connect(mapStateToProps, {update_user_info})(UserAccountDetails);
