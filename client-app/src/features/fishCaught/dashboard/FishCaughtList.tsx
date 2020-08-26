import React, { useContext, Fragment } from 'react'
import { Item, Segment, Label } from 'semantic-ui-react'
import { observer } from "mobx-react-lite";
import FishStore from "../../../app/stores/fishStore";
import FishCaughtListItem from './FishCaughtListItem';

const FishCaughtList: React.FC = () => {
    const fishStore = useContext(FishStore);
    const { fishCaughtByDate } = fishStore;
    return (
      <Fragment>
        {fishCaughtByDate.map(([group, fishCaught]) => (
          <Fragment key={group}>
            <Label size='large' color='blue'>
              {group}
            </Label>
            <Segment clearing>
              <Item.Group divided>
                {fishCaught.map((fish) => (
                  <FishCaughtListItem key={fish.id} fish={fish} />
                ))}
              </Item.Group>
            </Segment>
          </Fragment>
          
        ))}
      </Fragment>
      
    );
}


export default observer(FishCaughtList);