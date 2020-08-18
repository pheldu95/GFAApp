import React, { useContext } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { observer } from "mobx-react-lite";
import FishStore from "../../../app/stores/fishStore";
import { Link } from 'react-router-dom';

const FishCaughtList: React.FC = () => {
    const fishStore = useContext(FishStore);
    const { fishCaughtByDate, deleteFish, submitting, target} = fishStore;
    return (
      <Segment clearing>
        <Item.Group divided>
          {fishCaughtByDate.map((fish) => (
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
                  <Button
                    name={fish.id}
                    loading={target === fish.id && submitting}
                    onClick={(e) => deleteFish(fish.id, e)}
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