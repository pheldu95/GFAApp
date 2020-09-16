import React, { Fragment, useContext } from 'react'
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { RootStoreContext } from '../../app/stores/rootStore'

const HomePage = () => {
    //get access to our userStore
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn, user} = rootStore.userStore;
    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/flyFishingIcon.png' alt='logo' style={{ marginBottom: 12 }} />
                      Grantsburg Fishing Association
                  </Header>
                  {/* if the user is logged in, then we will have a Fish Feed button instead of a login button */}
                  {isLoggedIn && user ?
                    (<Fragment>
                        <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
                        <Button as={Link} to='/fishCaught' size='huge' inverted>
                           Go to the Fish Feed
                        </Button>
                    </Fragment>
                    ) : (
                        //if they aren't logged in, we display this instead
                        <Fragment>
                            <Header as='h2' inverted content='Welcome to the GFA Fish Feed!' />
                            <Button as={Link} to='/login' size='huge' inverted>
                                Login
                             </Button>
                            <Button as={Link} to='/register' size='huge' inverted>
                                Register
                             </Button>
                        </Fragment>
                    )
                  }
                
            </Container>
        </Segment>
    )
}

export default HomePage;