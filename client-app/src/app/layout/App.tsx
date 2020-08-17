import React, { useEffect, Fragment, useContext } from 'react';
import {Container} from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import FishCaughtDashboard from '../../features/fishCaught/dashboard/FishCaughtDashboard';
import './styles.css'
import { LoadingComponent } from './LoadingComponent';
import FishStore from '../stores/fishStore';
import {observer} from 'mobx-react-lite';

const App = () => {
  //make the FishStore from mobx available to this component
  const fishStore = useContext(FishStore);



  //in functional component, use useEffect instead of componentDidMount
  useEffect(() => {
    //use our fishStore to get fish
    fishStore.loadFishCaught();
    //we add an array at the end. this makes the useEffect only run ones
  }, [fishStore])

  //if the page is loading, then return this component instead of the return below
  if (fishStore.loadingInitial) return <LoadingComponent content='Loading fish feed...' />

  return (
    <Fragment>
      <NavBar/>
      <Container style={{ marginTop: "7em" }}>
        <FishCaughtDashboard/>
      </Container>
    </Fragment>
  );
}


export default observer(App);
