<template>
    <div class="columns is-centered">
        <div class="column is-narrow">
            <div class="content">
                <ul>
                    <li class="display-list-item" v-for="obj in getWaitList" v-bind:key="obj.id">
                        <strong>{{ obj.person + ' ' + obj.gameTypes }}</strong>
                    </li>
                </ul>
            </div>

            <notification-message 
                v-for="notification in getPeopleToCall" 
                v-bind:key="notification.id"
                v-bind:notification="notification"
            ></notification-message>
            <!-- <notification-message v-if="getPeopleToCall" v-bind:notification="getPeopleToCall"/> -->
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
        getPeople: async function() {
            await this.$nextTick();
            return this.$store.state.peopleToCall[0];
        }
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
<style scoped lang="scss">
li {
    list-style-type : none; // remove bullet points
    
}

.display-list-item {
    width: 100%;
    background: white;
    padding: 0.05em;
    margin-bottom: 1px;
    font-size: 5em;
}
</style>
