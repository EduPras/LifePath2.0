import { COLORS } from './colors'
import { getUser } from '../services/api'
export const LABELS = [
    {
        color: COLORS.purple,
        text: "My keys",
        href: {pathname:'/search', state: getUser()},
    },
    {
        color: COLORS.orange,
        text: "Search in database",
        href: '/search'
    },
    {
        color: COLORS.blueGreen,
        text: "Create new key",
        href: '/create'
    },
]
