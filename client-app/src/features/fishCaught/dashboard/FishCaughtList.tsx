import React, { useContext, Fragment } from 'react'
import { Item, Divider, Header } from 'semantic-ui-react'
import { observer } from "mobx-react-lite";
import FishCaughtListItem from './FishCaughtListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import {format} from 'date-fns';

const FishCaughtList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { fishCaughtByDate } = rootStore.fishStore;
    return (
      
      <Fragment>
        {fishCaughtByDate.map(([group, fishCaught]) => (
          <Fragment key={group}>
            <Divider horizontal>
              <Header as='h4'>
                {/* formatting our date */}
                {format(group, 'eeee do MMMM')}
              </Header>
            </Divider>
            {/* <Label size='large' color='blue'>
              {group}
            </Label> */}
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