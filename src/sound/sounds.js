import _ from 'lodash';

export const finishedSounds = [
    {
        displayName: 'Lightsaber',
        filename: 'lightsaber.mp3',
    },
    {
        displayName: 'Wakawaka',
        filename: 'wakawaka.mp3',
    },
    {
        displayName: 'Chewbacca growl',
        filename: 'chewbacca.mp3',
    },
    {
        displayName: '"Hadouken!"',
        filename: 'hadouken.mp3',
    },
    {
        displayName: '"Bestefar!"',
        filename: _.sample(['bestefar_0.mp3', 'bestefar_1.mp3']),
    },
    {
        displayName: 'Cow mooing',
        filename: 'cow.mp3',
    },
    {
        displayName: 'Alfons: "Jag ska bara.."',
        filename: _.sample(['jag_ska_bara_0.mp3', 'jag_ska_bara_1.mp3', 'jag_ska_bara_2.mp3']),
    },
    {
        displayName: 'Record scratch',
        filename: 'record_scratch.mp3',
    },
];
