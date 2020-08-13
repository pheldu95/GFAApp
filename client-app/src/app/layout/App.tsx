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
    setEditMode(false);
  }

  const handleOpenCreateForm = () =>{
    setSelectedFish(null);
    setEditMode(true);
  }

  const handleCreateFish = (fish: IFish) => {
    //add the new fish
    setFishCaught([...fishCaught, fish]);
    //set the new fish as the selected fish for the details view
    setSelectedFish(fish);
    //switch off edit mode so the details view is the only thing shown
    setEditMode(false);
  }

  const handleEditFish = (fish: IFish) => {
    //filter out the fish that we have edited, then add the updated version
    setFishCaught([...fishCaught.filter(f => f.id !== fish.id), fish]);
    setSelectedFish(fish);
    setEditMode(false);
  }

  const handleDeleteFish = (id: string) => {
    //filter out the fish we are deleting
    setFishCaught([...fishCaught.filter(f => f.id !== id)]);
  }
  //in functional component, use useEffect instead of componentDidMount
  useEffect(() => {
  //<IFish[]> tells axios that we are returning an array as the response. of type IFish
    axios.get<IFish[]>("http://localhost:5000/api/fishCaught")
    .then((response) => {
      //create an array that we can add our fish once their dates are reformatted
      let fishCaught: IFish[] = [];
      //loop through and reformat date
      //then add the fish to the fishCaught array
      response.data.forEach(fish => {
        fish.caughtDate = fish.caughtDate.split('.')[0];
        fishCaught.push(fish);
      })
      //setFishCaught to our new fishCaught array with the reformatted dates
      //used instead of this.setState
      setFishCaught(fishCaught);
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
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <FishCaughtDashboard
          fishCaught={fishCaught}
          selectFish={handleSelectFish}
          selectedFish={selectedFish}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedFish={setSelectedFish}
          createFish={handleCreateFish}
          editFish={handleEditFish}
          deleteFish={handleDeleteFish}
        />
      </Container>
    </Fragment>
  );
}


export default App;
