import React from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { IFish } from '../../../app/models/fish';

interface IProps {
    //in the props, we will be recieving an array called fishCaught of type IFish
    //from App.tsx
    fishCaught: IFish[]
    selectFish: (id: string) => void;


}
const FishCaughtList: React.FC<IProps> = ({ fishCaught, selectFish }) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {fishCaught.map(fish => (
                    <Item key={fish.id}>
                        <Item.Content>
                            <Item.Header as='a'>Fish Species: {fish.fishTypeId}</Item.Header>
                            <Item.Meta>Date: {fish.caughtDate}</Item.Meta>
                            <Item.Description>
                                Length: {fish.length}
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectFish(fish.id)} 
                                    floated='right' 
                                    content='View' 
                                    color='blue' 
                                />
                                <Label basic content='Species' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}


export default FishCaughtList;