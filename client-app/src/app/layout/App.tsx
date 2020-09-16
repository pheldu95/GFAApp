import React, { Fragment, useContext, useEffect } from 'react';
import {Container} from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import FishCaughtDashboard from '../../features/fishCaught/dashboard/FishCaughtDashboard';
import './styles.css'
import {observer} from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import FishForm from '../../features/fishCaught/form/FishForm';
import FishDetails from '../../features/fishCaught/details/FishDetails';
import NotFound from './NotFound';
import {ToastContainer} from 'react-toastify';
import LoginForm from '../../features/user/LoginForm';
import { RootStoreContext } from '../stores/rootStore';
import { LoadingComponent } from './LoadingComponent';

//bringing in location as a prop so we can use it as a key on our FishForm route
const App: React.FC<RouteComponentProps> = ({location}) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const {getUser} = rootStore.userStore;

  useEffect(() => {
    //if we have a token, then we will get the user
    if(token){
      getUser().finally(() => setAppLoaded());
    }else{
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token])
  
  //if app is not loaded, then we show the loading component
  if(!appLoaded) return <LoadingComponent content='Loading app...'/>

  return (
    <Fragment>
      <ToastContainer position='bottom-right'/>
      <Route exact path="/" component={HomePage} />
      {/* when the route has a / and anything else after it, it will hit the Route below
      that's what the /(.+) means */}
      {/* Now, our home page will not have the nav bar, only components with the below path will */}
      <Route path={'/(.+)'} render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              {/* <Switch> makes it so each Route is exclusive, and cannot be displayed at the same time */}
              <Switch>
                <Route exact path="/fishCaught" component={FishCaughtDashboard} />
                <Route path="/fishCaught/:id" component={FishDetails} />
                {/* can pass an array of routes into the same component
                to load the same component for different routes. like create and edit(manage) */}
                {/* whenever the location key changes, the FishForm reinitializes */}
                <Route key={location.key} path={['/createFish', '/manage/:id']} component={FishForm} />
                <Route path='/login' component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
      )}/>
    </Fragment>
  );
}


export default withRouter(observer(App));
