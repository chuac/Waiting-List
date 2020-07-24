<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <draggable v-model="waitList" ghost-class="ghost" @end="onEnd" handle=".handle">
                <transition-group type="transition" name="wait-list">
                    <div class="list-item" v-for="obj in getWaitList" v-bind:key="obj.id">
                        <i class="fa fa-align-justify handle"></i>
                        {{ obj.person }}
                    </div>
                </transition-group>
            </draggable>

            <form>
                <div class="field">
                    <label class="label">Add a Person</label>
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
<style scoped lang="scss">
.list-item {
    width: 100%;
    background: white;
    padding: 1em;
    margin-bottom: 2px;
    
    .handle {
        margin-right: 0.8em;
        cursor: move;
    }
}

.list-item-drag {
    opacity: 0; //doesn't do anything?
}

.wait-list-move { /* transition group class that adds on to transition-group with name="wait-list" */
    transition: transform 0.5s;
}

.ghost {
    border-left: 6px solid rgb(0, 183, 255);
    box-shadow: 10px 10px 5px -1px rgba(0, 0, 0, 0.14);
}

form {
    margin-top: 2em;
}
</style>
