import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { submitDetails } from "../../actions/authActions";
import { logoutUser } from "../../actions/authActions";
import Styles from './Styles'
import {
  Typography,
  Paper,
  Grid,
  Button,
  FormLabel,
  RadioGroup,
  Radio,
  FormControl,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Input,
  AccordionSummary,
  AccordionDetails,
  Accordion
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
class Details extends Component {
  constructor() {
    super();
    this.state = {
        user: "5f62e7890698428788323b50",
        isMarried: false,
        isSpouseWorking: false,
        disabilityPresent: "none",
        kids: [
          {
            gender: "",
            age: ""
          }
        ],
        ageSpouse: "",
        age: "",
        gender: "",
        monthlyIncome: "",
        isHavingCarLoan:false,
        isHavingHomeLoan:false,
        isHavingOtherLoan:false,
        isHavingGeneralInsurance:false,
        isHavingHealthInsurance:false,
        isHavingTermInsurance:false,
        isHavingLifeInsurance:false,
        isHavingCar: false,
        isHavingCarInsurance:false,
        amountFixedDeposit:"",
        amountCashDeposit:"",
        amountSavingDeposit:"",
        isHavingPPF:false,
        isHavingEPF:false,
        isHavingNPS:false,
        amountPPF:"",
        isHavingMutualFund:false,
        isHavingBond:false,
        isHavingStock:false,
        errors: {},
        
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/login",this.props.history);
    }
  }
componentWillReceiveProps(nextProps) {
  if(nextProps.auth !== undefined){
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/login"); // push user to dashboard when they login
    }
  }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
   validate = values => {
    const errors = {};
    if (!values.user) {
      errors.user = 'Required';
    }
    if (!values.gender) {
      errors.gender = 'Required';
    }
    if (!values.age) {
      errors.age = 'Required';
    }
    if (!values.monthlyIncome) {
      errors.monthlyIncome = 'Required';
    }
    if (!values.gender) {
      errors.gender = 'Required';
    }
    return errors;
  };
  
  
  handleChange = (e) => {
    if (["gender", "age"].includes(e.target.className) ) {
      let kids = [...this.state.kids]
      kids[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({ kids }, () => console.log(this.state.kids))
    }
    else if(["checkbox"].includes(e.target.type)){
      this.setState({ [e.target.name]: e.target.checked})
    } else {
      this.setState({ [e.target.name]: e.target.value})
    }    
  }
addKids = (e) => {
    this.setState((prevState) => ({
      kids: [...prevState.kids, {gender:"", age:""}],
    }));
  }
onSubmit = e => {
  e.preventDefault();
  this.state.errors=this.validate(this.state)
  if(Object.keys(this.state.errors).length>0)
  {
    this.componentWillReceiveProps(this.state)
  }
  else{
    this.props.submitDetails(this.state, this.props.history);
  }
    
  };

render() {
    const { errors } = this.state;
    let kids = this.state.kids;
    //this.state.user=this.props.auth.users.message._id
    const marriedContent = this.state.isMarried 
      ? 
      <div>
        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <FormControlLabel
                control={<Checkbox name="isSpouseWorking" />}
                label="Spouse Working"
              />
              <label></label>
              <span className="red-text">{errors.isSpouseWorking}</span>
        </div>
        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
        <input onClick={this.addKids} type="button" value="Add kids" />
        </div>
        {
          kids.map((val, idx)=> {
            let genderId = `kid-${idx}`, ageId = `age-${idx}`;
            let no=idx+1;
            return (
              <div key={idx} className="col s12" style={{ paddingLeft: "11.250px" }}>
                <br></br>
            <label htmlFor="gender">kid-{no} Gender</label>
                <input
                  type="text"
                  name={genderId}
                  data-id={idx}
                  id={genderId}
                  value={kids[idx].name} 
                  className="gender"
                />
                <br/>
                <label htmlFor={ageId}>kid-{no} Age</label>
                <input
                  type="number"
                  name={ageId}
                  data-id={idx}
                  id={ageId}
                  defaultValue={kids[idx].age} 
                  className="age"
                />
              </div>
            )
          })
        }
      </div>
      : null;
return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>About</b> you
              </h4>
              <p className="grey-text text-darken-1">
                <Link to="/details">Why do I need to fill this?</Link>
              </p>
            </div>
            <form validate={this.validate} onSubmit={this.onSubmit} onChange={this.handleChange}>
              <div className="input-field col s12">
                <input
                  value={this.state.age}
                  error={this.state.errors.age}
                  id="age"
                  name="age"
                  type="number"
                  required
                  className={classnames("", {
                    invalid: errors.age
                  })}
                />
                <label htmlFor="name">Age</label>
                <span className="red-text">{errors.age}</span>
              </div>
              <div className="input-field col s12">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row aria-label="gender" name="gender" id="gender">
                <FormControlLabel value="f" control={<Radio />} label="Female" />
                <FormControlLabel value="m" control={<Radio />} label="Male" />
                <FormControlLabel value="o" control={<Radio />} label="Other" />
              </RadioGroup>
              <span className="red-text">{errors.gender}</span>
              </div>
              <div className="input-field col s12">
                <input
                  value={this.state.monthlyIncome}
                  error={errors.monthlyIncome}
                  name="monthlyIncome"
                  type="number"
                  className={classnames("", {
                    invalid: errors.monthlyIncome
                  })}
                />
                <label htmlFor="monthlyIncome">Monthly Income</label>
                <span className="red-text">{errors.monthlyIncome}</span>
              </div>
              <div className="input-field col s12">
              <FormControl component="fieldset">
              <RadioGroup row aria-label="disabilityPresent" name="disabilityPresent"  >
                <FormControlLabel value="none" control={<Radio />} label="None" />
                <FormControlLabel value="self" control={<Radio />} label="Self" />
                <FormControlLabel value="dependent" control={<Radio />} label="Others" />
              </RadioGroup>
              <FormLabel component="legend">Disability</FormLabel>
              </FormControl>
                <span className="red-text">{errors.email}</span>
              </div>
              
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <FormControlLabel
                control={<Checkbox name="isMarried" />}
                label="Married"
              />
              <label></label>
              <span className="red-text">{errors.confirmPassword}</span>
              </div>
              {marriedContent}
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h5>
                  <b>Our Pillars </b>
                </h5>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Typography className="">Liability</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="col s12">
                      <FormControlLabel
                            control={<Checkbox name="isHavingHomeLoan" />}
                            label="Do you have a home loan?"
                          />
                      <FormControlLabel
                            control={<Checkbox name="isHavingCarLoan" />}
                            label="Do you have a car loan?"
                          />
                      <FormControlLabel
                            control={<Checkbox name="isHavingOtherLoan" />}
                            label="Do you have any other loan?"
                          />
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1c-content"
                  id="panel1c-header"
                >
                <Typography className="">Security</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="col s12">
                    <FormControlLabel
                        control={<Checkbox name="isHavingGeneralInsurance" />}
                        label="I have a General Insurance"
                      />
                    <FormControlLabel
                        control={<Checkbox name="isHavingHealthInsurance" />}
                        label="I have a Health Insurance"
                      />
                    <FormControlLabel
                        control={<Checkbox name="isHavingLifeInsurance" />}
                        label="I have a Life Insurance"
                      />
                    <FormControlLabel
                        control={<Checkbox name="isHavingTermInsurance" />}
                        label="I have a Term Insurance"
                      />
                    <FormControlLabel
                        control={<Checkbox name="isHavingCar" />}
                        label="I own a Car"
                      />
                    {
                      this.state.isHavingCar ? 
                      <FormControlLabel
                        control={<Checkbox name="isHavingCarInsurance" />}
                        label="I have a Car Insurance"
                      />
                      : null
                    }
                  </div>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Typography className="">Liquidity</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <input
                      value={this.state.amountCashDeposit}
                      id="amountCashDeposit"
                      name="amountCashDeposit"
                      type="number"
                    />
                    <label htmlFor="name">Amount in Cash Deposit</label>
                  </div>
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <input
                      value={this.state.amountFixedDeposit}
                      id="amountFixedDeposit"
                      name="amountFixedDeposit"
                      type="number"
                    />
                    <label htmlFor="name">Amount in Fixed Deposit</label>
                  </div>
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <input
                      value={this.state.amountSavingDeposit}
                      id="amountSavingDeposit"
                      name="amountSavingDeposit"
                      type="number"
                    />
                    <label htmlFor="name">Amount in Saving Deposit</label>
                  </div>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Typography className="">Tax Savings</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="col s12">
                      <FormControlLabel
                            control={<Checkbox name="isHavingPPF" />}
                            label="PPF"
                          />
                          {
                            this.state.isHavingPPF ? 
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <input
                              value={this.state.amountPPF}
                              id="amountPPF"
                              name="amountPPF"
                              type="number"
                            />
                            <label htmlFor="name">Amount in PPF</label>
                            </div>
                            :null
                          }
                      <FormControlLabel
                            control={<Checkbox name="isHavingEPF" />}
                            label="EPF"
                          />
                      <FormControlLabel
                            control={<Checkbox name="isHavingNPS" />}
                            label="NPS"
                          />
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Typography className="">Liability</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="col s12">
                      <FormControlLabel
                            control={<Checkbox name="isHavingStock" />}
                            label="Stock"
                          />
                      <FormControlLabel
                            control={<Checkbox name="isHavingMutualFund" />}
                            label="Mutual Fund"
                          />
                      <FormControlLabel
                            control={<Checkbox name="isHavingBond" />}
                            label="Bond"
                          />
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Proceed
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Details.propTypes = {
  submitDetails:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
    mapStateToProps,
    {submitDetails},
)(Details);
