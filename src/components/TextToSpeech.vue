<template>
    <div>
        <button ref="button"></button> <!-- invisible button to help firing speechSynthesis.speak() -->
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
            speechSynthesis.speak(utterance);
        }
    },
    mounted() {
        this.$refs.button.click(); // click an invisible button for Chrome to fire speechSynthesis.speak() https://www.chromestatus.com/feature/5687444770914304
        this.speak();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
