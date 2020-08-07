<template>
    <div class="columns is-centered" v-on:click="resetDeleteTarget(); handleEdit(editTargetObjId);">
        <div class="column is-offset-1 is-narrow">
            <draggable v-model="waitList" ghost-class="ghost" @end="onEnd" handle=".handle">
                <transition-group class="list-container" type="transition" name="wait-list">
                    <div v-bind:class="$root.gameTypeToClass(obj.gameTypes)" class="list-item" v-for="(obj, index) in getWaitList" v-bind:key="obj.id">
                        <i class="fa fa-align-justify handle"></i>
                        <span class="list-item-person is-size-4 has-text-weight-bold">{{ obj.person }}</span>
                        <span class="list-item-game is-size-6 has-text-weight-semibold is-unselectable">
                            {{ obj.gameTypes | expandGameTypes }} <br>
                            <span v-if="obj.remarks" class="list-item-remarks">
                                {{ obj.remarks }}
                            </span>
                            <span class="list-item-time is-size-7 is-italic has-text-weight-light">
                                <relative-time v-bind:created_at="obj.created_at"></relative-time>
                            </span>
                        </span>
                        <div v-if="editTarget !== index" class="list-item-control-buttons">
                            <i class="far fa-edit edit-button" v-on:click.stop="firstEditClick(index, obj.id)"></i>
                            <i class="fa fa-volume-up call-button" v-on:click.stop="clickPerson(obj)"></i>
                            <i v-bind:class="{hide: deleteTarget === index}" class="delete delete-confirmation" v-on:click.stop="firstDeleteClick(index)"></i>
                            <i v-bind:class="{hide: deleteTarget !== index}" class="delete delete-button" v-on:click.stop="handleDelete(index)">Delete</i>
                        </div>
                        <form class="edit-form" v-if="editTarget === index" v-on:click.stop autocomplete="off"> <!-- stopping a click event from bubbling up here to prevent clearing editTarget if user clicks in this div (like clicking into the input) -->
                            <input ref="editInputPerson" v-model="$v.toEdit.person.$model" v-on:keyup.enter.stop="handleEdit(obj.id)" v-bind:class="{'is-danger': editPersonFormSubmitted && $v.toEdit.person.$invalid}" class="input edit-input is-small" placeholder="Number / Name" type="text">
                            <input v-model="$v.toEdit.gameTypes.$model" v-on:keyup.enter.stop="handleEdit(obj.id)" v-bind:class="{'is-danger': editPersonFormSubmitted && $v.toEdit.gameTypes.$invalid}" class="input edit-input is-small" placeholder="Game Type" type="text">
                            <input v-model="$v.toEdit.remarks.$model" v-on:keyup.enter.stop="handleEdit(obj.id)" class="input edit-input is-small" v-bind:class="{'is-danger': editPersonFormSubmitted && $v.toEdit.remarks.$invalid}" placeholder="Remarks" type="text">
                            <i class="fas fa-check-square fa-lg" v-on:click.stop.prevent="handleEdit(obj.id)"></i>
                        </form>
                    </div>
                </transition-group>
            </draggable>
        </div>
        <div class="column is-offset-1 is-narrow">
            <br>
            <strong>{{ getCountOfPool }} groups currently waiting for pool</strong>
            <hr>
            <div>

            </div>
            <i v-on:click.stop="showHelperMessage = !showHelperMessage" class="far fa-question-circle fa-2x"></i>
            
            <helper-message v-if="showHelperMessage" v-on:close-message="resetShowHelper()"></helper-message>
            <router-link class="fa fa-desktop fa-2x" :to="{ name: '/display', path: '/display'}" target="_blank">
                
            </router-link>
            <form autocomplete="off">
                <div class="field">
                    <label class="label">Game Type</label>
                    <input v-model="$v.gameTypes.$model" v-bind:class="{'is-danger': newPersonFormSubmitted && $v.gameTypes.$invalid}" type="text" ref="gameTypes" required class="input new-input" placeholder="Game Type"/>
                    
                    <p class="help is-danger" v-if="newPersonFormSubmitted && !$v.gameTypes.required">This field is required</p>
                    <p class="help is-danger" v-if="newPersonFormSubmitted && !$v.gameTypes.isValidGameType">Must be a valid game type code</p>
                    <!-- <input type="checkbox" id="pool" value="Pool" v-model="checkedGameTypes">
                    <label for="pool">Pool</label>
                    <input type="checkbox" id="snooker" value="Snooker" v-model="checkedGameTypes">
                    <label for="snooker">Snooker</label>
                    <input type="checkbox" id="pool_and_snooker" value="Pool and Snooker" v-model="checkedGameTypes">
                    <label for="pool_and_snooker">Pool and Snooker</label>
                    <input type="checkbox" id="table_tennis" value="Table Tennis" v-model="checkedGameTypes">
                    <label for="table_tennis">Table Tennis</label>
                    <br> -->
                </div>
                <div class="field">
                    <label class="label">Name / Number</label>
                    <input v-model.lazy="$v.person.$model" v-bind:class="{'is-danger': newPersonFormSubmitted && $v.person.$invalid}" type="text" ref="person" required class="input new-input" placeholder="Number / Name"/>

                    <p class="help is-danger" v-if="newPersonFormSubmitted && !$v.person.required">This field is required</p>
                    <p class="help is-danger" v-if="newPersonFormSubmitted && !$v.person.isPersonUnique">That name or number already exists</p>
                    <p class="help is-danger" v-if="newPersonFormSubmitted && !$v.person.maxLength">Must be less than 20 characters</p>
                </div>
                <div class="field">
                    <label class="label">Remarks</label>
                    <input v-model.lazy="$v.remarks.$model" v-bind:class="{'is-danger': newPersonFormSubmitted && $v.remarks.$invalid}" type="text" ref="remarks" class="input new-input" placeholder="Remarks"/>

                    <p class="help is-danger" v-if="newPersonFormSubmitted && !$v.remarks.maxLength">Must be less than 30 characters</p>
                </div>
                <div class="buttons">
                    <button v-on:click.prevent="handleSubmit()" class="button is-primary">Add to Waiting List</button>
                    
                </div>
                <button v-on:click.prevent="clearListConfirmation = !clearListConfirmation" class="button is-danger clear-list-button">Clear Waiting List</button>
            </form>
        </div>
        <div v-bind:class="{'is-active': clearListConfirmation}" class="modal">
            <div v-on:click="clearListConfirmation = !clearListConfirmation" class="modal-background"></div>
            <div class="modal-content">
                <article class="message is-warning">
                    <div class="message-header">
                        Confirm?
                        <button v-on:click="clearListConfirmation = !clearListConfirmation" class="delete"></button> <!-- bootstrap class of "delete" shows that small X to close modal -->
                    </div>
                    <div class="message-body">
                        <button v-on:click.prevent="handleClearList()" class="button is-danger">CLEAR</button>
                    </div>
                </article>
            </div>
        </div>

        <text-to-speech v-if="fireTextToSpeech" v-bind:message="getTTSMessage" v-on:finished-speaking="fireTextToSpeech = false"/>
    </div>
</template>

<script>
import moment from 'moment';
import draggable from 'vuedraggable';
import { mapActions, mapGetters } from 'vuex';
import { helpers, required, maxLength } from 'vuelidate/lib/validators';

import HelperMessage from './HelperMessage.vue';
import TextToSpeech from './TextToSpeech.vue';
import RelativeTime from './RelativeTime.vue';
import { store } from '../store/store';

const isValidGameType = (val) => { // custom validator for Vuelidate
    const value = val.toLowerCase();
    return (
        !helpers.req(val) || // lets this validator behave well if this custom validator is used without 'required' validator
        value === 'a'   ||
        value === 'p'   ||
        value === 's'   ||
        value === 'tt'  ||
        value === 'pu'  ||
        value === 'u'   ||
        value === 'pt'
    )
}

const isPersonUnique = (val) => { // true if person doesn't already exist in the waitlist
    return ((store.state.waitList).find((obj) => obj.person === val) === undefined); // find will return 'undefined' if that person is not found in the waitlist
}

//import { bus } from '../main';
// import { gameTypeToClass } from '../main';

export default {
    components: {
        draggable,
        'helper-message': HelperMessage,
        'text-to-speech': TextToSpeech,
        'relative-time': RelativeTime
    },
    data() {
        return {
            person: '',
            gameTypes: '',
            remarks: '',
            checkedGameTypes: [],
            clearListConfirmation: false,
            showHelperMessage: false,
            deleteTarget: -1, // initialise these targets to -1 index
            editTarget: -1,
            editTargetObjId: -1,
            toEdit: {
                person: '',
                gameTypes: '',
                remarks: ''
            },
            newPersonFormSubmitted: false,
            editPersonFormSubmitted: false,
            fireTextToSpeech: false
        }
    },
    validations: {
        person: {
            required,
            isPersonUnique,
            maxLength: maxLength(20)
        },
        gameTypes: {
            required,
            isValidGameType
        },
        remarks: {
            maxLength: maxLength(30)
        },
        toEdit: {
            person: {
                required,
                maxLength: maxLength(20)
            },
            gameTypes: {
                required,
                isValidGameType
            },
            remarks: {
                maxLength: maxLength(30)
            }
        }
    },
    computed: {
        ...mapGetters([
            'getWaitList',
            'getCountOfPool',
            'getTTSMessage'
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
            this.newPersonFormSubmitted = true; // flip to true to now show validation errors (we only want to show errors on form submit)

            this.$v.gameTypes.$touch(); // make these inputs "dirty"
            this.$v.person.$touch();
            this.$v.remarks.$touch();
            if (this.$v.gameTypes.$invalid || this.$v.person.$invalid || this.$v.remarks.$invalid) {
                return; // code will stop here and show errors, if there are any (without hitting insertPerson)
            }

            this.insertPerson({
                person: this.person,
                gameTypes: this.gameTypes.toLowerCase(),
                remarks: this.remarks,
                created_at: moment() // save current date & time that this person was inserted into the wait list
                //gameTypes: this.checkedGameTypes.join(', ')
            });
            this.person = ''; // reset the input field to empty
            this.gameTypes = '';
            this.remarks = '';
            this.newPersonFormSubmitted = false;
            // this.checkedGameTypes = []; // reset the checkboxes to empty
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
        firstEditClick: function(index, objId) {
            // this.$refs.editInputPerson.focus();
            let waitList = this.getWaitList;
            this.editTarget = index;
            this.editTargetObjId = objId; // the actual object's ID in the Vuex store
            this.toEdit.person = waitList[index].person;
            this.toEdit.gameTypes = waitList[index].gameTypes;
            this.toEdit.remarks = waitList[index].remarks;
        },
        handleEdit: function(id) {
            if (id === -1) { // skip handling edit if id given to us is the placeholder of -1
                return;
            }
            this.editPersonFormSubmitted = true; // flip to true to now show validation errors (we only want to show errors on form submit)

            this.$v.toEdit.gameTypes.$touch(); // make these inputs "dirty"
            this.$v.toEdit.person.$touch();
            this.$v.toEdit.remarks.$touch();
            if (this.$v.toEdit.gameTypes.$invalid || this.$v.toEdit.person.$invalid || this.$v.toEdit.remarks.$invalid) {
                return; // code will stop here and show errors, if there are any (without hitting insertPerson)
            }

            this.editPerson({
                editTargetID: id,
                toEdit: this.toEdit
            });
            this.resetEditTarget();
            this.editPersonFormSubmitted = false;
        },
        resetEditTarget: function() {
            this.editTarget = -1;
            this.editTargetObjId = -1;
            this.toEdit = {
                person: '',
                gameTypes: ''
            } // reset the v-model placeholders to empty
        },
        resetShowHelper: function() {
            this.showHelperMessage = false;
        },
        onEnd: function(event) {
            console.log(event);
        },
        clickPerson: function(obj) {
            this.addPersonToCall({
                person: obj.person,
                gameTypes: obj.gameTypes
            });
        },
        reFocus: function() {
            this.$refs.gameTypes.focus();
        }
    },
    mounted() {
        this.reFocus();
        
    },
    created() {
        document.title = 'Wait List Control';
        this.unsubscribe = this.$store.subscribe((mutation) => { // subscribe to check for mutation, if TTSMessage has been updated/mutated, then fire it off
            if (mutation.type === 'updateTTSMessage') {
                this.fireTextToSpeech = true;
            }
        });
    },
    beforeDestroy() {
        this.unsubscribe();
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.clear-list-button {
    margin-top: 10em;
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

.modal-content { /* clear waitlist confirmation modal */
    width: 150px;
    overflow: hidden; // to hide scrollbars for modal
}

form {
    // margin-top: 2em;

    input[type=checkbox] {
        margin-right: 0.2em;
    }

}

.fa-desktop {
    float: right;
    margin-right: 0.3em;
    color: hsl(252, 0%, 32%); // dark gray
}
.fa-desktop:hover {
    color: hsl(0, 0%, 15%);
}

.fa-question-circle {
    float: right;
    color: hsl(252, 0%, 32%); // dark gray
}
.fa-question-circle:hover {
    color: hsl(0, 0%, 15%);
}

.edit-input {
    width: 5em;
}

.new-input {
    width: 10em;
}
</style>
