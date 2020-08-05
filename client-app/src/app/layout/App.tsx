import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, Icon, List} from 'semantic-ui-react';
import { IFish } from '../models/fish';



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
    <div>
    <Header as="h2" icon>
      <Icon name="home" />
      Grantsburg Fishing Association
      
    </Header>
      <List>
        {fishCaught.map((fish) => (
          <List.Item key={fish.id}>{fish.latitude}, {fish.longitude}</List.Item>
        ))}
      </List>
    </div>
  );
}


export default App;
