<template>
    <div>

    </div>
</template>

<script>
export default {
    props: ['message'],
    methods: {
        speak() {
            let utterance = new SpeechSynthesisUtterance(this.message);
            utterance.lang = 'en-GB';
            utterance.rate = 1; // set the speed, accepts between [0.1 - 10], defaults to 1
            utterance.pitch = 1; // set the pitch, accepts between [0 - 2], defaults to 1
            utterance.volume = 1; // set the volume, accepts between [0 - 1], defaults to 1
            speechSynthesis.cancel(); // seems to fix intermittent Chrome bug where speak() would randomly stop working https://stackoverflow.com/a/58775876/3024923
            speechSynthesis.speak(utterance);
            speechSynthesis.speak(utterance); // TTS now speaks twice!
            this.finishedSpeaking(); // emit custom event when speechSynthesis is done
        },
        finishedSpeaking: function() {
            this.$emit('finished-speaking');
        }
    },
    mounted() {
        this.speak();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
