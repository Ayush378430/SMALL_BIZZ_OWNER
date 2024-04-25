import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import ReviewsIcon from '@mui/icons-material/Reviews';
import StarRateIcon from '@mui/icons-material/StarRate';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
export const SidebarData=[
    {
        title:"Home",
        icon: <HomeIcon/>,
        link:"/home"
    },
    {
        title:"Transaction History",
        icon: <HistoryIcon/>,
        link:"/history"
    },
    {
        title:"View Reviews",
        icon: <ReviewsIcon/>,
        link:"/reviews"
    },
    {
        title:"Promo",
        icon: <StarRateIcon/>,
        link:"/promo"
    },
    {
        title:"Your Orders",
        icon: <LocalShippingIcon/>,
        link:"/orders"
    }

   
]