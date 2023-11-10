import React from 'react';

import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Textfit } from 'react-textfit';

export default function LandingPage() {
    return (
        <div className="page-container" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', justifyContent: 'center', color: 'white' , overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <Typography variant="h1">
                Glyder Games
            </Typography>
            <br />
            <br /> 
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />            
            <br />
            <br />
            <br />
            <br />
            <br />            
            <br />
            <br />
            <Textfit mode="single" max={60} style={{ width: '80%' }}>
                We specialize in developing strategy and party games. More information to come soon!
            </Textfit>
            <br /> 
            <Link to="/contact" style={{ color: 'white' }}>
                <Typography variant="h3">
                    Contact Us
                </Typography>
            </Link>
        </div>
    )
}