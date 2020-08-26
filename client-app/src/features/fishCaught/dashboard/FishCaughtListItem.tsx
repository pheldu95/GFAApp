import React, { useContext } from 'react'
import { Item, Button, Segment, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import FishStore from "../../../app/stores/fishStore";
import { IFish } from '../../../app/models/fish';

//React.FC<{fish: IFish}> is a way to give the component props without making an interface
const FishCaughtListItem: React.FC<{fish: IFish}> = ({fish}) => {
    const fishStore = useContext(FishStore);
    const { deleteFish, submitting, target } = fishStore;

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item key={fish.id}>
                        <Item.Content>
                            <Item.Header as="a">
                                Fish Species: {fish.fishTypeId}
                            </Item.Header>
                            <Item.Description>Length: {fish.length}</Item.Description>

                        </Item.Content>
                    </Item>
                </Item.Group>
                
            </Segment>
            <Segment>
                <Icon name='clock'/> {fish.caughtDate}
                <Icon name='marker' /> {fish.latitude}, {fish.longitude}
            </Segment>
            <Segment secondary>
                Maybe put fisherman's name?
            </Segment>
            <Segment clearing>
                maybe something here
                <span>
                    <Button
                        as={Link}
                        to={`/fishCaught/${fish.id}`}
                        floated="right"
                        content="View"
                        color="blue"
                    />
                </span>
            </Segment>
        </Segment.Group>
        
    )
}



export default FishCaughtListItem
