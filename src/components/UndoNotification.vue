<template>
    <div class="notification is-success">
        <button class="delete"></button>
        Deleted {{ getToDelete.person }}
        <button v-on:click="insertToDeletePerson()">UNDO</button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'getToDelete'
        ])
    },
    methods: {
        ...mapActions([
            'insertToDeletePerson'
        ])
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div {
    position: fixed;
    
}
</style>
