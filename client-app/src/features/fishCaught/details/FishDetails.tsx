import React, { useContext } from 'react'
import { Card, Button } from 'semantic-ui-react'
import { IFish } from '../../../app/models/fish'
import FishStore from "../../../app/stores/fishStore";
import { observer } from "mobx-react-lite";


interface IProps {
    setEditMode: (editMode: boolean) => void;
    setSelectedFish: (fish: IFish | null) => void;
}
const FishCaughtDetails: React.FC<IProps> = ({ 
    setEditMode,
    setSelectedFish
 }) => {
    const fishStore = useContext(FishStore);
    //destructure and rename selectedFish to fish
    const {selectedFish: fish} = fishStore
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
                    <Button onClick={() => setEditMode(true)} basic color='blue' content='Edit'/>
                    <Button onClick={() => setSelectedFish(null)} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}


export default observer(FishCaughtDetails)