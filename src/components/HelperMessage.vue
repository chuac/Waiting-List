<template>
    <div class="modal is-active">
        <div v-on:click="closeMessage()" class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head has-background-info">
                <p class="modal-card-title">Help Page</p>
                <button v-on:click="closeMessage()" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="content">
                    <h4 class="title">Adding new person to wait list</h4>
                    Enter one of these Game Type codes:
                    <p>
                        Enter one of these Game Type codes:
                    </p>
                </div>
                
                <!-- https://bulma.io/documentation/elements/title/ -->
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
