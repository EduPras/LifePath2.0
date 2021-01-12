import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { COLORS } from '../../constants/colors';

export const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(COLORS.rustyRed),
      backgroundColor: COLORS.rustyRed,
      '&:hover': {
        backgroundColor: COLORS.rustyRed,
      },
    },
  }))(Button);