import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createMutationsSharer from "vuex-shared-mutations"; // https://forum.vuejs.org/t/configure-vuex-persist-to-rehydrate-state-automatically-in-other-tabs-on-a-storage-event/50143/3

Vue.use(Vuex);


export const store = new Vuex.Store({
    state: {
        counter: 0,
        waitList: []
    },
    getters: {
        getWaitList: (state) => {
            return state.waitList;
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
        clearList: (state) => {
            state.counter = 0;
            state.waitList = [];
        },
        updateList: (state, payload) => {
            state.waitList = payload;
        }
    },
    actions: {
        insertPerson: (context, payload) => {
            context.commit('insertPerson', payload);
        },
        clearList: (context) => {
            context.commit('clearList');
        },
        updateList: (context, payload) => {
            context.commit('updateList', payload);
        }
    },
    plugins: [
        createPersistedState(),
        createMutationsSharer({ predicate: ["insertPerson", "clearList", "updateList"] })
    ],
})