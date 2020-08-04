<template>
    <div class="columns is-centered">
        <div class="column is-narrow">
            <div class="display-list-container">
                <div class="display-list-item" v-bind:class="$root.gameTypeToClass(obj.gameTypes)" v-for="obj in getWaitList" v-bind:key="obj.id">
                    <span class="display-list-item-person has-text-weight-bold">{{ obj.person }}</span>
                    <span class="display-list-item-game has-text-weight-semibold">{{ obj.gameTypes | expandGameTypes }}</span>
                </div>
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
import { mapGetters, mapActions } from 'vuex';

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
        ...mapActions([
            'clearNotifications'
        ]),
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
        this.clearNotifications(); // clear notifications on each display refresh (prevents odd bug that notifications persist)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.display-list-container {
    display: table;
    border-collapse: separate;
    border-spacing: 0 8px;
}

.display-list-item {
    // width: 100%;
    // // background: white;
    // padding: 0.05em;
    // margin-bottom: 1px;
    font-size: 5em;
    display: table-row;

    .display-list-item-person {
        display: table-cell;
        border-left: 0.5em solid transparent;
    }

    .display-list-item-game {
        display: table-cell;
        border-left: 1em solid transparent;
        border-right: 0.5em solid transparent;
    }
}

</style>
