import { Characters } from './BotcCharacters.js';
import { useState, useEffect } from 'react';
import { Typography, Button, Grid, TextField } from '@material-ui/core';

function getColor(team) {
    return {
        'townsfolk': 'rgb(0, 100, 255)',
        'demon': 'rgba(150, 0, 0)',
        'minion': 'rgb(128, 0, 128)',
        'outsider': 'rgb(0, 128, 0)',
        'traveler': 'black',
    }[team.toLowerCase()]
}

const Character = ({ id, name, team, ability, edition }) => {
    let nameStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    }
    
    let style = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: getColor(team),
        padding: '0.5rem',
        borderRadius: '0.5rem',
        height: '100%',
    }

    return (
        <div key={id} style={style}>
            <div style={{
                display: 'flex',
                alignItems: 'baseline',
            }}>
                <Typography style={nameStyle}>{name}</Typography>
            </div>
            <Typography style={{ fontSize: '1rem', height: '100%' }}>{ability}</Typography>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                width: '100%', 
                marginTop: 'auto',
                fontSize: '0.8rem',
                fontStyle: 'italic',
            }}>
                <Typography style={{ fontSize: '1rem', alignSelf: 'flex-start' }}>{team}</Typography>
                <Typography style={{ fontSize: '1rem', alignSelf: 'flex-end' }}>{edition || ''}</Typography>
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
    let [filter, setFilter] = useState("");
    let [reversed, setReversed] = useState(false)
    let [include, setInclude] = useState({
        'townsfolk': true,
        'minion': true,
        'demon': true,
        'outsider': true,
        'traveler': true,
    })

    let types = ['townsfolk', 'minion', 'demon', 'outsider', 'traveler']

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
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        width: 'calc(100% - 2rem)',
        minHeight: 'calc(100vh - 2rem)',
        padding: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
    }

    let characters = Object.values(Characters)

    characters = characters.filter(c => include[c.team])

    if (sort === 'alphabetical') {
        characters.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === 'edition') {
        characters.sort((a, b) => editionSort(a.edition) - editionSort(b.edition))
    } else if (sort === 'team') {
        characters.sort((a, b) => teamSort(a.team) - teamSort(b.team))
    }

    function filterSort(a, b) {
        let filterLower = filter.toLowerCase()
        if (a.name.toLowerCase().startsWith(filterLower) && !b.name.toLowerCase().startsWith(filterLower)) {
            return -1
        } else if (!a.name.toLowerCase().startsWith(filterLower) && b.name.toLowerCase().startsWith(filterLower)) {
            return 1
        } else {
            return 0
        }
    }
    if (reversed) {
        characters.reverse()
    }

    if (filter) {
        characters = characters.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
        characters.sort((a, b) => filterSort(a, b))
    }

    let selectedButtonStyle = {
        backgroundColor: 'blue',
        color: 'white',
    }

    return (
        <div style={style}>
            <div style={{ marginBottom: '1rem' }}>
                {sorts.map(s => (
                    <Button key={s} onClick={() => setSort(s)} style={sort === s ? selectedButtonStyle : {}}>{s}</Button>
                ))}
                <Button onClick={() => setReversed(!reversed)}>Reverse sort</Button>
            </div>
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                {types.map(t => (
                    <Button key={t} onClick={() => setInclude({ ...include, [t]: !include[t] })} style={include[t] ? selectedButtonStyle : {}}>{t}</Button>
                ))}
            </div>
            <div style={{ marginBottom: '1rem' }}>  
                <TextField
                    label="Filter"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />
            </div>
            <Grid container style={{ width: '100%', justifyContent: 'flex-start' }} spacing={2}>
                {characters.map(c => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={c.id} style={{ marginBottom: '1rem' }}>
                        <Character id={c.id} name={c.name} team={c.team} ability={c.ability} edition={c.edition} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}