import React from 'react'
import { Card } from './styles'
import IMykeys from '../../icons/KeyIcon'   
import IDatabase from '../../icons/DatabaseIcon'
import ICreate from '../../icons/New'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const CardComponent = ({text, color}) => {
    const useStyles = makeStyles({
        text:{
            fontWeight:'bold',
            marginTop: '10px',
            color: color
        }
    })
    const classes = useStyles();
    return(
        <>      
            <Card>
                {text === 'My keys' && <IMykeys color={color}/>}
                {text === 'Search in database' && <IDatabase color={color}/>}
                {text === 'Create new key' && <ICreate color={color}/>}
                <Box>
                    <Typography variant='h4' component='p' className={classes.text}>
                        {text}
                    </Typography>
                </Box>
            </Card>
        </>
    )
}

export default CardComponent