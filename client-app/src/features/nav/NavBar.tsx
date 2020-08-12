import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'

interface IProps{
    //will be receiving a function that takes no parameters and returns void, called openCreateForm
    openCreateForm: () => void;
}

export const NavBar: React.FC<IProps> = ({openCreateForm}) => {
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
                    <Button onClick={openCreateForm} positive content='Add Catch'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}
