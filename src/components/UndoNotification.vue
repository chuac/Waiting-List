<template>
    <div class="undo-container" v-bind:class="$root.gameTypeToClass(getToDelete.gameTypes)">
        <button v-on:click="closeNotification()" class="delete"></button>
        <span>Deleted {{ getToDelete.person }}</span>
        <button v-on:click="insertToDeletePerson()" class="undo-button">UNDO</button>
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
.undo-container {
    position: fixed;
    bottom: 1rem;
    right: 1rem;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex: 1;

    span {
        font-size: 2rem;
        // color: black;
    }

    .undo-button {
        color: hsl(0, 0%, 15%);
        background-color: hsl(141, 53%, 53%);
        border: none;
        padding: 0.7em;
        border-radius: 4px;
        font-size: 1.1em;
        font-weight: 500; // medium boldness
    }
}
</style>
