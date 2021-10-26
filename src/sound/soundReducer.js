import actions from '../actionTypes';
import { finishedSounds } from './../sound/sounds';
import { Howl } from 'howler';

const importAll = require =>
    require.keys().map(sound => {
        const soundFile = require(sound);
        return [sound.replace(/^\.\/(\w+)_?.+/, '$1'), new Howl({ src: soundFile, loop: false })];
    });

const soundMap = Object.fromEntries(importAll(require.context('./../assets/sounds/', false, /.mp3$/)));

export const activeSoundSelector = state => {
    return state.sounds.filename;
};

const defaultSoundState = {
    filename: finishedSounds[0].filename,
};

// TODO: Preload these to evade lag before playing a sound
const playFinishedSound = filename => {
    const sound = soundMap[filename];
    sound.play();
};

export default (state = defaultSoundState, action) => {
    switch (action.type) {
        case actions.PLAY_FINISH_SOUND:
            playFinishedSound(state.filename);
            console.info('sound: PLAY A SOUND');
            return {
                ...state,
            };
        case actions.ASSIGN_FINISH_SOUND:
            console.info('sound: ASSIGNED A FINISH SOUND');
            return {
                ...state,
                filename: action.filename,
            };
        default:
            return state;
    }
};
