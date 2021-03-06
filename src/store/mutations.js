export default {
    GAIN_AUDIO(state, src) {
        state.audioSrc = src;
    },
    GAIN_AUDIO_NAME(state, src) {
        state.audioName = src;
    },
    GAIN_AUDIO_AUTHOR(state, src) {
        state.audioAuthor = src;
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