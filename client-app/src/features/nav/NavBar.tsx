import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'

export const NavBar = () => {
    return (
        <Menu fixed='top' inverted style={{backgroundColor: '#228b22'}}>
            <Container>
                <Menu.Item header>
                    <img src="/assets/flyFishingIcon.png" alt="logo" style={{marginRight: 10}}/>
                    Grantsburg Fishing Association
                </Menu.Item>
                <Menu.Item
                    name='Fish Feed'
                />
                <Menu.Item>
                    <Button positive content='Add Catch'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}
