import { Config } from './Config';

const townsfolk = [
    ['Secret Police', 'Each night*, choose a player: they die.'],
    ['Conspiracy Theorist', 'Each night*, point to a number of players equal to the number of evil players. If you pointed to all evil players (including dead ones), good wins.'],
    ['Slayer', 'Once per game, during the day, publicly choose a player: if they are the Demon, they die.'],
    ['Prosecutor', 'If 5 or fewer players live, evil players you vote for die by execution.'],
    ["Mayor'", 'If only 3 players live and no player dies by execution, your team wins. If the Demon would kill you while a Minion is alive, a Minion dies instead.'],
    ["Empath'", 'Each night, you learn how many of your 2 alive neighbors are evil. The Secret Police registers as evil to you.'],
    ["Chambermaid'", 'Each night, choose 2 alive players (not yourself): you learn if at least one woke tonight due to their ability.'],
    ["Undertaker'", 'Each night*, learn which character was executed today.'],
    ['Inspector', 'Each night*, learn the character of a neighbor of the player who was executed.'],
    ['Monk', 'Each night*, choose a player (not yourself): they are safe from the Demon tonight.'],
    ["Soldier'", "You can't die at night."],
    ['Harborer', 'Your good neighbors are safe from the Secret Police.'],
    ["Ravenkeeper'", 'If the demon kills you, you are woken to choose a player: you learn their character.']
];

const outsiders = [
    ['Drunk', 'You do not know you are the Drunk. You think you are a Townsfolk character, but you are not.'],
    ['Recluse', 'You might register as evil & as a Minion or Demon, even if dead.'],
    ['Klutz', 'When you learn that you died, publicly choose 1 alive player: if they are evil, your team loses.'],
    ['Darling', 'If you die by execution or are killed by the Secret Police, one good neighbor is drunk from now on.']
];

const minions = [
    ['Venomancer', 'Once per game, at night, choose a player: they are poisoned for two days and two nights (counting this one).'],
    ['Infiltrator', 'You might register as good & as a Townsfolk or Outsider, even if dead.'],
    ['Tea Hag', "Your good neighbors can't die by execution."],
    ["Scarlet Woman'", 'You die when executed. If there are 5 or more players alive & the Demon dies, you become the Demon.']
];

const demons = [
    ['Azrael', 'Each night*, choose a player: they die. The first executed good player does not die.'],
    ['Ghast', 'Each night*, choose a player: they die. The first time a player chooses you at night, they are poisoned for one night.'],
    ['Fiend', 'Each night*, choose a player: they die. If you are executed and a Minion is alive, you die and a Minion becomes the Fiend.'],
    ['Moloch', 'Each night*, choose a player: they die. If a Minion died this way, they are woken to choose a player: that player is poisoned.']
];

const setupText = {
    'Tea Hag': '+1 Outsider',
    'Infiltrator': '+1 Outsider'
};

const highlightedCharacters = [
    'Secret Police'
];

const firstNightOrder = [
    'Evil wakes up',
    'Demon bluffs',
    'Venomancer',
    "Empath'",
    "Chambermaid'"
];

const otherNightOrder = [
    'Venomancer',
    'Secret Police',
    'Monk',
    'Demon',
    'Conspiracy Theorist',
    "Empath'",
    "Undertaker'",
    'Inspector',
    "Ravenkeeper'",
    "Chambermaid'"
];

const header = "Rules modifications: Evil players can't die by execution. There is always a Secret Police. Private conversations are permitted between living neighbors."

export const config = new Config({
    name: 'Circle of Whispers',
    townsfolk,
    outsiders,
    minions,
    demons,
    setupText,
    highlightedCharacters,
    header,
    firstNightOrder,
    otherNightOrder,
})