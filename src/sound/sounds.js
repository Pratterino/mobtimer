import _ from 'lodash';

export const finishedSounds = [
    {
        displayName: 'Lightsaber',
        filename: 'lightsaber',
    },
    {
        displayName: 'Wakawaka',
        filename: 'wakawaka',
    },
    {
        displayName: 'Chewbacca growl',
        filename: 'chewbacca',
    },
    {
        displayName: '"Hadouken!"',
        filename: 'hadouken',
    },
    {
        displayName: '"Bestefar!"',
        filename: _.sample(['bestefar_0', 'bestefar_1']),
    },
    {
        displayName: 'Cow mooing',
        filename: 'cow',
    },
    {
        displayName: 'Alfons: "Jag ska bara.."',
        filename: _.sample(['jag_ska_bara_0', 'jag_ska_bara_1', 'jag_ska_bara_2']),
    },
    {
        displayName: 'Record scratch',
        filename: 'record_scratch',
    },
];
