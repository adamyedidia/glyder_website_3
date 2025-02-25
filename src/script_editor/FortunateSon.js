import { Config } from './Config';

const townsfolk = [
    ['Enumerator', 'You start knowing three characters, of which exactly one is in play.'],
    ['Grandfather', 'You start knowing an in play character. They cannot die.'],
    ['Chambermaid', 'Each night, choose two alive players: learn if at least one woke tonight due to their ability.'],
    ['Prankster', 'Each night, choose two alive players; learn if at least one might not die if executed.'],
    ['Mortician', 'Each night*, choose a character; learn if any dead player has that character.'],
    ['Monk', 'Each night*, choose a player; they are safe from the Demon tonight.'],
    ['Reveler', 'Each night*, you may choose to die. If you die this way, evil players are drunk tonight and tomorrow day.'],
    ['Vigilante', 'Once per game, at night*, choose a player; they die.'],
    ['Shahrazad', 'Once per game, during the day, privately make any statement to the storyteller (they may reject it). Each night, if it is true, die.'],
    ['Inquisitor', 'Once per game, publicly guess a player\'s character. If correct, they die tonight. Otherwise, you die tonight.'],
    ['Zeppelineer', 'If the Demon kills you, keep choosing players (not yourself) until you\'ve chosen two players that share a character type.'],
    ['Tea Lady', 'If both your alive neighbors are good, they can\'t die.'],
    ['Peacekeeper', 'The second good player who is executed does not die.'],
];

const outsiders = [
    ['Ogre', 'On your 1st night, choose a player (not yourself): you become their alignment (you don\'t know which) even if drunk or poisoned.'],
    ['Drunk', 'You do not know you are the Drunk. You think you are a Townsfolk character, but you are not.'],
    ['Beekeeper', 'If you die at night, one of your living neighbors dies as well.'],
    ['Stylist', 'If you died today or tonight, the demon learns all evil characters in play and can reassign them amongst evil players.'],
];

const minions = [
    ['Evil Philosopher', 'Once per game, at night, choose a good character: gain that ability. If this character is in play, they are drunk. You cannot become good.'],
    ['Specter', 'Once per game, at night*, if you\'re dead, choose a player: they die.'],
    ['Demon\'s Advocate', 'The first time the demon would die, they don\'t.'],
    ['Mad Scientist', 'Evil players might die at any time.'],
];

const demons = [
    ['Shade', 'Each night*, choose a player; they die. After, you may choose to become a new demon.'],
    ['Hades', 'Each night*, choose a player; they die. If no dead players voted for you, you do not die when executed. Once per game, a good player might survive execution (helping evil).'],
    ['Hexia', 'Each night*, choose three players; for each of them, if they are cursed, they die. Otherwise, they become cursed.'],
    ['Moriarty', 'Each night*, choose a player; they die. Once per game, at night: if you die by execution tomorrow while 5 or more players live, a living neighbor swaps characters with you and becomes evil.'],
];

const setupText = {
    'Mad Scientist': '+1 outsider'
}

const firstNightOrder = [
    "Evil wakes up",
    "Demon bluffs",
    "Ogre",
    "Evil Philosopher",
    "Moriarty",
    "Enumerator",
    "Grandfather",
    "Prankster",
    "Chambermaid"
]

const otherNightOrder = [
    "Stylist",
    "Reveler",
    "Inquisitor",
    "Evil Philosopher",
    "Monk",
    "Specter",
    "Demon",
    "Vigilante",
    "Shahrazad",
    "Mortician",
    "Zeppelineer",
    "Prankster",
    "Chambermaid"
]

const icons = {
    // "Grandfather": "Enumerator",
}

export const config = new Config({
    name: "Fortunate Son",
    townsfolk,
    outsiders,
    minions,
    demons,
    setupText,
    firstNightOrder,
    otherNightOrder,
    icons
})