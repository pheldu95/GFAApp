import React, {useState, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { FishFormValues } from '../../../app/models/fish';
import { v4 as uuid } from "uuid";
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field} from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import NumberInput from '../../../app/common/form/NumberInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { fishTypeOptions } from '../../../app/common/options/fishTypeOptions';
import { skyTypeOptions } from '../../../app/common/options/skyTypeOptions';
import { windTypeOptions } from '../../../app/common/options/windTypeOptions';
import { waterTypeOptions } from '../../../app/common/options/waterTypeOptions';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';
import {combineValidators, isRequired} from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';

//specify the field that you want to validate against
//the package does the hard work for us
//then we add validate to <FinalForm></FinalForm>
const validate = combineValidators({
  fisherId: isRequired({message: 'FisherId is required'}),
  guideId: isRequired('guideId'),
  fishTypeId: isRequired('fishTypeId'),
  caughtDate: isRequired('caughtDate'),
  caughtTime: isRequired('caughtTime')
})

//tell the component that there witll be an id. in match.params.id
interface DetailParams{
    id: string;
}

const FishForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history}) => {
    const rootStore = useContext(RootStoreContext);
    const { createFish, editFish, submitting, loadFish } = rootStore.fishStore;

    //use the IFishFormValues instead of IFish
    const [fish, setFish] = useState(new FishFormValues());
    //this is for our loading indicator
    const [loading, setLoading] = useState(false);
    //load the fish specified in the url on page load
    //we can use .then() because the loadFish method from fishStore is async
    useEffect(() => {
        if (match.params.id){
          setLoading(true);
            loadFish(match.params.id).then(
                //if it's undefined, then it won't setFish
                //we use our constructor to make a new instance of the FishFormValues class
                //and setFish to set fish in state to the FishFormValues
                (fish) => setFish(new FishFormValues(fish))
            ).finally(() => setLoading(false));
        }
        
        //add the things we are using to the dependencies
        //useEffect will only run if loadFish or match.params.id has changed
    }, [loadFish, match.params.id])

    const handleFinalFormSubmit = (values: any) => {
      const dateAndTime = combineDateAndTime(
        values.caughtDate,
        values.caughtTime
      );
      //use the spread operator to ommit date and time from values.
      //then we will add back the combined date and time
      const { caughtDate, caughtTime, ...fish } = values;
      //...fish in the spread operator created a new object called fish
      //with all the properties from values except for date and time.
      //so now we can add the caughtDate as dateAndTime
      fish.caughtDate = dateAndTime;
      //if the id length is zero, that means it doesnt have an id, and is a new activity
      //so we add the guid with the spread operator, andf then pass it to createFish
      if(!fish.id){
          let newFish = {
              ...fish,
              id: uuid()
          }
          //send the new fish to createFish in our fishstore
          createFish(newFish);
      }else{
          //if the id length is greater than zero, that means we are editing. b/c already has an id
          //so we just pass the fish to editFish
          editFish(fish);
      }
    }

    // const handleInputChange = (event: FormEvent<HTMLInputElement>) => {        
    //     //event.currentTarget is the same as event.target, except it is for FormEvents, instead of ChangeEvents. We use FormEvent b/c we have a text area for our description
    //     //destructure event so that we dont have to type out event.currentTarget.name and event.currentTarget.value
    //     const { name, value } = event.currentTarget;
    //     //if value can be converted to a number, then convert it
    //     //or else the db won't like it coming in as a string and we will get an error
    //     if(Number(value)){
    //         setFish({
    //             ...fish,
    //             [name]: Number(value)
    //         })
    //         //if it's not a number, then that's fine, leave it as a string
    //     }else{
    //         //setActiviy is like using this.setState in class components
    //         setFish({
    //             ...fish,
    //             [name]: value
    //         })
    //     }
        
    // }
    return (
      <Grid>
        <Grid.Column widht={10}>
          <Segment clearing>
            {/* this is from react-final-form */}
            {/* we pass our form into render inside <FinalForm render={}/> */}
            <FinalForm
              //add our validation that we set up
              validate={validate}
              // can use initialValues for react final form to easily give the inputs an initial value
              initialValues={fish}
              onSubmit={handleFinalFormSubmit}
              //invalid and pristine make it so the submit button is disabled if the form is invalid or in a pristine state(not been touched)
              render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit} loading={loading}>
                  <Field
                    name="fisherId"
                    type="number"
                    placeholder="Fisher Id"
                    value={fish.fisherId}
                    component={NumberInput}
                  />
                  <Field
                    name="guideId"
                    type="number"
                    placeholder="Guide Id"
                    value={fish.guideId}
                    component={NumberInput}
                  />
                  <Field
                    name="organizationId"
                    type="number"
                    placeholder="Organization Id"
                    value={fish.organizationId}
                    component={NumberInput}
                  />
                  <Field
                    name="fishTypeId"
                    options={fishTypeOptions}
                    placeholder="Fish Type"
                    value={fish.fishTypeId}
                    component={SelectInput}
                  />
                  {/* <Form.Field label='Fish Species' control='select'>
                    <option value = {1}>Bass</option> 
                    <option value={2}>Lake Trout</option> 
                </Form.Field> */}
                  <Field
                    name="length"
                    type="number"
                    placeholder="Length"
                    value={fish.length}
                    component={NumberInput}
                  />
                  <Field
                    name="weight"
                    type="number"
                    placeholder="Weight"
                    value={fish.weight}
                    component={NumberInput}
                  />
                  <Form.Checkbox label="Exceptional Catch?" />
                  <Form.Checkbox label="Unusual Catch?" />
                  <Field
                    name="latitude"
                    type="number"
                    placeholder="Latitude"
                    value={fish.latitude}
                    component={NumberInput}
                  />
                  <Field
                    name="longitude"
                    type="number"
                    placeholder="Longitude"
                    value={fish.longitude}
                    component={NumberInput}
                  />
                  <Field
                    name="skyTypeId"
                    options={skyTypeOptions}
                    placeholder="Sky Type"
                    value={fish.skyTypeId}
                    component={SelectInput}
                  />
                  <Field
                    name="windTypeId"
                    options={windTypeOptions}
                    placeholder="Wind Type"
                    value={fish.windTypeId}
                    component={SelectInput}
                  />
                  <Field
                    name="waterTypeId"
                    options={waterTypeOptions}
                    placeholder="waterTypeId"
                    value={fish.waterTypeId}
                    component={SelectInput}
                  />
                  <Field
                    name="moonPhase"
                    placeholder="Moon Phase"
                    value={fish.moonPhase}
                    component={TextInput}
                  />
                  <Field
                    name="moonIlluminationPercent"
                    type="number"
                    placeholder="moonIlluminationPercent"
                    value={fish.moonIlluminationPercent}
                    component={NumberInput}
                  />
                  <Field
                    name="airTemperature"
                    type="number"
                    placeholder="airTemperature"
                    value={fish.airTemperature}
                    component={NumberInput}
                  />
                  <Field
                    name="waterTemperature"
                    type="number"
                    placeholder="waterTemperature"
                    value={fish.waterTemperature}
                    component={NumberInput}
                  />
                  <Form.Group widths="equal">
                    {/* making date={true} will make it a date input, not time. and vice versa on the time input making time={true} */}
                    <Field
                      name="caughtDate"
                      placeholder="Date"
                      date={true}
                      value={fish.caughtDate}
                      component={DateInput}
                    />
                    <Field
                      name="caughtTime"
                      placeholder="Time"
                      time={true}
                      value={fish.caughtTime}
                      component={DateInput}
                    />
                  </Form.Group>

                  <Field
                    name="notes"
                    placeholder="Notes"
                    rows={3}
                    component={TextAreaInput}
                  />
                  {/* if submitting is true, then a loading icon will be displayed. b/c of loading={submitting} */}
                  <Button
                    loading={submitting}
                    //if the page is loading, the button will not show up yet. using disabled and the loading bool from our state
                    //also will do this if the form is invalid or pristine
                    disabled={loading || invalid || pristine}
                    floated="right"
                    positive
                    type="submit"
                    content="Submit"
                  />
                  <Button
                    // if we have an id, that means we are editing, so we want to take them back to the details page
                    //if we don't have an id, that means we are creating so we want to take the user back to the fish feed if they press cancel
                    onClick={fish.id ? () => history.push(`/fishCaught/${fish.id}`) : () => history.push("/fishCaught")}
                    disabled={loading}
                    floated="right"
                    type="button"
                    content="Cancel"
                  />
                </Form>
              )}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    );
}

export default observer(FishForm);