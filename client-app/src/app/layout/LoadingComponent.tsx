import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

//inverted and content are both optional. that's the ? meaning
export const LoadingComponent: React.FC<{inverted?: boolean, content?: string}> = ({inverted = true, content}) => {
    return (
        <Dimmer active inverted={inverted}>
            <Loader content={content} />
        </Dimmer>

    )
}
