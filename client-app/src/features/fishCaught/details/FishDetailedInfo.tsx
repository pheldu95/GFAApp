import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { IFish } from '../../../app/models/fish'
import { format } from "date-fns";


const FishDetailedInfo: React.FC<{fish: IFish}> = ({fish}) => {
    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="teal" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{"description"}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
              {/* format our date using date-fns. second argument is the format string. tells it how we want to format it. */}
              <span>
                {format(fish.caughtDate, "eeee do MMMM")}
                at
                {/* this format will just show the time. in 12 hour format. am/pm */}
                {format(fish.caughtDate, "h:mm a")}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="marker" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>
                {fish.latitude}, {fish.longitude}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
    );
}

export default FishDetailedInfo