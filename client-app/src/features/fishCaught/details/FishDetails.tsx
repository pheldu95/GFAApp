import React, { useContext, useEffect } from 'react'
import { Card, Button } from 'semantic-ui-react'
import FishStore from "../../../app/stores/fishStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from 'react-router-dom';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';

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
    const { fish, openEditForm, cancelSelectedFish, loadFish, loadingInitial } = fishStore
    
    //use useEffect to load our Fish on page load
    useEffect(() => {
        loadFish(match.params.id)
    }, [loadFish, match.params.id])

    //if loadingInitial is true, or the fish is undefined, we will show the loading screen
    if(loadingInitial || !fish) return <LoadingComponent content='Loading fish...'/>
    
    return (
        <Card fluid>
            <Card.Content>
            <Card.Header>{fish!.fishTypeId}</Card.Header>
            <Card.Meta>
                <span></span>
            </Card.Meta>
            <Card.Description>
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button as={Link} to={`/manage/${fish.id}`} basic color='blue' content='Edit'/>
                    <Button onClick={() => history.push('/fishCaught')} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}


export default observer(FishCaughtDetails)