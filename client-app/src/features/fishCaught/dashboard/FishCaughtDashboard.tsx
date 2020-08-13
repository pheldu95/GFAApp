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
    createFish: (fish: IFish) => void;
    editFish: (fish: IFish) => void;
    deleteFish: (id: string) => void;

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
  setSelectedFish,
  createFish,
  editFish,
  deleteFish,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <FishCaughtList 
            fishCaught={fishCaught} 
            selectFish={selectFish} 
            deleteFish={deleteFish}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedFish && !editMode && (
          <FishDetails
            fish={selectedFish}
            setSelectedFish={setSelectedFish}
            setEditMode={setEditMode}
          />
        )}
        {editMode && (
          <FishForm
            //giving the fishform a key because if the key changes, then we will want to rerender the page
            //so if we are on edit mode, but then the we click Add Catch it will rerender the page with the add catch form instead of the edit mode form
            key={(selectedFish && selectedFish.id) || 0}
            fish={selectedFish!}
            setEditMode={setEditMode}
            createFish={createFish}
            editFish={editFish}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default FishCaughtDashboard;
