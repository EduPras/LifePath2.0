import React, { useState, useEffect } from 'react'

import ShowPath from '../../components/ShowPath'

import { Circle, Sentence, ExploreContainer, ShowContainer } from './styles'
import { Box, Typography } from '@material-ui/core'

const Explore = ({ data }) => {
    const [currentKey, setCurrentKey] = useState(1)
    const [next, setNext] = useState([])
    const [path, setPath] = useState([{sentence:'1'}])
    const [labelFound, setLabelFound] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(-1)

    useEffect( () => {
        let newNext = data.filter( dot => dot.parent === currentKey)
        console.log(newNext)
        setNext(newNext)
    }, [currentKey] )

    const handleNext = (segment, index) => {    
        if (isButtonDisabled !== -1){
            path.pop()
            setPath(path)
        }           
        if(segment.label) {
            if(path[path.length-1].sentence !== segment.label){
                setLabelFound(segment.label)                
            }
            setIsButtonDisabled(index)
        }
        else {
            setIsButtonDisabled(-1)
            setCurrentKey(segment.child)
            setLabelFound('') 
        }
        setPath([...path, {sentence: segment.sentence}]) 
    }


    const handleBackKey = index => {
        if(index !== path.length-1){
            setCurrentKey(index+1)
            setPath(path.slice(0, index+1))
            setLabelFound('')
            setIsButtonDisabled(-1)
        }       
    }

    return(
        <Box
            height='800px'
            justifyContent='space-evenly' 
            display='flex' >
            <ExploreContainer>
                <Circle>{currentKey}</Circle>
                {next.map( (sentence, index) => 
                    <Sentence 
                        disabled={isButtonDisabled === index && true}
                        onClick={() => handleNext(sentence, index)}>
                        {sentence.sentence}
                    </Sentence>
                    )}
            </ExploreContainer>
            <ShowContainer>
                <ShowPath shownPath={path} clickable={true} handleClick={handleBackKey}/>
                <Typography variant='h4' style={{textAlign: 'center'}}>
                    {labelFound}
                </Typography>
            </ShowContainer>
        </Box>
    )
}

export default Explore