import Vue from 'vue' // vue/dist/vue.js
import App from './App.vue'
import Routes from './routes'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import { store } from './store/store' // import in the store we created and added data to

Vue.config.productionTip = false

require("./assets/main.scss"); // our Sass file, which imports Bulma

Vue.use(Vuelidate);

Vue.use(VueRouter); // vue-router package
const router = new VueRouter({
    routes: Routes,
    mode: 'history' // https://router.vuejs.org/guide/essentials/history-mode.html#html5-history-mode
});

Vue.filter('expandGameTypes', function(value) {
    switch (value.toLowerCase()) {
        case 'p':
            return 'Pool';
        case 's':
            return 'Snooker';
        case 'tt':
            return 'Table Tennis';
        case 'a':
            return 'Any';
        case 'pu':
            return 'Pool or American Pool';
        case 'u':
            return 'American Pool';
        case 'pt':
            return 'Pool or Table Tennis';
    }
});

// Vue.filter('gameTypeToClass', function(value) {
//     switch (value.toLowerCase()) {
//         case 'p':
//             return 'pool';
//         case 's':
//             return 'snooker';
//         case 'tt':
//             return 'table-tennis';
//         case 'a':
//             return 'any';
//         case 'pu':
//             return 'pool-or-american';
//         case 'u':
//             return 'american-pool';
//         case 'pt':
//             return 'pool-or-table-tennis';
//     }
// })



// export const bus = new Vue(); // creating an Event Bus

new Vue({
    render: h => h(App),
    router: router,
    store: store,
    methods: {
        gameTypeToClass: function(value) {
            switch (value.toLowerCase()) {
                case 'p':
                    return 'pool';
                case 's':
                    return 'snooker';
                case 'tt':
                    return 'table-tennis';
                case 'a':
                    return 'any';
                case 'pu':
                    return 'pool-or-american';
                case 'u':
                    return 'american-pool';
                case 'pt':
                    return 'pool-or-table-tennis';
            }
        },
        fontSize: function(string) { // return different CSS classes (for font-size) depending on how long the string is
            let len = string.length;
            if (len < 4) {
                return 'big-text';
            } else if (len < 10) {
                return 'smaller-text';
            } else {
                return 'smallest-text';
            }
        }
    }
}).$mount('#app')
