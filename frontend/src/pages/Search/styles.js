import styled from 'styled-components'
import COLORS from '../../constants/colors'
import css from '../../constants/cssProperties'
import { makeStyles } from '@material-ui/core/styles'
import theme from '../../theme/provider'

export const useStyles = makeStyles({
    username: {
        fontWeight: 'bold',
        fontSize: '0.9rem'
    },
    card: {
        boxShadow: '0px 2px 8px 1px rgb(0 0 0 / 22%), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        padding: '20px',
        position: 'relative',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        position: 'absolute',
        right: '20px',
        top: '20px',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    title: {
        fontWeight: 'bold',
    },
    label: {
        fontWeight: 500,
        fontStyle: 'italic'
    },
    box: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        color: 'white',
        fontWeight: 'bold'
    }
    
  });

export const ContainerSearch = styled.div`
    width: ${css.maxWidthContainer};
    margin: auto;
`
export const SearchList = styled.ul`
    display:flex;
    flex-direction:column;
    padding: 0;
    gap: 10px;
    margin-top: 50px;
`
export const Title = styled.div`
    display:flex;
    max-width:fit-content;
    padding-right: 30px;
    flex-direction: column;
    align-items:flex-start;
    border-right: 2px solid ${COLORS.lightGray};
`
export const TitleContainer = styled.div`
    display:flex;
    min-width: 40%;
`
export const FoundLabels = styled.ul`
    margin-right: 20px;
    gap: 10px;
    display:flex;
    flex-wrap: wrap;
    align-items: flex-end;
`
export const Label = styled.li`
    background-color: ${COLORS.lightGray};
    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    list-style: none;
    font-size: 0.9rem;
    padding: 5px 15px;
    border-radius: 5px;
`
export const Container = styled.div`
    display: flex;
    justify-content: space-between;
`