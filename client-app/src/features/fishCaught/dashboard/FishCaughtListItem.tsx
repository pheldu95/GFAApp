import React from 'react'
import { Item, Button, Segment, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { IFish } from '../../../app/models/fish';
import {format} from 'date-fns';

//React.FC<{fish: IFish}> is a way to give the component props without making an interface
const FishCaughtListItem: React.FC<{fish: IFish}> = ({fish}) => {
    // const fishStore = useContext(FishStore);
    // const { deleteFish, submitting, target } = fishStore;

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
            {/* use date-fns to format our caughtDate
            the second argument is our format string */}
          <Icon name="clock" /> {format(fish.caughtDate, 'h:mm a')}
          <Icon name="marker" /> {fish.latitude}, {fish.longitude}
        </Segment>
        <Segment secondary>Maybe put fisherman's name?</Segment>
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
    );
}



export default FishCaughtListItem

