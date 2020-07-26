<template>
    <div class="columns is-centered">
        <div class="column is-narrow">
            <div class="content">
                <ol type="1">
                    <li v-for="obj in getWaitList" v-bind:key="obj.id">
                        <strong>{{ obj.person }}</strong>
                    </li>
                </ol>
            </div>

            <notification-message 
                v-for="notification in getPeopleToCall" 
                v-bind:key="notification.id"
                v-bind:notification="notification"
            ></notification-message>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

//import { bus } from '../main';
import NotificationMessage from './NotificationMessage';

export default {
    components: {
        'notification-message': NotificationMessage
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'getWaitList',
            'getPeopleToCall'
        ])
    },
    methods: {

    },
    created() {
        // bus.$on('personClicked', (data) => {
        //     this.test = data;
        //     console.log('in display');
        //     console.log(data);
        // });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
    font-size: 5em;
}
</style>
