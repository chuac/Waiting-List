<template>
    <div class="notification is-warning">
        <button v-on:click="closeNotification()" class="delete"></button>
        <span>Deleted {{ getToDelete.person }}</span>
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
        ]),
        closeNotification: function() {
            this.$emit('close-notification'); // emit this custom event when user clicks the X button
        }
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
    bottom: 1rem;
    right: 1rem;

    span {
        font-size: 2rem;
        // color: black;
    }
}
</style>
