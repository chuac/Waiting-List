<template>
    
        <div class="undo-container" v-bind:class="$root.gameTypeToClass(getToDelete.gameTypes)">
            <button v-on:click="closeNotification()" class="delete is-medium"></button>
            <span>Deleted: {{ getToDelete.person }}</span>
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
        }, 8000);
    },
    beforeDestroy() {
        clearTimeout(this.timeout);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.undo-container {
    position: fixed; // fix to the bottom right of viewport
    bottom: 1rem;
    right: 1rem;

    display: flex;
    // flex-direction: row;
    // justify-content: space-around;
    align-items: center;
    
    padding: 0.5rem;
    border-radius: 6px;
    border: 2px solid black;

    .delete {
        margin-left: 0.25rem;
        margin-right: 0.6rem;
    }

    span {
        font-size: 2.3rem;
        font-weight: 600;
        color: hsl(0, 0%, 15%);
        margin-right: 0.6rem;
        margin-bottom: 0.2rem; //  because text doesn't reaaaally look like it's vertically aligned in the center
    }

    .undo-button {
        color: hsl(252, 0%, 32%); // dark gray
        background-color: white; // hsl(141, 53%, 53%)
        border: 1px solid black;
        padding: 0.6rem;
        border-radius: 4px;
        font-size: 1.3em;
        font-weight: 700; // medium boldness

        cursor: pointer;
    }
    .undo-button:hover {
        // border: 2px solid black;
        color: hsl(0, 0%, 15%);
    }
}
</style>
