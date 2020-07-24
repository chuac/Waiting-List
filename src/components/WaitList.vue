<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <draggable v-model="waitList" @end="onEnd">
                <transition-group type="transition" name="wait-list">
                    <li v-for="obj in getWaitList" v-bind:key="obj.id">
                        {{ obj.person }}
                    </li>
                </transition-group>
            </draggable>

            <form>
                <div class="field">
                    <label class="label">Person</label>
                    <input v-model.lazy="person" required class="input" placeholder="Details" name="person" />
                </div>
                <button v-on:click.prevent="handleSubmit()" class="button is-primary">Add to Waiting List</button>
            </form>
            <button v-on:click.prevent="clearList()" class="button is-info">Clear Waiting List</button>
        </div>
        
    </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        draggable
    },
    data() {
        return {
            person: ''
        }
    },
    computed: {
        ...mapGetters([
            'getWaitList',
        ]),
        waitList: {
            get() {
                return this.getWaitList;
            },
            set(value) {
                this.updateList(value);
            }
        }
    },
    methods: {
        ...mapActions([
            'insertPerson',
            'clearList',
            'updateList'
        ]),
        handleSubmit: function() {
            this.insertPerson({
                person: this.person
            });
            this.person = '';
        },
        onEnd: function(event) {
            console.log(event);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
draggable {
    background-color: gray;
}

.wait-list-move { /* transition group class that adds on to transition-group with name="wait-list" */
    transition: transform 0.5s;
}
</style>
