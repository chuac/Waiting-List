<template>
    <div class="columns is-centered" v-on:click="resetDeleteTarget()">
        <div class="column is-half">
            <draggable v-model="waitList" ghost-class="ghost" @end="onEnd" handle=".handle">
                <transition-group type="transition" name="wait-list">
                    <div class="list-item" v-for="(obj, index) in getWaitList" v-bind:key="obj.id">
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
                    <input v-model.lazy="person" required class="input" placeholder="Details" name="person" />
                </div>
                <button v-on:click.prevent="handleSubmit()" class="button is-primary">Add to Waiting List</button>
            </form>
            <button v-on:click.prevent="clearListConfirmation = !clearListConfirmation" class="button is-info">Clear Waiting List</button>
        </div>
        <div v-bind:class="{'is-active': clearListConfirmation}" class="modal">
            <div v-on:click="clearListConfirmation = !clearListConfirmation" class="modal-background"></div>
            <div class="modal-content">
                <article class="message is-warning">
                    <div class="message-header">
                        Confirm clearing the waiting list?
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

export default {
    components: {
        draggable
    },
    data() {
        return {
            person: '',
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
            'updateList'
        ]),
        handleClearList: function() {
            this.clearList();
            this.clearListConfirmation = !this.clearListConfirmation;
        },
        handleSubmit: function() {
            this.insertPerson({
                person: this.person
            });
            this.person = ''; // reset the input field to empty
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
}
</style>
