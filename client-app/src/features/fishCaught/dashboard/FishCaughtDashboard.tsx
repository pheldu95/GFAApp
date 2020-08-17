import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import FishCaughtList from './FishCaughtList';
import FishDetails from '../details/FishDetails';
import FishForm from '../form/FishForm';
import { observer } from "mobx-react-lite";
import FishStore from '../../../app/stores/fishStore';

const FishCaughtDashboard: React.FC = () => {
  const fishStore = useContext(FishStore);
  //destructure what we need from the fishStore
  const {editMode, selectedFish} = fishStore
  return (
    <Grid>
      <Grid.Column width={10}>
        <FishCaughtList />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedFish && !editMode && (
          <FishDetails/>
        )}
        {editMode && (
          <FishForm
            //giving the fishform a key because if the key changes, then we will want to rerender the page
            //so if we are on edit mode, but then the we click Add Catch it will rerender the page with the add catch form instead of the edit mode form
            key={(selectedFish && selectedFish.id) || 0}
            fish={selectedFish!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(FishCaughtDashboard);
