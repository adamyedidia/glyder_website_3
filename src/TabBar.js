import { Link } from 'react-router-dom';
import { Tabs, Tab, makeStyles, useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    tabs: {
      width: 'min(max(60%, 100vh), 100%)',
      marginBottom: '20px',
      position: 'relative',
      zIndex: 1000,
    },
    tab: {
      minWidth: '25%',
      fontSize: '1.4rem',
    },
}));
 

export default function TabBar({ isSmallScreen , value, setValue }) {
    let classes = useStyles();

    return (
        <Tabs
            value={value}
            onChange={() => {}}
            centered
            className={classes.tabs}
            variant="fullWidth"
        >
            <Tab label="About Us" component={Link} to="/" className={classes.tab} style={{ fontSize: isSmallScreen ? '0.9rem' : '1.4rem'  }}/>
            <Tab label="Our Games" component={Link} to="/games" className={classes.tab} style={{ fontSize: isSmallScreen ? '0.9rem' : '1.4rem' }}/>
            <Tab label="Arcade" component={Link} to="/arcade" className={classes.tab} style={{ fontSize: isSmallScreen ? '0.9rem' : '1.4rem' }}/>
            <Tab label="Contact" component={Link} to="/contact" className={classes.tab} style={{ fontSize: isSmallScreen ? '0.9rem' : '1.4rem' }}/>
        </Tabs>
    );
}