import React, { useState, useEffect, Fragment, SyntheticEvent, useContext } from 'react';
import {Container} from 'semantic-ui-react';
import { IFish } from '../models/fish';
import NavBar from '../../features/nav/NavBar';
import FishCaughtDashboard from '../../features/fishCaught/dashboard/FishCaughtDashboard';
import './styles.css'
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';
import FishStore from '../stores/fishStore';
import {observer} from 'mobx-react-lite';

const App = () => {
  //make the FishStore from mobx available to this component
  const fishStore = useContext(FishStore);

  //our useState is using  <IFish[]>, the IFish interface
  const [fishCaught, setFishCaught] = useState<IFish[]>([]);
  //our selected fish can be a type of IFish, or it can be null.
  //that we, if no fish is selected, selectedFish will just be null
  const [selectedFish, setSelectedFish] = useState<IFish | null>(null);
  const [editMode, setEditMode] = useState(false);
  //will toggle this state between whether the page is loading or not
  const [loading, setLoading] = useState(true);
  //we will toggle this state between whether we are submitting some change to the API or not
  //if submitting is true, then our buttons will have a loading icon
  //we pass submitting down to our dashboard, and then our list and form. as props
  const [submitting, setSubmitting] = useState(false);
  const[target, setTarget] = useState('');

  // const handleSelectFish = (id: string) =>{
  //   //filter out every fish that doesnt have the id getting passed into this function
  //   //then set the remaining fish as our selectedFish
  //   setSelectedFish(fishCaught.filter(f => f.id === id)[0])
  //   setEditMode(false);
  // }

  

  const handleEditFish = (fish: IFish) => {
    setSubmitting(true);
    agent.FishCaught.update(fish).then(() => {
      //filter out the fish that we have edited, then add the updated version
      setFishCaught([...fishCaught.filter(f => f.id !== fish.id), fish]);
      setSelectedFish(fish);
      setEditMode(false);
    }).then(() => setSubmitting(false));
    
  }

  //we will receive the event that has the unique name of the button pressed
  //that way we can toggle the loading icon just for that button
  const handleDeleteFish = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.FishCaught.delete(id).then(()=>{
      //filter out the fish we are deleting
      setFishCaught([...fishCaught.filter(f => f.id !== id)]);
    }).then(() => setSubmitting(false));
    
  }
  //in functional component, use useEffect instead of componentDidMount
  useEffect(() => {
    //use our fishStore to get fish
    fishStore.loadFishCaught();
    //we add an array at the end. this makes the useEffect only run ones
  }, [fishStore])

  //if the page is loading, then return this component instead of the return below
  if (fishStore.loadingInitial) return <LoadingComponent content='Loading fish feed...' />


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
      <Container style={{ marginTop: "7em" }}>
        <FishCaughtDashboard
          fishCaught={fishStore.fishCaught}
          setEditMode={setEditMode}
          setSelectedFish={setSelectedFish}
          editFish={handleEditFish}
          deleteFish={handleDeleteFish}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
}


export default observer(App);
