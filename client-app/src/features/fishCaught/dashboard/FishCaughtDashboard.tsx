import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IFish } from '../../../app/models/fish';
import FishCaughtList from './FishCaughtList';
import FishDetails from '../details/FishDetails';
import FishForm from '../form/FishForm';

interface IProps {
    //in the props, we will be recieving an array called fishCaught of type IFish
    //from App.tsx
    fishCaught: IFish[]
    //will also be receiving a function that takes an id as a perameter and returns void
    selectFish: (id: string) => void;
    //either will be a fish or will be null. if it is null, we won't display it
    selectedFish: IFish | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedFish: (fish: IFish | null) => void;
}

//in order to use our IProps interface, we need to give our dashboard a type
//the type we give it is React.FC. Then we can pass our IProps using <IProps>
// using curly brackets, we can destrucutre our props. so we don't have to say props.fishCaught
//just pass {fishCaught} into the function instead of props
const FishCaughtDashboard: React.FC<IProps> = ({ 
    fishCaught, 
    selectFish, 
    selectedFish, 
    editMode, 
    setEditMode, 
    setSelectedFish 
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <FishCaughtList 
                    fishCaught={fishCaught} 
                    selectFish={selectFish}
                />
                
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedFish && !editMode &&
                    <FishDetails
                        fish={selectedFish}
                        setSelectedFish={setSelectedFish}
                        setEditMode={setEditMode}
                    />
                }
                {editMode &&
                    <FishForm 
                        fish={selectedFish!}
                        setEditMode={setEditMode}
                    />
                }
            </Grid.Column>
        </Grid>
    )
}

export default FishCaughtDashboard;
