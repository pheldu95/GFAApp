import React, { useEffect, Fragment, useContext } from 'react';
import {Container} from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import FishCaughtDashboard from '../../features/fishCaught/dashboard/FishCaughtDashboard';
import './styles.css'
import { LoadingComponent } from './LoadingComponent';
import FishStore from '../stores/fishStore';
import {observer} from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import FishForm from '../../features/fishCaught/form/FishForm';
import FishDetails from '../../features/fishCaught/details/FishDetails';

//bringing in location as a prop so we can use it as a key on our FishForm route
const App: React.FC<RouteComponentProps> = ({location}) => {
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
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/fishCaught" component={FishCaughtDashboard} />
        <Route path="/fishCaught/:id" component={FishDetails} />
        {/* can pass an array of routes into the same component
        to load the same component for different routes. like create and edit(manage) */}
        {/* whenever the location key changes, the FishForm reinitializes */}
        <Route key={location.key} path={['/createFish', '/manage/:id']} component={FishForm} />
      </Container>
    </Fragment>
  );
}


export default withRouter(observer(App));
