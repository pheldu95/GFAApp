import React, { useContext, Fragment } from 'react'
import { Item, Label } from 'semantic-ui-react'
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
            <Item.Group divided>
              {fishCaught.map((fish) => (
                <FishCaughtListItem key={fish.id} fish={fish} />
              ))}
            </Item.Group>
          </Fragment>
          
        ))}
      </Fragment>
      
    );
}


export default observer(FishCaughtList);