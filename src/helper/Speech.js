const synth = window.speechSynthesis;
synth.lang = 'en-US';
synth.volume = 1;

export const speak = (text) => {
    synth.speak(new SpeechSynthesisUtterance(text));
};
