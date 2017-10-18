export default {
    GAIN_AUDIO(state, src) {
        state.audioSrc = src;
    },
    MUSIC_AUDIO_STATUS(state, value) {
        state.musicAudioStatus = value;
    },
    READ_AUDIO_STATUS(state, value) {
        state.readAudioStatus = value;
    },
    GET_AUDIO_CURRENTTIME(state, value) {
        state.audioCurrentTime = value;
    }
}