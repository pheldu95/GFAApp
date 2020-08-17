import React, { SyntheticEvent, useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import { IFish } from '../../../app/models/fish';
import FishCaughtList from './FishCaughtList';
import FishDetails from '../details/FishDetails';
import FishForm from '../form/FishForm';
import { observer } from "mobx-react-lite";
import FishStore from '../../../app/stores/fishStore';

interface IProps {
    //in the props, we will be recieving an array called fishCaught of type IFish
    //from App.tsx
    fishCaught: IFish[]
    setEditMode: (editMode: boolean) => void;
    setSelectedFish: (fish: IFish | null) => void;
    editFish: (fish: IFish) => void;
    deleteFish: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;

}

//in order to use our IProps interface, we need to give our dashboard a type
//the type we give it is React.FC. Then we can pass our IProps using <IProps>
// using curly brackets, we can destrucutre our props. so we don't have to say props.fishCaught
//just pass {fishCaught} into the function instead of props
const FishCaughtDashboard: React.FC<IProps> = ({
  fishCaught,
  setEditMode,
  setSelectedFish,
  editFish,
  deleteFish,
  submitting,
  target
}) => {
  const fishStore = useContext(FishStore);
  //destructure what we need from the fishStore
  const {editMode, selectedFish} = fishStore
  return (
    <Grid>
      <Grid.Column width={10}>
        <FishCaughtList 
            deleteFish={deleteFish}
            submitting={submitting}
            target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedFish && !editMode && (
          <FishDetails
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
            editFish={editFish}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(FishCaughtDashboard);
