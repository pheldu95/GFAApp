import React, { useContext } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import FishStore from '../../app/stores/fishStore';
import { observer } from 'mobx-react-lite';




const NavBar: React.FC = () => {
    const fishStore = useContext(FishStore);
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
                    <Button onClick={fishStore.openCreateForm} positive content='Add Catch'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default observer(NavBar)