import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createMutationsSharer from 'vuex-shared-mutations'; // https://forum.vuejs.org/t/configure-vuex-persist-to-rehydrate-state-automatically-in-other-tabs-on-a-storage-event/50143/3

Vue.use(Vuex);


export const store = new Vuex.Store({
    state: {
        counter: 0,
        waitList: [],
        peopleToCall: [],
        TTSMessage: '',
        editTargetObjId: '',
        toDelete: {} // hold the person object to be deleted if the user doesn't click 'Undo'
    },
    getters: {
        getWaitList: (state) => {
            return state.waitList;
        },
        getWaitListPaginate: (state) => (page, numPerPage) => { // not used
            return state.waitList.slice((page - 1) * numPerPage, page * numPerPage);
        },
        getPeopleToCall: (state) => {
            return state.peopleToCall;
        },
        getIndexOfNotification: (state) => (notification) => {
            return state.peopleToCall.indexOf(notification);
        },
        getCountOfPool: (state) => {
            return (state.waitList.filter((people) => {
                return ((people.gameTypes === 'p') || (people.gameTypes === 'ps') || (people.gameTypes === 'pu') || (people.gameTypes === 'u') || (people.gameTypes === 'tu') ||(people.gameTypes === 'pt') || (people.gameTypes === 'a'))
            }).length);
        },
        getCountOfSnooker: (state) => {
            return (state.waitList.filter((people) => {
                return ((people.gameTypes === 's') || (people.gameTypes === 'ps') || (people.gameTypes === 'st') || (people.gameTypes === 'a'))
            }).length);
        },
        getCountOfTableTennis: (state) => {
            return (state.waitList.filter((people) => {
                return ((people.gameTypes === 't') || (people.gameTypes === 'pt') || (people.gameTypes === 'tu') || (people.gameTypes === 'st') || (people.gameTypes === 'a'))
            }).length);
        },
        getCountOfAny: (state) => {
            return (state.waitList.filter((people) => {
                return ((people.gameTypes === 'a'))
            }).length);
        },
        getTTSMessage: (state) => {
            return state.TTSMessage;
        },
        getToDelete: (state) => {
            return state.toDelete;
        }
    },
    mutations: {
        insertPerson: (state, payload) => {
            state.waitList = [...state.waitList, { 
                id: state.counter,
                ...payload
            }]
            state.counter++;
        },
        insertToDeletePerson: (state) => { // re-insert person into the waitlist since the undo button was clicked after a deletion intent
            if (Object.keys(state.toDelete).length !== 0) { // make sure toDelete isn't an empty object
                const { originalIndex, ...person } = state.toDelete; // destructure the toDelete person object
                state.waitList.splice(originalIndex, 0, person);

                state.toDelete = {}; // clear out toDelete since we have re-inserted this person
            } else {
                console.log('ERROR: Trying to read from an empty object!')
            }
            
        },
        editPerson: (state, payload) => {
            const { editTargetID, toEdit } = payload;

            state.waitList = state.waitList.map((obj) => { // mapping will create a new object to satisfy Vuex reactivity to all components
                if (obj.id === editTargetID) { // if found the object with our editTargetID
                    return {
                        ...obj,
                        person: toEdit.person,
                        gameTypes: toEdit.gameTypes.toLowerCase(), // make sure lowercased gametypes
                        remarks: toEdit.remarks
                    };
                } else {
                    return obj;
                }
            })
        },
        deletePerson: (state, payload) => {
            state.waitList.splice(payload, 1); // payload will hold the index (of person to delete) of the current wait list (in the displayed order)
        },
        deletePersonIntent: (state, payload) => {
            let removed = state.waitList.splice(payload, 1);
            state.toDelete = {
                ...removed[0], // spread the object. splice will return the removed object(s) into an array
                originalIndex: payload // hold the index of the object when it was in the displayed order (in case we need to insert it back into the waitList array)
            };
            //state.waitList.splice(payload, 1); // payload will hold the index (of person to delete) of the current wait list (in the displayed order)
        },
        clearToDelete: (state) => {
            state.toDelete = {}; // clear toDelete when the undo notification expires
        },
        clearList: (state) => {
            state.counter = 0;
            state.waitList = [];
            state.peopleToCall = [];
            state.TTSMessage = '';
            state.editTargetObjId = '';
        },
        updateList: (state, payload) => {
            state.waitList = payload;
        },
        addPersonToCall: (state, payload) => {
            state.peopleToCall.push({
                ...payload,
                id: (Math.random().toString(36) + Date.now().toString(36)).substr(2) // generate random ID
            });
        },
        removePersonToCall: (state, payload) => {
            state.peopleToCall = state.peopleToCall.filter((notification) => {
                return notification.id != payload.id
            })
            //state.peopleToCall.shift(); // could we use this?
        },
        clearNotifications: (state) => {
            state.peopleToCall = [];
        },
        updateTTSMessage: (state, payload) => {
            state.TTSMessage = payload;
        },
        updateEditTarget: (state, payload) => {
            state.editTargetObjId = payload;
        }
    },
    actions: {
        insertPerson: (context, payload) => {
            context.commit('insertPerson', payload);
        },
        insertToDeletePerson: (context, payload) => {
            context.commit('insertToDeletePerson', payload);
        },
        editPerson: (context, payload) => {
            context.commit('editPerson', payload);
        },
        deletePerson: (context, payload) => {
            context.commit('deletePerson', payload);
        },
        deletePersonIntent: (context, payload) => {
            context.commit('deletePersonIntent', payload);
        },
        clearToDelete: (context, payload) => {
            context.commit('clearToDelete', payload);
        },
        clearList: (context) => {
            context.commit('clearList');
        },
        updateList: (context, payload) => {
            context.commit('updateList', payload);
        },
        addPersonToCall: (context, payload) => {
            context.commit('addPersonToCall', payload);
        },
        removePersonToCall: (context, payload) => {
            context.commit('removePersonToCall', payload);
        },
        clearNotifications: (context) => {
            context.commit('clearNotifications');
        },
        updateTTSMessage: (context, payload) => {
            context.commit('updateTTSMessage', payload);
        },
        updateEditTarget: (context, payload) => {
            context.commit('updateEditTarget', payload);
        }
    },
    plugins: [
        createPersistedState(),
        createMutationsSharer({ predicate: ["insertPerson", "insertToDeletePerson", "editPerson", "deletePerson", "deletePersonIntent", "clearList", "clearToDelete", "updateList", "addPersonToCall", "removePersonToCall", "clearNotifications", "updateTTSMessage"] })
    ],
})