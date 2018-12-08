import actions from "./../actionTypes";
import elevatorSound from './../assets/elevator.mp3'
// sounds
import sound from './../assets/sounds/wakawaka.mp3'
import {Howl, Howler} from 'howler';

const defaultSoundState = {
    file: undefined,
};

// TODO: Preload these to evade lag before playing a sound
let elevatorAudioManager = new Howl({
    src: [elevatorSound],
    loop: true,
});
let soundsAudioManager = new Howl({
    src: [sound],
    loop: false,
});

const playElevatorSound = () => {
    elevatorAudioManager.play();
};

const playFinishedSound = () => {
    soundsAudioManager.play();
};

const stopAllSounds = () => {
    Howler.stop();
};


export default (state = defaultSoundState, action) => {
    switch (action.type) {
        case actions.PLAY_FINISHED_SOUND:
            playFinishedSound();
            console.info("sound: PLAY A SOUND");
            return {
                ...state,
            };
        case actions.STOP_ALL_SOUNDS:
            console.info("sound: PLAY A SOUND");
            return {
                ...state,
            };
        case actions.PLAY_ELEVATOR_SOUND:
            console.info("sound: PLAY ELEVATOR SOUND");
            playElevatorSound();
            return {
                ...state,
            };
        default:
            return state
    }
}
