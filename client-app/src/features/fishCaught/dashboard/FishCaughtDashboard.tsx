import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { IFish } from '../../../app/models/fish';

interface IProps {
    //in the props, we will be recieving an array called fishCaught of type IFish
    //from App.tsx
    fishCaught: IFish[]
}

//in order to use our IProps interface, we need to give our dashboard a type
//the type we give it is React.FC. Then we can pass our IProps using <IProps>
// using curly brackets, we can destrucutre our props. so we don't have to say props.fishCaught
//just pass {fishCaught} into the function instead of props
export const FishCaughtDashboard: React.FC<IProps> = ({fishCaught}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <List>
                    {fishCaught.map((fish) => (
                        <List.Item key={fish.id}>{fish.latitude}, {fish.longitude}</List.Item>
                    ))}
                </List>
            </Grid.Column>
        </Grid>
    )
}
