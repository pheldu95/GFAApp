import React from 'react';
import { Segment, Button, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

//our not found page that will be displayed to the user if they get a 404
const NotFound = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                        Oops - we've looked everywhere but couldn't find this.
                    </Header>
            <Segment.Inline>
                <Button as={Link} to='/fishCaught' primary>
                    Return to Fish Feed
                        </Button>
            </Segment.Inline>
        </Segment>
    );
};

export default NotFound;  