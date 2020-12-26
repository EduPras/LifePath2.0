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
    },
    typography: {
        fontSize: 14,
        fontFamily: 'Raleway'
    },
})

export default theme