import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';




const NavBar: React.FC = () => {
    return (
        <Menu fixed='top' inverted style={{backgroundColor: '#228b22'}}>
            <Container>
                {/* use the Link component but with the same styling as Menu.Item */}
                <Menu.Item header as={NavLink} exact to='/'>
                    <img src="/assets/flyFishingIcon.png" alt="logo" style={{marginRight: 10}}/>
                    Grantsburg Fishing Association
                </Menu.Item>
                <Menu.Item
                    name='Fish Feed'
                    as={NavLink}
                    to='/fishCaught'
                />
                <Menu.Item>
                    <Button as={NavLink} to='/createFish' positive content='Add Catch'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default observer(NavBar)