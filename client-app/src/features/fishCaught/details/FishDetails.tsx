import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import FishStore from "../../../app/stores/fishStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from 'react-router-dom';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import FishDetailedHeader from './FishDetailedHeader';
import FishDetailedInfo from './FishDetailedInfo';
import FishDetailedChat from './FishDetailedChat';
import FishDetailedSidebar from './FishDetailedSidebar';

//make an interface with type that we can pass to our <RouteComponentProps>
//if we don't do this, match.params will not know what id is. which is what we are passing in the url
interface DetailParams{
    id: string
}
//use React.FC<RouteComponentProps> so that we get access to the match object that will have our fish id in it
//also bring in the history object to our destructured props. that way we can use it on the cancel button
const FishCaughtDetails: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const fishStore = useContext(FishStore);
    //destructure and rename selectedFish to fish
    const { fish, loadFish, loadingInitial } = fishStore
    
    //use useEffect to load our Fish on page load
    useEffect(() => {
        loadFish(match.params.id);
        //put the dependencies in below
    }, [loadFish, match.params.id, history])

    //if loadingInitial is true, or the fish is undefined, we will show the loading screen
    if(loadingInitial) return <LoadingComponent content='Loading fish...'/>
    
    //show not found h2 if there is no fish with the id sent to the server
    if(!fish)
        return<h2>Fish not found</h2>

    return (
        <Grid>
            <Grid.Column width={10}>
                <FishDetailedHeader fish={fish}/>
                <FishDetailedInfo fish={fish}/>
                <FishDetailedChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <FishDetailedSidebar/>
            </Grid.Column>
        </Grid>
    )
}


export default observer(FishCaughtDetails)