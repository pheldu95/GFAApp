import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {Container} from 'semantic-ui-react';
import { IFish } from '../models/fish';
import { NavBar } from '../../features/nav/NavBar';
import FishCaughtDashboard from '../../features/fishCaught/dashboard/FishCaughtDashboard';
import './styles.css'


const App = () => {
  //our useState is using  <IFish[]>, the IFish interface
  const [fishCaught, setFishCaught] = useState<IFish[]>([]);
  //our selected fish can be a type of IFish, or it can be null.
  //that we, if no fish is selected, selectedFish will just be null
  const [selectedFish, setSelectedFish] = useState<IFish | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectFish = (id: string) =>{
    //filter out every fish that doesnt have the id getting passed into this function
    //then set the remaining fish as our selectedFish
    setSelectedFish(fishCaught.filter(f => f.id === id)[0])
  }

  const handleOpenCreateForm = () =>{
    setSelectedFish(null);
    setEditMode(true);
  }

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
      <NavBar openCreateForm={handleOpenCreateForm}/>
      <Container style={{marginTop: '7em'}}>
        <FishCaughtDashboard 
          fishCaught={fishCaught} 
          selectFish={handleSelectFish}
          selectedFish={selectedFish}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedFish={setSelectedFish}
        />
      </Container>
    </Fragment>
  );
}


export default App;
