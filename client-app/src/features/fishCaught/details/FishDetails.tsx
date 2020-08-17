import React, { useContext } from 'react'
import { Card, Button } from 'semantic-ui-react'
import FishStore from "../../../app/stores/fishStore";
import { observer } from "mobx-react-lite";

const FishCaughtDetails: React.FC = () => {
    const fishStore = useContext(FishStore);
    //destructure and rename selectedFish to fish
    const {selectedFish: fish, openEditForm, cancelSelectedFish} = fishStore
    return (
        <Card fluid>
            <Card.Content>
            <Card.Header>{fish!.fishTypeId}</Card.Header>
            <Card.Meta>
                <span></span>
            </Card.Meta>
            <Card.Description>
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button onClick={() => openEditForm(fish!.id)} basic color='blue' content='Edit'/>
                    <Button onClick={cancelSelectedFish} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}


export default observer(FishCaughtDetails)