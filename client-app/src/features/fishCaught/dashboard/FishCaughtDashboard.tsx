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
  const {editMode, fish} = fishStore
  return (
    <Grid>
      <Grid.Column width={10}>
        <FishCaughtList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Fish filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(FishCaughtDashboard);
