import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import { IFish } from '../../../app/models/fish'

interface IProps {
    fish: IFish;
    setEditMode: (editMode: boolean) => void;
    setSelectedFish: (fish: IFish | null) => void;
}
const FishCaughtDetails: React.FC<IProps> = ({ 
    fish, 
    setEditMode,
    setSelectedFish
 }) => {
    return (
        <Card fluid>
            <Card.Content>
            <Card.Header>{fish.fishTypeId}</Card.Header>
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


export default FishCaughtDetails