import React, { useContext } from 'react'
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';




const NavBar: React.FC = () => {
    //get access to user store
    const rootStore = useContext(RootStoreContext);
    const { isLoggedIn, user, logout } = rootStore.userStore;
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
                {/* only display this if the user is logged in */}
                {user &&
                    <Menu.Item position='right'>
                        {/* the image will be the user.image or the /assets/user.png if the user hasn't set their own image */}
                        <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
                        <Dropdown pointing='top left' text={user.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/profile/username`} text='My profile' icon='user' />
                                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                }
            </Container>
        </Menu>
    )
}

export default observer(NavBar)