/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from "react";
import { render } from 'react-dom'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import { submitDetails } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FieldArray } from 'react-final-form-arrays'
import createDecorator from 'final-form-calculate'


import Styles from './Styles'
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';

const validate = values => {
  const errors = {};
  if (!values.userId) {
    errors.userId = 'Required';
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
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const calculator = createDecorator(
  {
    field: 'minimum', // when minimum changes...
    updates: {
      // ...update maximum to the result of this function
      maximum: (minimumValue, allValues) =>
        Math.max(minimumValue || 0, allValues.maximum || 0)
    }
  },
  {
    field: 'maximum', // when maximum changes...
    updates: {
      // update minimum to the result of this function
      minimum: (maximumValue, allValues) =>
        Math.min(maximumValue || 0, allValues.minimum || 0)
    }
  }
)

class Details extends Component {

  onSubmit = async values => {
    await sleep(300)
    console.log(values)
    this.props.submitDetails(values,this.props.history); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter


  }

  render() {
  return (
  <Styles>
    <Typography variant="h4" align="center" component="h1" gutterBottom>
       🏁 Just few more steps to go 🏁
    </Typography>
    <Form
      onSubmit={this.onSubmit}
      decorators={[calculator]}
      initialValues={{user:"5f0acde254305e1ec00e8606",
      "isHavingCar": false,"isHavingCarInsurance": false,
      "isHavingHealthInsurance": false,
      "isHavingTermInsurance": false,
      "isHavingLifeInsurance": false,
      "isMarried": false,
      "isSpouseWorking": false,
      "disability": "none"
      }}
      mutators={{
              ...arrayMutators
            }}
      render={({
        form: {
          mutators: { push, pop }
        }, // injected from final-form-arrays above
        handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
        <Paper style={{ padding: 16 }}>
          <Grid container alignItems="flex-start" spacing={2}>
            
            <Grid item xs={12}>
              <Field
                fullWidth
                name="gender"
                required
                component={Select}
                label="Gender"
                formControlProps={{ fullWidth: true }}
              >
                <MenuItem value="m">Male</MenuItem>
                <MenuItem value="f">Female</MenuItem>
                <MenuItem value="o">Others
                </MenuItem>
              </Field>
            </Grid>
            <Grid item xs={6}>
              <Field
                name="age"
                fullWidth
                required
                component={TextField}
                type="number"
                label="Age"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                name="monthlyIncome"
                fullWidth
                required
                component={TextField}
                type="number"
                label="Monthly Income"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                label="Married"
                control={
                  <Field
                    name="isMarried"
                    component={Checkbox}
                    type="checkbox"
                  />
                }
              />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  label="Spouse Working"
                  control={
                    <Field
                      name="isSpouseWorking"
                      component={Checkbox}
                      type="checkbox"
                    />
                  }
                />
            </Grid>
          <Grid item xs={12}>
            <Field
              name="ageSpouse"
              fullWidth
              //required
              component={TextField}
              type="number"
              label="Spouse Age"
            />
          </Grid>

          <Grid item xs={6}>
          <label>Add Kids</label>
           <Button
             name="addKid"
             onClick={() =>{
               //values["numberOfKids"]=values["numberOfKids"]+1
               push('kids', undefined)}}
           >
             +
           </Button>
           <Button
           name="romoveKid"
            onClick={() =>pop('kids')
           }
             >
             -
           </Button>
           </Grid>
           <Grid item xs={12}>

         <FieldArray name="kids">
           {({ fields }) =>
             fields.map((kids, index) => (
               <div key={kids}>
                 <label>Kid. #{index + 1}</label>
                 <Field
                   fullWidth
                   name={`${kids}.gender`}
                   component={Select}
                   label="Gender"
                   formControlProps={{ fullWidth: true }}
                 >
                   <MenuItem value="m">Male</MenuItem>
                   <MenuItem value="f">Female</MenuItem>
                   <MenuItem value="o">Others
                   </MenuItem>
                 </Field>
                 <Field
                   name={`${kids}.age`}
                   component="input"
                   type="number"
                   placeholder="Age"
                 />
                 <span
                   onClick={() => fields.remove(index)}
                   style={{ cursor: 'pointer' }}
                 >
                   ❌
                 </span>
               </div>
             ))
           }
         </FieldArray>

          </Grid>

          <Grid item xs={12}>
            <Field
              fullWidth
              name="disability"
              required
              component={Select}
              label="Disability"
              formControlProps={{ fullWidth: true }}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="self">Self</MenuItem>
              <MenuItem value="dependents">Dependents</MenuItem>
            </Field>
          </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            label="I own a Car"
            control={
              <Field
                name="isHavingCar"
                component={Checkbox}
                type="checkbox"
              />
            }
          />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              label="Car Insured?"
              control={
                <Field
                  name="isHavingCarInsurance"
                  component={Checkbox}
                  type="checkbox"
                />
              }
            />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            label="Health Insurance"
            control={
              <Field
                name="isHavingHealthInsurance"
                component={Checkbox}
                type="checkbox"
              />
            }
          />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              label="Term Insurance"
              control={
                <Field
                  name="isHavingTermInsurance"
                  component={Checkbox}
                  type="checkbox"
                />
              }
            />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                label="Life Insurance"
                control={
                  <Field
                    name="isHavingLifeInsurance"
                    component={Checkbox}
                    type="checkbox"
                  />
                }
              />
              </Grid>

            <Grid item style={{ marginTop: 16 }}>
              <Button
                type="button"
                variant="contained"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </Button>
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}
    />
</Styles>
);
  }
}
Details.propTypes = {
  submitDetails: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { submitDetails }
)(Details);
