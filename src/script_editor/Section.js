import React from 'react';

export function Icon({ name, section }) {
    let machinized = name.toLowerCase().replace("'", '').replace(/ /g, '');
    let dimensions = ['Shade', 'Hades', 'Hexia', 'Beekeeper'].includes(name) ? '40px' : '60px';
    return ( 
        <div style={{ minWidth: '60px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
                className="icon" 
                style={{ width: dimensions, height: dimensions }} 
                src={`/assets/script_editor/${machinized}.png`}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `/assets/script_editor/default_${section.toLowerCase()}.png`;
                }}
                alt={name} 
            />
        </div>
    );
}

function Character({ name, description, setupText, highlighted, isEvil, icon, section, isMobile }) {
    const borderColor = highlighted ? (isEvil ? '#a31115' : '#0083bd') : 'transparent';
    
    return <div className="character" style={{
        display: 'flex',
        alignItems: 'center',
        padding: '2px',
        margin: '3px 0',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        border: highlighted ? `2px solid ${borderColor}` : 'none',
    }}>
        <Icon name={icon} section={section} />
        <h4 style={{ 
            minWidth: isMobile ? '70px' : '140px',
            margin: '0 10px',
            fontSize: isMobile ? '0.8em' : '1em',
            color: '#2c3e50'
        }}>{name}</h4>
        <p style={{
            margin: '5px',
            color: '#34495e',
            fontSize: isMobile ? '0.8em' : '1em',
        }}>
            {description}
            {setupText && <strong> [{setupText}]</strong>}
        </p>
    </div>
}

export function Header({ name }) {
    let color = ['Townsfolk', 'Outsiders', 'Minions', 'Demons'].includes(name) ? 'blue' : 'red';
    return (
        <div style={{
            width: '100%',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '6px 0',
            borderTop: `2px solid ${color}`,
            borderBottom: `2px solid ${color}`
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '0 20px',
                fontSize: '1.4em',
                fontWeight: 'bold', 
                color: '#2c3e50',
                textTransform: 'uppercase',
                letterSpacing: '2px'
            }}>
                {name}
            </div>
        </div>
    );
}

export default function Section({ name, characters, setupText, highlightedCharacters, icons, isMobile }) {
    const isEvil = name === 'Minions' || name === 'Demons';
    
    return <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        maxWidth: '1070px',
        gap: '0px'
    }}>
        <Header name={name} />
        {characters.map((character) => (
            <Character 
                key={character.name} 
                {...character} 
                setupText={setupText[character.name]}
                highlighted={highlightedCharacters.includes(character.name)}
                isEvil={isEvil}
                icon={icons[character.name] || character.name}
                section={name}
                isMobile={isMobile}
            />
        ))}
    </div>
}