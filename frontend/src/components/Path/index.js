import React, { useEffect, useState } from 'react';

import { Typography, ListItemText, ListItem, List } from '@material-ui/core';



import { LabelContainer, PathContainer, Container, SelectPath, SelectPathContainer } from './styles'
import ShowPath from '../ShowPath';


const Path = ({data, label}) => {

    const [labels, ]= useState(data.filter( dots => dots.label))
    const [selectedLabel, setSelectedLabel] = useState('')
    const [paths, setPaths] = useState([])
    const [shownPath, setShownPath] = useState([])
    const [indexPath, setIndexPath] = useState(0)

    // findParent(Number, Array)
    const findParent = (parent, array) => {
        if (parent === 1) return array
        else {
            let nextParent = data.find( segment => segment.child === parent )
            array.push(nextParent)
            findParent(nextParent.parent, array)
            return array
        }
        
    }
    
    const makePaths = labelClicked => {
        // get all paths that end up with this label
        const starts = labels.filter( item => item.label === labelClicked)

        // get the full paths
        const pathsToInclude = starts.map( startDot => {
            let array = [startDot]
            return findParent(startDot.parent, array)
        })
        return pathsToInclude
        
    }

    useEffect( () => {
        if(selectedLabel !== '') {
            let value = makePaths(selectedLabel).map( path => path.reverse())
            setPaths(value)
        }
        // eslint-disable-next-line
    }, [data, selectedLabel] )

    useEffect( () => {
        setIndexPath(0)
        setShownPath(paths[0])
    }, [paths])

    return(
        <Container>
            <LabelContainer>
                <Typography variant='h6' gutterBottom>
                    Results found
                </Typography>
                <List>
                    {labels.map( label => (
                        <ListItem button onClick={ () => setSelectedLabel(label.label)} key={label.label}>
                            <ListItemText primary={label.label} />        
                        </ListItem>
                    ))}

                </List>
            </LabelContainer>
            <PathContainer>
                <SelectPathContainer>
                    {paths.map( (thisPath, index) => 
                        <SelectPath 
                            onClick={() => {
                                setShownPath(paths[index])
                                setIndexPath(index)
                            }}
                            active={ index === indexPath ? true : false }
                        >{index+1}
                        </SelectPath>)}
                </SelectPathContainer>
                <ShowPath shownPath={shownPath} label={label}/>
                {selectedLabel}
            </PathContainer>

        </Container>
    )
}

export default Path