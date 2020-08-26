import React, { useContext } from 'react'
import { Item, Button, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import FishStore from "../../../app/stores/fishStore";
import { IFish } from '../../../app/models/fish';

//React.FC<{fish: IFish}> is a way to give the component props without making an interface
const FishCaughtListItem: React.FC<{fish: IFish}> = ({fish}) => {
    const fishStore = useContext(FishStore);
    const { deleteFish, submitting, target } = fishStore;

    return (
        <Item key={fish.id}>
            <Item.Content>
                <Item.Header as="a">
                    Fish Species: {fish.fishTypeId}
                </Item.Header>
                <Item.Meta>Date: {fish.caughtDate}</Item.Meta>
                <Item.Description>Length: {fish.length}</Item.Description>
                <Item.Extra>
                    <Button
                        as={Link}
                        to={`/fishCaught/${fish.id}`}
                        floated="right"
                        content="View"
                        color="blue"
                    />
                    {/* loading flag only activates when the target matches the id of this button
                    and submitting is true. that way, clicking the button doesnt trigger every other buttons loading flag,
                    only it's own */}
                    <Label basic content="Species" />
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}



export default FishCaughtListItem

