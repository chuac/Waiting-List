import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createMutationsSharer from "vuex-shared-mutations"; // https://forum.vuejs.org/t/configure-vuex-persist-to-rehydrate-state-automatically-in-other-tabs-on-a-storage-event/50143/3

Vue.use(Vuex);


export const store = new Vuex.Store({
    state: {
        counter: 0,
        waitList: [],
        peopleToCall: [],
        TTSMessage: ''
    },
    getters: {
        getWaitList: (state) => {
            return state.waitList;
        },
        getPeopleToCall: (state) => {
            return state.peopleToCall;
        },
        getIndexOfNotification: (state) => (notification) => {
            return state.peopleToCall.indexOf(notification);
        },
        getCountOfPool: (state) => {
            return (state.waitList.filter((people) => {
                return ((people.gameTypes === 'p') || (people.gameTypes === 'pu') || (people.gameTypes === 'u') || (people.gameTypes === 'pt') || (people.gameTypes === 'a'))
            }).length);
        },
        getTTSMessage: (state) => {
            return state.TTSMessage;
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
        editPerson: (state, payload) => {
            const { editTargetID, toEdit } = payload;

            state.waitList = state.waitList.map((obj) => { // mapping will create a new object to satisfy Vuex reactivity to all components
                if (obj.id === editTargetID) { // if found the object with our editTargetID
                    return {
                        ...obj,
                        person: toEdit.person,
                        gameTypes: toEdit.gameTypes,
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
        clearList: (state) => {
            state.counter = 0;
            state.waitList = [];
            state.peopleToCall = [];
            state.TTSMessage = '';
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
        }
    },
    actions: {
        insertPerson: (context, payload) => {
            context.commit('insertPerson', payload);
        },
        editPerson: (context, payload) => {
            context.commit('editPerson', payload);
        },
        deletePerson: (context, payload) => {
            context.commit('deletePerson', payload);
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
        }
    },
    plugins: [
        createPersistedState(),
        createMutationsSharer({ predicate: ["insertPerson", "editPerson", "deletePerson", "clearList", "updateList", "addPersonToCall", "removePersonToCall", "clearNotifications", "updateTTSMessage"] })
    ],
})