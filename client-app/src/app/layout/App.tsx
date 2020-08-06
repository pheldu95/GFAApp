import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Header, Icon, List, Container} from 'semantic-ui-react';
import { IFish } from '../models/fish';
import { NavBar } from '../../features/nav/NavBar';
import { FishCaughtDashboard } from '../../features/fishCaught/dashboard/FishCaughtDashboard';



const App = () => {
  //our useState is using  <IFish[]>, the IFish interface
  const [fishCaught, setFishCaught] = useState<IFish[]>([]);

  //in functional component, use useEffect instead of componentDidMount
  useEffect(() => {
  //<IFish[]> tells axios that we are returning an array as the response. of type IFish
    axios.get<IFish[]>("http://localhost:5000/api/fishCaught")
    .then((response) => {
      //setFishCaught is setting the array to our response.data
      //used instead of this.setState
      setFishCaught(response.data);
    });
    //we add an empty array at the end. this makes the useEffect only run ones
  }, [])

  // componentDidMount = () =>{
  //   //<IFish[]> tells axios that we are returning an array as the response. of type IFish
  //   axios.get<IFish[]>("http://localhost:5000/api/fishCaught")
  //   .then((response) => {
  //     this.setState({
  //       fishCaught: response.data
  //     });
  //   });
   
  // }
  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <FishCaughtDashboard fishCaught={fishCaught}/>
      </Container>
    </Fragment>
  );
}


export default App;
