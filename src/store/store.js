import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createMutationsSharer from "vuex-shared-mutations"; // https://forum.vuejs.org/t/configure-vuex-persist-to-rehydrate-state-automatically-in-other-tabs-on-a-storage-event/50143/3

Vue.use(Vuex);


export const store = new Vuex.Store({
    state: {
        counter: 0,
        waitList: [],
        peopleToCall: []
    },
    getters: {
        getWaitList: (state) => {
            return state.waitList;
        },
        getPeopleToCall: (state) => {
            return state.peopleToCall;
        },
        getIndexOfNotification: (state) => (notification) => {
            console.log(`index: ${state.peopleToCall.indexOf(notification)}`);
            return state.peopleToCall.indexOf(notification);
        }
    },
    mutations: {
        insertPerson: (state, payload) => {
            //const { person } = payload;
            console.log(payload);
            // state.waitList.push({
            //     id: state.counter, // give each person object a unique id
            //     ...payload
            // });
            state.waitList = [...state.waitList, { 
                id: state.counter,
                ...payload
            }]
            state.counter++;
        },
        deletePerson: (state, payload) => {
            state.waitList.splice(payload, 1); // payload will hold the index (of person to delete) of the current wait list (in the displayed order)
        },
        clearList: (state) => {
            state.counter = 0;
            state.waitList = [];
        },
        updateList: (state, payload) => {
            state.waitList = payload;
            //console.log(state);
        },
        addPersonToCall: (state, payload) => {
            console.log(payload);
            state.peopleToCall.push({
                ...payload,
                id: (Math.random().toString(36) + Date.now().toString(36)).substr(2) // generate random ID
            });
            console.log(state.peopleToCall);
        },
        removePersonToCall: (state, payload) => {
            
            console.log('meant to be removing a person');
            console.log(state.peopleToCall);
            state.peopleToCall = state.peopleToCall.filter((notification) => {
                return notification.id != payload.id
            })
            //state.peopleToCall.shift();
            console.log(state.peopleToCall);
        },
        clearNotifications: (state) => {
            state.peopleToCall = [];
            console.log(`peopleToCall just cleared`);
            console.log(state.peopleToCall);
        }
    },
    actions: {
        insertPerson: (context, payload) => {
            context.commit('insertPerson', payload);
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
        }
    },
    plugins: [
        createPersistedState(),
        createMutationsSharer({ predicate: ["insertPerson", "deletePerson", "clearList", "updateList", "addPersonToCall", "removePersonToCall", "clearNotifications"] })
    ],
})