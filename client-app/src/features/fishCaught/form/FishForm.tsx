import React, {useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IFish } from '../../../app/models/fish';
import { v4 as uuid } from "uuid";
import FishStore from '../../../app/stores/fishStore';
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

//tell the component that there witll be an id. in match.params.id
interface DetailParams{
    id: string;
}

const FishForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history}) => {
    const fishStore = useContext(FishStore);
    const { createFish, editFish, submitting, fish: initialFormState, loadFish, clearFish } =fishStore
   
    const [fish, setFish] = useState<IFish>({
        //this is the initial state
        id: '',
        fisherId: 0,
        guideId: 0,
        organizationId: 0,
        fishTypeId: 0,
        length: 0,
        weight: 0,
        exceptionalCatch: false,
        unusualCatch: false,
        latitude: 0,
        longitude: 0,
        skyTypeId: 0,
        windTypeId: 0,
        waterTypeId: 0,
        moonPhase: '',
        moonIlluminationPercent: 0,
        airTemperature: 0,
        waterTemperature: 0,
        caughtDate: '',
        lastModifiedDate: '2020-08-14T17:33'
    });

    //load the fish specified in the url on page load
    //we can use .then() because the loadFish method from fishStore is async
    useEffect(() => {
        if (match.params.id && fish.id.length === 0){
            loadFish(match.params.id).then(
                //the && is used to say that we will only setFish if the initialFormState exists
                //if it's undefined, then it won't setFish
                () => initialFormState && setFish(initialFormState))
        }
        //the commented out code isn't working. not sure why
        //but app seems to work without it
        //return a function that will handle clean up
        //it will clear our fish from the fishStore
        // return() => {
        //     clearFish();
        // }
        //add the things we are using to the dependencies
    }, [loadFish, clearFish, match.params.id, initialFormState, fish.id.length])


    // const handleSubmit = () =>{
    //     //if the id length is zero, that means it doesnt have an id, and is a new activity
    //     //so we add the guid with the spread operator, andf then pass it to createFish
    //     if(fish.id.length === 0){
    //         let newFish = {
    //             ...fish,
    //             id: uuid()
    //         }
    //         //send the user to the details page for the new fish
    //         createFish(newFish).then(() => history.push(`/fishCaught/${newFish.id}`));
    //     }else{
    //         //if the id length is greater than zero, that means we are editing. b/c already has an id
    //         //so we just pass the fish to editFish
    //         //then we send the user to the details page for the edited fish
    //         editFish(fish).then(() => history.push(`/fishCaught/${fish.id}`));
    //     }        
    // }

    const handleFinalFormSubmit = (values: any) => {
        console.log(values);
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
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
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
                  <Field
                    name="caughtDate"
                    placeholder="Date"
                    value={fish.caughtDate}
                    component={TextInput}
                  />
                  <Field
                    name="notes"
                    placeholder="Notes"
                    rows={3}
                    component={TextAreaInput}
                  />
                  {/* if submitting is true, then a loading icon will be displayed. b/c of loading={submitting} */}
                  <Button
                    loading={submitting}
                    floated="right"
                    positive
                    type="submit"
                    content="Submit"
                  />
                  <Button
                    onClick={() => history.push("/fishCaught")}
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