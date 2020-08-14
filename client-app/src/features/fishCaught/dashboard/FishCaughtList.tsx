import React, { SyntheticEvent } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { IFish } from '../../../app/models/fish';
import { observer } from "mobx-react-lite";

interface IProps {
    //in the props, we will be recieving an array called fishCaught of type IFish
    //from App.tsx
    fishCaught: IFish[]
    selectFish: (id: string) => void;
    deleteFish: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}
const FishCaughtList: React.FC<IProps> = ({ fishCaught, selectFish, deleteFish, submitting, target }) => {
    return (
      <Segment clearing>
        <Item.Group divided>
          {fishCaught.map((fish) => (
            <Item key={fish.id}>
              <Item.Content>
                <Item.Header as="a">
                  Fish Species: {fish.fishTypeId}
                </Item.Header>
                <Item.Meta>Date: {fish.caughtDate}</Item.Meta>
                <Item.Description>Length: {fish.length}</Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => selectFish(fish.id)}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  {/* loading flag only activates when the target matches the id of this button
                  and submitting is true. that way, clicking the button doesnt trigger every other buttons loading flag,
                  only it's own */}
                  <Button
                    name={fish.id}
                    loading={target === fish.id && submitting}
                    onClick={(e) => deleteFish(e, fish.id)}
                    floated="right"
                    content="Delete"
                    color="red"
                  />
                  <Label basic content="Species" />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    );
}


export default observer(FishCaughtList);