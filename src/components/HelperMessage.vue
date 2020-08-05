<template>
    <div class="modal is-active">
        <div v-on:click="closeMessage()" class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Help Page</p>
                <button v-on:click="closeMessage()" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                
            </section>
            <footer class="modal-card-foot">
                <button v-on:click="closeMessage()" class="button is-info">Close</button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeMessage: function() {
            this.$emit('close-message'); // emit this custom event when user clicks a valid close area
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
