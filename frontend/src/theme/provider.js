import { createMuiTheme } from '@material-ui/core/styles'
import COLORS from '../constants/colors'

const theme = createMuiTheme( {
    palette: {
        primary: {
            main: COLORS.primary
        },
        secondary: {
            main: COLORS.secondary
        },
        white: {
            main: COLORS.white
        }
    },
    typography: {
        fontSize: 16,
        fontFamily: 'Raleway'
    },
})

export default theme