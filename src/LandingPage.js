import React from 'react';

import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Textfit } from 'react-textfit';

export default function LandingPage() {
    return (
        <div className="page-container" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100vh', // Full viewport height
            color: 'white', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap' 
        }}>
            {/* Title at the top center */}
            <Textfit mode="single" max={300} style={{ textAlign: 'center', width: '80%', marginTop: '20px' }}>
                Glyder Games
            </Textfit>

            {/* Container for the rest of the content */}
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', // Center alignment for children
                height: '100%', 
                width: '100%' 
            }}>
                <div style={{ height: '10vh' }}></div> {/* Spacer div */}

                {/* Centered Textfit content */}
                <Textfit mode="single" max={60} style={{ width: '80%', textAlign: 'center' }}>
                    We specialize in developing strategy and party games. More information to come soon!
                </Textfit>
                <br />
                <Textfit mode="single" max={100} style={{ width: '80%', textAlign: 'center' }}>
                    <Link to="/contact" style={{ color: 'white' }}>
                        Contact Us
                    </Link>
                </Textfit>
            </div>
        </div>
    );
}
