let synth;

export const hasSpeechSupport = () => {
    return 'speechSynthesis' in window;
};

const initSpeechSynthesis = () => {
    if (hasSpeechSupport()) {
        synth = window.speechSynthesis;
        synth.lang = 'en-US';
        synth.volume = 1;
    }
};

export const speak = text => {
    initSpeechSynthesis();
    if (hasSpeechSupport()) {
        synth.speak(new SpeechSynthesisUtterance(text));
    }
};
