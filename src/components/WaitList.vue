<template>
    <div class="columns is-centered" v-on:click="resetDeleteTarget()">
        <div class="column is-half">
            <strong>{{ getCountOfPool }} groups currently waiting for pool</strong>
            <br>
            <draggable v-model="waitList" ghost-class="ghost" @end="onEnd" handle=".handle">
                <transition-group type="transition" name="wait-list">
                    <div v-bind:class="$root.gameTypeToClass(obj.gameTypes)" class="list-item" v-for="(obj, index) in getWaitList" v-bind:key="obj.id">
                        <div v-if="editTarget !== index">
                            <i class="fa fa-align-justify handle"></i>
                            <strong>{{ obj.person }} {{ obj.gameTypes | expandGameTypes }}</strong>

                            <div class="control-buttons">
                                <i class="far fa-edit edit-button" v-on:click.stop="firstEditClick(index)"></i>
                                <i class="fa fa-volume-up call-button" v-on:click.stop="clickPerson(obj)"></i>
                                <i v-bind:class="{hide: deleteTarget === index}" class="delete delete-confirmation" v-on:click.stop="firstDeleteClick(index)"></i>
                                <i v-bind:class="{hide: deleteTarget !== index}" class="delete delete-button" v-on:click.stop="handleDelete(index)">Delete</i>
                            </div>
                        </div>
                        <form v-if="editTarget === index" autocomplete="off">
                            <input v-model="toEdit.person" v-on:keyup.enter.stop="handleEdit(obj.id)" type="text">
                            <input v-model="toEdit.gameTypes" v-on:keyup.enter.stop="handleEdit(obj.id)" type="text">
                            <i class="fas fa-check-square fa-lg" v-on:click.stop.prevent="handleEdit(obj.id)"></i>
                        </form>
                    </div>
                </transition-group>
            </draggable>

            <form autocomplete="off">
                <div class="field">
                    <label class="label">Add a Person</label>
                    <!-- <input type="checkbox" id="pool" value="Pool" v-model="checkedGameTypes">
                    <label for="pool">Pool</label>
                    <input type="checkbox" id="snooker" value="Snooker" v-model="checkedGameTypes">
                    <label for="snooker">Snooker</label>
                    <input type="checkbox" id="pool_and_snooker" value="Pool and Snooker" v-model="checkedGameTypes">
                    <label for="pool_and_snooker">Pool and Snooker</label>
                    <input type="checkbox" id="table_tennis" value="Table Tennis" v-model="checkedGameTypes">
                    <label for="table_tennis">Table Tennis</label>
                    <br> -->
                    <input v-model="gameTypes" type="text" ref="gameTypes" required class="input" placeholder="Game types">
                    <input v-model="person" ref="person" required class="input" placeholder="Number" name="person" />
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
// import { gameTypeToClass } from '../main';

export default {
    components: {
        draggable
    },
    data() {
        return {
            person: '',
            gameTypes: '',
            checkedGameTypes: [],
            clearListConfirmation: false,
            deleteTarget: -1, // initialise these targets to -1 index
            editTarget: -1,
            toEdit: {
                person: '',
                gameTypes: ''
            }
        }
    },
    computed: {
        ...mapGetters([
            'getWaitList',
            'getCountOfPool'
        ]),
        waitList: { // interaction between Vuex and draggable package
            get() {
                return this.getWaitList;
            },
            set(value) {
                this.updateList(value);
            }
        },
    },
    methods: {
        ...mapActions([
            'insertPerson',
            'editPerson',
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
                person: this.person,
                gameTypes: this.gameTypes.toLowerCase()
                //gameTypes: this.checkedGameTypes.join(', ')
            });
            this.person = ''; // reset the input field to empty
            this.gameTypes = '';
            this.checkedGameTypes = []; // reset the checkboxes to empty
            this.reFocus();
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
        firstEditClick: function(index) {
            let waitList = this.getWaitList;
            this.editTarget = index;
            this.toEdit.person = waitList[index].person;
            this.toEdit.gameTypes = waitList[index].gameTypes;
        },
        handleEdit: function(id) {
            this.editPerson({
                editTargetID: id,
                toEdit: this.toEdit
            });
            this.resetEditTarget();
        },
        resetEditTarget: function() {
            this.editTarget = -1;
            this.toEdit = {
                person: '',
                gameTypes: ''
            } // reset the v-model placeholders to empty
        },
        onEnd: function(event) {
            console.log(event);
        },
        clickPerson: function(obj) {
             console.log('clicked' + obj.person);
            // bus.$emit('personClicked', 'data');
            this.addPersonToCall({
                person: obj.person,
                gameTypes: obj.gameTypes
            });
        },
        reFocus: function() {
            this.$refs.gameTypes.focus();
        },
    },
    mounted() {
        this.reFocus();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-item {
    width: 100%;
    // background: white;
    padding: 1em;
    margin-bottom: 2px;
    // display: flex;

    .handle {
        margin-right: 0.8em;
        cursor: move;
    }

    .control-buttons {
        float: right;

        .delete-confirmation {
            float: right;
            // display: inline-block;
        }

        .delete-button {
            float: right;
            // display: inline-block;
            background-color: red;
        }

        .call-button {
            float: left;
            // display: inline-block;
            margin-right: 5px;
            margin-top: 2.5px;
            color: hsl(252, 0%, 32%); // dark gray

            
        }
        .call-button:hover {
            color: black;
        }

        .edit-button {
            float: left;
            margin-right: 10px;
        }
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
