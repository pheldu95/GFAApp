import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import FishCaughtList from './FishCaughtList';
import { observer } from "mobx-react-lite";
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import FishStore from '../../../app/stores/fishStore'

const FishCaughtDashboard: React.FC = () => {
  //make the FishStore from mobx available to this component
  const fishStore = useContext(FishStore);



  //in functional component, use useEffect instead of componentDidMount
  useEffect(() => {
    //use our fishStore to get fish
    fishStore.loadFishCaught();
    //we add an array at the end. this makes the useEffect only run ones
  }, [fishStore])

  //if the page is loading, then return this component instead of the return below
  if (fishStore.loadingInitial) return <LoadingComponent content='Loading...' />

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
