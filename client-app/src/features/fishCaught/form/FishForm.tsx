import React, {useState, FormEvent} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IFish } from '../../../app/models/fish';
import { v4 as uuid } from "uuid";

interface IProps{
    setEditMode: (editMode: boolean) => void;
    fish: IFish;
    createFish: (fish: IFish) => void;
    editFish: (fish: IFish) => void;
}
const FishForm: React.FC<IProps> = ({ setEditMode, fish: initialFormState, createFish, editFish }) => {
    //return the fish if there is one to populate the form with
    //if we are creating a new caughtFish, we don't need to populate the form
    //so we just return all the fields but have them be empty
    const intializeForm = () =>{
        if(initialFormState){
            return initialFormState
        } else{
            let today = new Date();
            return{
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
            }
        }
    };

    const[fish, setFish] = useState<IFish>(intializeForm);

    const handleSubmit = () =>{
        //if the id length is zero, that means it doesnt have an id, and is a new activity
        //so we add the guid with the spread operator, andf then pass it to createFish
        if(fish.id.length === 0){
            let newFish = {
                ...fish,
                id: uuid()
            }
            console.log(newFish);
            
            createFish(newFish);
        }else{
            //if the id length is greater than zero, that means we are editing. b/c already has an id
            //so we just pass the fish to editFish
            editFish(fish)
        }        
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement>) => {        
        //event.currentTarget is the same as event.target, except it is for FormEvents, instead of ChangeEvents. We use FormEvent b/c we have a text area for our description
        //destructure event so that we dont have to type out event.currentTarget.name and event.currentTarget.value
        const { name, value } = event.currentTarget;
        console.log(value);
        //setActiviy is like using this.setState in class components
        setFish({
            ...fish,
            [name]: value
        })
        console.log(fish);
        
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} name='fisherId' placeholder='Fisher Id' value={fish.fisherId} />
                <Form.Input onChange={handleInputChange} name='guideId' placeholder='Guide Id' value={fish.guideId} />
                <Form.Input onChange={handleInputChange} name='organizationId' placeholder='Organization Id' value={fish.organizationId} />
                <Form.Input onChange={handleInputChange} name='fishTypeId' placeholder='Fish Type' value={fish.fishTypeId}/>
                {/* <Form.Field label='Fish Species' control='select'>
                    <option value = {1}>Bass</option> 
                    <option value={2}>Lake Trout</option> 
                </Form.Field> */}
                <Form.Input onChange={handleInputChange} name='length' placeholder='Length' value={fish.length}/>
                <Form.Input onChange={handleInputChange} name='weight' placeholder='Weight' value={fish.weight}/>
                <Form.Checkbox onChange={handleInputChange} label='Exceptional Catch?'/>
                <Form.Checkbox onChange={handleInputChange} label='Unusual Catch?'/>
                <Form.Input onChange={handleInputChange} name='latitude' placeholder='Latitude' value={fish.latitude} />
                <Form.Input onChange={handleInputChange} name='longitude' placeholder='Longitude' value={fish.longitude} />
                <Form.Input onChange={handleInputChange} name='skyTypeId' placeholder='Sky Type Id' value={fish.skyTypeId} />
                <Form.Input onChange={handleInputChange} name='windTypeId' placeholder='windTypeId' value={fish.windTypeId} />
                <Form.Input onChange={handleInputChange} name='waterTypeId' placeholder='waterTypeId' value={fish.waterTypeId} />
                <Form.Input onChange={handleInputChange} name='moonPhase' placeholder='Moon Phase' value={fish.moonPhase} />
                <Form.Input onChange={handleInputChange} name='moonIlluminationPercent' placeholder='moonIlluminationPercent' value={fish.moonIlluminationPercent} />
                <Form.Input onChange={handleInputChange} name='airTemperature' placeholder='airTemperature' value={fish.airTemperature} />
                <Form.Input onChange={handleInputChange} name='waterTemperature' placeholder='waterTemperature' value={fish.waterTemperature} />
                <Form.Input onChange={handleInputChange} name='caughtDate' type='datetime-local' placeholder='Date' value={fish.caughtDate}/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}

export default FishForm;