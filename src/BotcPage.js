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
                <Typography style={{ fontSize: '1rem', alignSelf: 'flex-end' }}>{edition || 'ø'}</Typography>
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
        'outsider': 2,
        'minion': 3,
        'demon': 4,
        'traveler': 5,
    }[team]
}

export default function BotcPage() {
    let [showFilters, setShowFilters] = useState(false)
    let [sort, setSort] = useState('alphabetical')
    let [nameFilter, setNameFilter] = useState("");
    let [abilityFilter, setAbilityFilter] = useState("");
    let [reversed, setReversed] = useState(false)
    let [includeRoles, setIncludeRoles] = useState({
        'townsfolk': true,
        'minion': true,
        'demon': true,
        'outsider': true,
        'traveler': true,
    })
    let [includeEditions, setIncludeEditions] = useState({
        'tb': true,
        'bmr': true,
        'snv': true,
        'other': true,
    })

    let types = ['townsfolk', 'minion', 'demon', 'outsider', 'traveler']

    let editions = ['tb', 'bmr', 'snv', 'other']

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

    const preventScrollPropagation = (e) => {
        const element = e.target;
        if (
            (element.scrollTop === 0 && e.deltaY < 0) ||
            (element.scrollHeight - element.scrollTop === element.clientHeight && e.deltaY > 0)
        ) {
            e.preventDefault();
        }
    };

    useEffect(() => {
        const innerContainer = document.querySelector('.inner-container');
        innerContainer.addEventListener('wheel', preventScrollPropagation);

        return () => {
            innerContainer.removeEventListener('wheel', preventScrollPropagation);
        };
    }, []);


    let style = {
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        width: 'calc(100% - 2vh)',
        padding: '1vh',
        height: 'calc(98vh)',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
        touchAction: 'none',
        overscrollBehavior: 'none',
    }

    let characters = Object.values(Characters)

    characters = characters.filter(c => includeRoles[c.team])

    characters = characters.filter(c => includeEditions[c.edition || 'other'])

    if (sort === 'alphabetical') {
        characters.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === 'edition') {
        characters.sort((a, b) => editionSort(a.edition) - editionSort(b.edition))
    } else if (sort === 'team') {
        characters.sort((a, b) => teamSort(a.team) - teamSort(b.team))
    }

    function nameFilterSort(a, b) {
        let filterLower = nameFilter.toLowerCase()
        if (a.name.toLowerCase().startsWith(filterLower) && !b.name.toLowerCase().startsWith(filterLower)) {
            return -1
        } else if (!a.name.toLowerCase().startsWith(filterLower) && b.name.toLowerCase().startsWith(filterLower)) {
            return 1
        } else {
            return 0
        }
    }

    function abilityFilterSort(a, b) {
        let filterLower = abilityFilter.toLowerCase()
        if (a.ability.toLowerCase().startsWith(filterLower) && !b.ability.toLowerCase().startsWith(filterLower)) {
            return -1
        } else if (!a.ability.toLowerCase().startsWith(filterLower) && b.ability.toLowerCase().startsWith(filterLower)) {
            return 1
        } else {
            return 0
        }
    }

    if (reversed) {
        characters.reverse()
    }

    if (nameFilter) {
        characters = characters.filter(c => c.name.toLowerCase().includes(nameFilter.toLowerCase()))
        characters.sort((a, b) => nameFilterSort(a, b))
    }

    if (abilityFilter) {
        characters = characters.filter(c => c.ability.toLowerCase().includes(abilityFilter.toLowerCase()))
        characters.sort((a, b) => abilityFilterSort(a, b))
    }

    let buttonStyles = {
        padding: '0.5rem',
        minWidth: '3rem',
    }

    let selectedButtonStyle = {
        backgroundColor: 'blue',
        color: 'white',
        ...buttonStyles,
    }

    return (
        <div style={style} className="outer-container">
            {showFilters && <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                {sorts.map(s => (
                    <Button key={s} onClick={() => setSort(s)} style={sort === s ? selectedButtonStyle : buttonStyles}>{s}</Button>
                ))}
                <Button onClick={() => setReversed(!reversed)} style={buttonStyles}>Reverse sort</Button>
            </div>}
            {showFilters && <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                {types.map(t => (
                    <Button key={t} onClick={() => setIncludeRoles({ ...includeRoles, [t]: !includeRoles[t] })} style={includeRoles[t] ? selectedButtonStyle : {}}>{t}</Button>
                ))}
            </div>}
            {showFilters && <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                {editions.map(e => (
                    <Button key={e} onClick={() => setIncludeEditions({ ...includeEditions, [e]: !includeEditions[e] })} style={{ ...(includeEditions[e] ? selectedButtonStyle : {}), padding: '0.5rem', minWidth: '3rem' }}>{e}</Button>
                ))}
            </div>}
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }} className="inner-container">
                {showFilters && <TextField
                    label="Name"
                    value={nameFilter}
                    onChange={e => setNameFilter(e.target.value)}
                    style={{ maxWidth: '10rem' }}
                />}
                {showFilters && <TextField
                    label="Ability"
                    value={abilityFilter}
                    onChange={e => setAbilityFilter(e.target.value)}
                    style={{ maxWidth: '10rem' }}
                />}
                <Button onClick={() => setShowFilters(!showFilters)}>{showFilters ? 'Hide' : 'Show'}</Button>
            </div>
            <Grid container style={{ width: '100%', justifyContent: 'flex-start', overflow: 'auto', overscrollBehavior: 'contain' }} spacing={2}>
                {characters.map(c => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={c.id} style={{ marginBottom: '0.25rem' }}>
                        <Character id={c.id} name={c.name} team={c.team} ability={c.ability} edition={c.edition} />
                    </Grid>
                ))}
                <Grid item xs={12} style={{ height: '200px' }}></Grid>
            </Grid>
        </div>
    );
}