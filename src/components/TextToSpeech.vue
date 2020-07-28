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
            utterance.lang = 'en-AU';
            speechSynthesis.speak(utterance);
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
