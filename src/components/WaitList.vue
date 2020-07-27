<template>
    <div class="columns is-centered" v-on:click="resetDeleteTarget()">
        <div class="column is-half">
            <draggable v-model="waitList" ghost-class="ghost" @end="onEnd" handle=".handle">
                <transition-group type="transition" name="wait-list">
                    <div class="list-item" v-for="(obj, index) in getWaitList" v-bind:key="obj.id" v-on:dblclick.stop="clickPerson(obj)">
                        <i class="fa fa-align-justify handle"></i>
                        {{ obj.person }}
                        <i v-bind:class="{hide: deleteTarget === index}" class="delete delete-confirmation" v-on:click.stop="firstDeleteClick(index)"></i>
                        <i v-bind:class="{hide: deleteTarget !== index}" class="delete delete-button" v-on:click.stop="handleDelete(index)">Delete</i>
                    </div>
                </transition-group>
            </draggable>

            <form autocomplete="off">
                <div class="field">
                    <label class="label">Add a Person</label>
                    <input type="checkbox" id="pool" value="Pool" v-model="checkedGameTypes">
                    <label for="pool">Pool</label>
                    <input type="checkbox" id="snooker" value="Snooker" v-model="checkedGameTypes">
                    <label for="snooker">Snooker</label>
                    <input type="checkbox" id="pool_and_snooker" value="Pool and Snooker" v-model="checkedGameTypes">
                    <label for="pool_and_snooker">Pool and Snooker</label>
                    <input type="checkbox" id="table_tennis" value="Table Tennis" v-model="checkedGameTypes">
                    <label for="table_tennis">Table Tennis</label>
                    <br>
                    <input v-model.lazy="person" required class="input" placeholder="Details" name="person" />
                </div>
                <div class="buttons">
                    <button v-on:click.prevent="handleSubmit()" class="button is-primary">Add to Waiting List</button>
                    <button v-on:click.prevent="clearListConfirmation = !clearListConfirmation" class="button is-info">Clear Waiting List</button>
                </div>
            </form>
            <button v-on:click="clearNotifications">Clear Notif</button>
        </div>
        <div v-bind:class="{'is-active': clearListConfirmation}" class="modal">
            <div v-on:click="clearListConfirmation = !clearListConfirmation" class="modal-background"></div>
            <div class="modal-content">
                <article class="message is-warning">
                    <div class="message-header">
                        Confirm to clear the waiting list
                        <button v-on:click="clearListConfirmation = !clearListConfirmation" class="delete"></button> <!-- bootstrap class of "delete" shows that small X to close modal -->
                    </div>
                    <div class="message-body">
                        <button v-on:click.prevent="handleClearList()" class="button is-danger">CLEAR</button>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapActions, mapGetters } from 'vuex';

//import { bus } from '../main';

export default {
    components: {
        draggable
    },
    data() {
        return {
            person: '',
            checkedGameTypes: [],
            deleteTarget: -1,
            clearListConfirmation: false
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
            'deletePerson',
            'clearList',
            'updateList',
            'addPersonToCall',
            'clearNotifications'
        ]),
        handleClearList: function() {
            this.clearList();
            this.clearListConfirmation = !this.clearListConfirmation;
        },
        handleSubmit: function() {
            this.insertPerson({
                person: this.checkedGameTypes.join(', ') + ' #' + this.person
            });
            this.person = ''; // reset the input field to empty
            this.checkedGameTypes = []; // reset the checkboxes to empty
        },
        handleDelete: function(index) {
            this.deletePerson(index);
            this.resetDeleteTarget(); // reset the delete target after successfully deleting one item
        },
        firstDeleteClick: function(index) {
            this.deleteTarget = index;
        },
        resetDeleteTarget: function() {
            this.deleteTarget = -1;
        },
        onEnd: function(event) {
            console.log(event);
        },
        clickPerson: function(obj) {
             console.log('clicked' + obj.person);
            // bus.$emit('personClicked', 'data');
            this.addPersonToCall(obj.person)
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
    // display: flex;

    .handle {
        margin-right: 0.8em;
        cursor: move;
    }

    .delete-confirmation {
        float: right;
    }

    .delete-button {
        float: right;
        background-color: red;
    }
}

.hide {
    display: none;
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

.modal-content { /* confirmation modal */
    width: 200px;
}

form {
    margin-top: 2em;

    input[type=checkbox] {
        margin-right: 0.2em;
    }

    label {
        margin-right: 0.4em;
    }
}
</style>
