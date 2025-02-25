import React from 'react';

import DrDuckResponsesImg from './assets/blog/dr_duck_responses.png';
import PoseidonResponsesImg from './assets/blog/poseidon_responses.png';

import PoseidonVeryHappy from './assets/poseidon_very_happy.png';
import EvilMorphyVeryHappy from './assets/evil_morphy_very_happy.png';
import AlienVeryHappy from './assets/alien_very_happy.png';
import SimonHappy from './assets/simon_happy.png';
import MushroomKingHappy from './assets/mushroom_king_happy.png';
import DracoDetermined from './assets/draco_determined.png';
import ElderSquidDetermined from './assets/elder_squid_determined.png';
import PlagueDoctorSad from './assets/plague_doctor_sad.png';
import LilMonstaVerySad from './assets/lil_monsta_very_sad.png';
import KarateMasterVerySad from './assets/karate_master_very_sad.png';
import DrDuckVerySad from './assets/dr_duck_very_sad.png';

import { Typography, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function BlogPage() {
    return (
        <ThemeProvider theme={darkTheme}>
            <div style={{
                background: 'linear-gradient(to bottom right, #333388, #222255)'
            }}>
                <Grid container direction="column" alignItems="center" justifyContent="center" sx={{
                    overflowY: 'auto',
                }}>
                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))', marginTop: 'calc(1.2*var(--vss))' }}>
                        <Typography style={{ fontSize: 'calc(2*var(--vss))', color: 'white' }}>Update 1.0.3</Typography>
                    </Grid>
                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))', overflowY: 'hidden' }}>
                        <Grid container direction="row" alignItems="center" justifyContent="center">
                            <Grid item sx={{ marginRight: 'calc(1*var(--vss))' }}>
                                <img src={PoseidonVeryHappy} style={{ width: 'calc(7*var(--vss))' }} />
                            </Grid>
                            <Grid item sx={{ marginRight: 'calc(1*var(--vss))' }}>
                                <img src={EvilMorphyVeryHappy} style={{ width: 'calc(7*var(--vss))' }} />
                            </Grid>
                            <Grid item sx={{ marginRight: 'calc(1*var(--vss))' }}>
                                <img src={AlienVeryHappy} style={{ width: 'calc(7*var(--vss))' }} />
                            </Grid>
                            <Grid item sx={{ marginRight: 'calc(1*var(--vss))' }}>
                                <img src={SimonHappy} style={{ width: 'calc(7*var(--vss))' }} />
                            </Grid>
                            <Grid item sx={{ marginRight: 'calc(1*var(--vss))' }}>
                                <img src={MushroomKingHappy} style={{ width: 'calc(7*var(--vss))' }} />
                            </Grid>
                            <Grid item sx={{ marginRight: 'calc(1*var(--vss))' }}>
                                <img src={DracoDetermined} style={{ width: 'calc(7*var(--vss))' }} />
                            </Grid>
                            <Grid item sx={{ marginRight: 'calc(1*var(--vss))' }}>
                                <img src={ElderSquidDetermined} style={{ width: 'calc(7*var(--vss))' }} />
                            </Grid>
                            <Grid item sx={{ marginRight: 'calc(1*var(--vss))' }}>
                                <img src={PlagueDoctorSad} style={{ width: 'calc(7*var(--vss))' }} />
                            </Grid>
                            <Grid item sx={{ marginRight: 'calc(1*var(--vss))' }}>
                                <img src={LilMonstaVerySad} style={{ width: 'calc(7*var(--vss))' }} />
                            </Grid>
                            <Grid item sx={{ marginRight: 'calc(1*var(--vss))' }}>
                                <img src={KarateMasterVerySad} style={{ width: 'calc(7*var(--vss))' }} />
                            </Grid>
                            <Grid item sx={{ marginRight: 'calc(1*var(--vss))' }}>
                                <img src={DrDuckVerySad} style={{ width: 'calc(7*var(--vss))' }} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))' }}>
                        <Typography style={{ fontSize: 'calc(1.5*var(--vss))', color: 'white' }}>
                            Big balance changes + the Rank the Bosses challenge!
                        </Typography>
                    </Grid>

                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))' }}>
                        <Typography style={{ fontSize: 'calc(1.2*var(--vss))', maxWidth: 'calc(50*var(--vss))', color: 'white' }}>
                            First things first: the Rank the Bosses challenge is complete! 72 of you submitted your rankings for which bosses were
                            easiest and which were hardest. And thanks to the run data that many of you agreed to send in (thank you!) we now can
                            answer the question objectively—with data!
                        </Typography>
                    </Grid>
                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))' }}>
                        <Typography style={{ fontSize: 'calc(1.2*var(--vss))', maxWidth: 'calc(50*var(--vss))', color: 'white' }}>
                            <b>The three winners are:</b>
                            <br />
                            Anthony Grebe (1st place)
                            <br />
                            Iwer Sonsch (tied for 2nd place)
                            <br />
                            Demonic Emperor (tied for 2nd place)
                        </Typography>
                    </Grid>
                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))' }}>
                        <Typography style={{ fontSize: 'calc(1.2*var(--vss))', maxWidth: 'calc(50*var(--vss))', color: 'white' }}>
                            Overall, I'm quite proud of how much disagreement there was among players to which bosses were toughest! Just about every boss
                            had a pretty widespread impression of how tough it was. Every boss, that is, except one: Dr. Duck.
                        </Typography>
                    </Grid>
                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))' }}>
                        <img src={DrDuckResponsesImg} style={{ width: 'calc(50*var(--vss))' }} />
                    </Grid>
                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))' }}>
                        <Typography style={{ fontSize: 'calc(1.2*var(--vss))', maxWidth: 'calc(50*var(--vss))', color: 'white' }}>
                            Poor Dr. Duck! Is she being unfairly maligned? Let's look at the data:
                        </Typography>
                    </Grid>
                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))' }}>
                        <Typography style={{ fontSize: 'calc(1.2*var(--vss))', maxWidth: 'calc(50*var(--vss))', color: 'white' }}>
                            Player win rates by boss type (Higher percentage means the boss is easier):
                            <br />
                            Dr. Duck: 84.15% (sample size: 631)
                            <br />
                            Karate Master: 81.40% (sample size: 860)
                            <br />
                            Lil Monsta: 79.60% (sample size: 848)
                            <br />
                            Plague Doctor: 78.29% (sample size: 843)
                            <br />
                            Elder Squid: 77.93% (sample size: 870)
                            <br />
                            Draco: 75.17% (sample size: 580)
                            <br />
                            Mushroom King: 73.40% (sample size: 842)
                            <br />
                            Simon: 71.99% (sample size: 821)
                            <br />
                            Alien: 71.66% (sample size: 875)
                            <br />
                            Evil Morphy: 70.89% (sample size: 821)
                            <br />
                            Poseidon: 70.20% (sample size: 859)
                        </Typography>
                    </Grid>
                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))' }}>
                        <Typography style={{ fontSize: 'calc(1.2*var(--vss))', maxWidth: 'calc(50*var(--vss))', color: 'white' }}>
                            Players were right on the money about Dr. Duck! There was a lot less understanding of how tough Poseidon was, though. Looks like players haven't yet learned to fear the power of the tides...
                        </Typography>
                    </Grid>
                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))' }}>
                        <img src={PoseidonResponsesImg} style={{ width: 'calc(50*var(--vss))' }} />
                    </Grid>

                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))' }}>
                        <Typography style={{ fontSize: 'calc(1.2*var(--vss))', maxWidth: 'calc(50*var(--vss))', color: 'white' }}>
                            These aggregate statistics for each boss are a crude measure of what's really going with the bosses, though. If you think about it, each boss in the game is actually three different bosses: its act 1 version, its act 2 version, and its act 3 version.
                            Each version starts with a different amount of material, and in some cases the later bosses have a more powerful version of their ability (like in the case of Alien, Poseidon, or Evil Morphy). It's wholly possible for the act 1 version of a boss to be very tough,
                            and for the act 3 version to be very easy—or vice-versa. The aggregate statistics were used to determine the winners of the Rank the Bosses challenge, but for completeness, let's look at the more detailed statistics:
                        </Typography>
                    </Grid>
                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))' }}>
                        <Typography style={{ fontSize: 'calc(1.2*var(--vss))', maxWidth: 'calc(50*var(--vss))', color: 'white' }}>
                            Player win rates by boss type (Higher percentage means the boss is easier):
                            <br />
                            Act 2 Dr. Duck: 98.02% (sample size: 252)
                            <br />
                            Act 2 Lil' Monsta: 89.00% (sample size: 209)
                            <br />
                            Act 2 Karate Master: 88.97% (sample size: 263)
                            <br />
                            Act 3 Plague Doctor: 87.91% (sample size: 215)
                            <br />
                            Act 3 Alien: 84.30% (sample size: 223)
                            <br />
                            Act 3 Karate Master: 83.93% (sample size: 224)
                            <br />
                            Act 3 Mushroom King: 82.76% (sample size: 203)
                            <br />
                            Act 2 Alien: 82.21% (sample size: 253)
                            <br />
                            Act 3 Simon: 80.84% (sample size: 214)
                            <br />
                            Act 1 Elder Squid: 79.95% (sample size: 404)
                            <br />
                            Act 2 Simon: 79.26% (sample size: 217)
                            <br />
                            Act 2 Evil Morphy: 78.11% (sample size: 233)
                            <br />
                            Act 3 Draco: 77.74% (sample size: 265)
                            <br />
                            Act 3 Lil' Monsta: 77.69% (sample size: 251)
                            <br />
                            Act 2 Elder Squid: 77.06% (sample size: 231)
                            <br />
                            Act 2 Mushroom King: 77.02% (sample size: 235)
                            <br />
                            Act 1 Lil' Monsta: 75.77% (sample size: 388)
                            <br />
                            Act 3 Elder Squid: 75.32% (sample size: 235)
                            <br />
                            Act 1 Dr. Duck: 74.93% (sample size: 379)
                            <br />
                            Act 1 Poseidon: 74.76% (sample size: 416)
                            <br />
                            Act 1 Karate Master: 74.53% (sample size: 373)
                            <br />
                            Act 2 Draco: 74.35% (sample size: 308)
                            <br />
                            Act 3 Evil Morphy: 73.11% (sample size: 212)
                            <br />
                            Act 1 Plague Doctor: 69.67% (sample size: 399)
                            <br />
                            Act 2 Poseidon: 68.12% (sample size: 229)
                            <br />
                            Act 1 Mushroom King: 66.58% (sample size: 404)
                            <br />
                            Act 1 Evil Morphy: 65.16% (sample size: 376)
                            <br />
                            Act 3 Poseidon: 63.55% (sample size: 214)
                            <br />
                            Act 1 Simon: 63.08% (sample size: 390)
                            <br />
                            Act 1 Alien: 57.89% (sample size: 399)
                        </Typography>
                    </Grid>
                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))' }}>
                        <Typography style={{ fontSize: 'calc(1.2*var(--vss))', maxWidth: 'calc(50*var(--vss))', color: 'white' }}>
                            This more detailed breakdown reveals what was going with Dr. Duck. Act 1 Dr. Duck is actually very well-balanced, and even a bit on the hard side, but Act 2 Dr. Duck is a total joke. She's by far the biggest outlier of all the bosses.
                            At the hard end, there's a few different offenders, but Act 1 Alien is a real killer (well, actually, abductor—his victims are all safe and sound in his spacecraft).
                        </Typography>
                    </Grid>
                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))' }}>
                        <Typography style={{ fontSize: 'calc(1.2*var(--vss))', maxWidth: 'calc(50*var(--vss))', color: 'white' }}>
                            Anyway, it goes without saying that we're making some balance changes to address the discrepancy in strength between the bosses! Here are the changes to the bosses:
                        </Typography>
                    </Grid>
                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))' }}>
                        <Typography style={{ fontSize: 'calc(1.2*var(--vss))', maxWidth: 'calc(50*var(--vss))', color: 'white' }}>
                            Act 2 Dr. Duck is now harder (starts with two additional queens)
                            <br />
                            Acts 2 and 3 Lil Monsta are now harder (starts with two additional pawns)
                            <br />
                            Act 2 Karate Master is now harder (starts with two additional pawns)
                            <br />
                            Act 1 Alien is now easier (abducts every 5 turns instead of every 4; starts with an extra pawn)
                            <br />
                            Act 3 Poseidon is now easier (starts with one fewer knight and one fewer bishop)
                            <br />
                            Act 1 Simon is now easier (starts with one fewer knight)
                            <br />
                            Act 1 Plague Doctor is now easier (starts with one fewer bishop)
                            <br />
                            Act 1 Evil Morphy is now easier (starts with one fewer rook, one fewer pawn, and one additional knight)
                        </Typography>
                    </Grid>
                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))' }}>
                        <Typography style={{ fontSize: 'calc(1.2*var(--vss))', maxWidth: 'calc(50*var(--vss))', color: 'white' }}>
                            We also ran some numbers on some of the other enemies, and on the relics and boosts. We might share more about those in time, but we're making a few balance changes to those, as well, based on what we found:
                        </Typography>
                    </Grid>
                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))' }}>
                        <Typography style={{ fontSize: 'calc(1.2*var(--vss))', maxWidth: 'calc(50*var(--vss))', color: 'white' }}>
                            Empress levels are now easier
                            <br />
                            Duck River levels are now harder
                            <br />
                            Mid-level Mushroom Man is now harder
                            <br />
                            Advanced-level Duck Pond is now easier
                            <br />
                            Monster Book energy cost increased between Ascensions 15 and 28 (2 → 3)
                            <br />
                            Wedding Ring energy cost increased below Ascension 15 (3 → 4)
                            <br />
                            Mercury Hourglass now gives less energy at all ascensions (3 or 4 → 2 or 3)
                            <br />
                            Surge Pawn now gives more energy (3 → 4)
                            <br />
                            Special Delivery energy cost decreased below Ascension 15 (1 → 0)
                            <br />
                            Special Delivery energy cost decreased above Ascension 28 (2 → 1)
                            <br />
                            Ghostblade energy cost decreased between Ascensions 15 and 28 (2 → 1)
                        </Typography>
                    </Grid>
                    <Grid item sx={{ marginBottom: 'calc(2*var(--vss))' }}>
                        <Typography style={{ fontSize: 'calc(1.2*var(--vss))', maxWidth: 'calc(50*var(--vss))', color: 'white' }}>
                            A huge thank you to everyone who agreed to send in their run data! It was directly thanks to you that we are able to continue improving and balancing The Rookery.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>
    );
}