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
        case 'ps':
            return 'Pool or Snooker';
        case 't':
            return 'Table Tennis';
        case 'st':
            return 'Snooker or Table Tennis';
        case 'tu':
            return 'Table Tennis or American Pool';
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

Vue.filter('pluralGroupsText', function(num) {
    if (num === 1) { // if value is only 1, the correct grammar would be '1 group'
        return '1 group';
    } else { // if value more or less than 1, the correct grammar would be 'x groups'
        return `${num} groups`;
    }
});

Vue.filter('toAllCaps', function(string) {
    return string.toUpperCase();
});

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
                case 'ps':
                    return 'pool-or-snooker';
                case 't':
                    return 'table-tennis';
                case 'st':
                    return 'snooker-or-table-tennis';
                case 'tu':
                    return 'table-tennis-or-american';
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
            } else if (len < 12) {
                return 'smaller-text';
            } else {
                return 'smallest-text';
            }
        },
        displayFontSize: function(string) {
            let len = string.length;
            if (len < 4) {
                return 'big-display-text';
            } else if (len < 12) {
                return 'smaller-display-text';
            } else {
                return 'smallest-display-text';
            }
        }
    }
}).$mount('#app')
