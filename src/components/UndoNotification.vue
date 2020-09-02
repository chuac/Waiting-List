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
    data() {
        return {
            timeout: null, // to store setTimeout ID,
        }
    },
    computed: {
        ...mapGetters([
            'getToDelete'
        ])
    },
    methods: {
        ...mapActions([
            'insertToDeletePerson',
            'clearToDelete'
        ])
    },
    created() {
        this.timeout = setTimeout(() => {
            this.clearToDelete();
        }, 7000);
    },
    beforeDestroy() {
        clearTimeout(this.timeout);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div {
    position: fixed;
    
}
</style>
