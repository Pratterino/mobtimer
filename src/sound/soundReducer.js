import actions from './../actionTypes';
import { finishedSounds } from './../sound/sounds';
import { Howl } from 'howler';

export const activeSoundSelector = state => {
    return state.sounds.filename;
};

const defaultSoundState = {
    filename: finishedSounds[0].filename,
};

// TODO: Preload these to evade lag before playing a sound
const playFinishedSound = filename => {
    new Howl({
        src: [require(`./../assets/sounds/${filename}`)],
        loop: false,
    }).play();
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
