import React from 'react'
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react'
import { IFish } from '../../../app/models/fish';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { format } from "date-fns";


const fishImageStyle = {
    filter: 'brightness(30%)'
};

const fishImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const FishDetailedHeader: React.FC<{fish: IFish}> = ({fish}) => {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={'/assets/placeholder.png'} style={fishImageStyle}/>
                <Segment basic style={fishImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content= {`Fish: ${fish.fishTypeId}`}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(fish.caughtDate, 'eeee do MMMM')}</p>
                                <p>
                                    Caught by <strong>{fish.fisherId}</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/manage/${fish.id}`} color='orange' floated='right'>
                    Edit Info
                </Button>
            </Segment>
        </Segment.Group>
    )
}

export default observer(FishDetailedHeader)