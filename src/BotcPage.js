import { Characters } from './BotcCharacters.js';
import { useState, useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';

function getColor(team) {
    return {
        'townsfolk': 'rgb(0, 100, 255)',
        'minion': 'rgb(255, 0, 0)',
        'demon': 'rgb(128, 0, 128)',
        'outsider': 'rgb(0, 128, 0)'
    }[team.toLowerCase()]
}

function getStyle(team) {
    return {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginRight: '0.5rem',
        textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        whiteSpace: 'nowrap',
    }
}

const Character = ({ id, name, team, ability }) => {
    let nameStyle = getStyle(team)

    let style = {
        display: 'flex',
        alignItems: 'flex-start',
        backgroundColor: getColor(team),
        padding: '0.5rem',
        borderRadius: '0.5rem',
    }

    return (
        <div key={id} style={style}>
            <div style={{
                display: 'flex',
                alignItems: 'baseline',
            }}>
                <Typography style={nameStyle}>{name}</Typography>
                <Typography style={{ fontSize: '1rem' }}>{ability}</Typography>
            </div>
        </div>
    );
}

function editionSort(edition) {
    return {
        'tb': 1,
        'bmr': 2,
        'snv': 3,
    }[edition] || 4
}

function teamSort(team) {
    return {
        'townsfolk': 1,
        'minion': 2,
        'demon': 3,
        'outsider': 4,
        'traveler': 5,
    }[team]
}

export default function BotcPage() {
    let [sort, setSort] = useState('alphabetical')
    let [include, setInclude] = useState({
        'townsfolk': true,
        'minion': true,
        'demon': true,
        'outsider': true,
        'traveler': true,
    })

    let sorts = [
        'alphabetical',
        'edition',
        'team'
    ]

    useEffect(() => {
        document.body.classList.add('botc');

        return () => {
            document.body.classList.remove('botc');
        };
    }, []);

    let style = {
        color: 'white',
        // margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
    }

    let characters = Object.values(Characters)

    if (sort === 'alphabetical') {
        characters.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === 'edition') {
        characters.sort((a, b) => teamSort(a.team) - teamSort(b.team))
    } else if (sort === 'team') {
        characters.sort((a, b) => teamSort(a.team) - teamSort(b.team))
    }

    return (
        <div style={style}>
            <h1>BotC</h1>
            {sorts.map(s => (
                <Button onClick={() => setSort(s)}>{s}</Button>
            ))}
            {characters.map(c => (
                <Character key={c.id} id={c.id} name={c.name} team={c.team} ability={c.ability} />
            ))}
        </div>
    );
}