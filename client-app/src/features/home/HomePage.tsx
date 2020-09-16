import React from 'react'
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/flyFishingIcon.png' alt='logo' style={{ marginBottom: 12 }} />
                      Grantsburg Fishing Association
                  </Header>
                <Header as='h2' inverted content='Welcome to the GFA Fish Feed!' />
                <Button as={Link} to='/login' size='huge' inverted>
                   Login
                </Button>
            </Container>
        </Segment>
    )
}

export default HomePage;