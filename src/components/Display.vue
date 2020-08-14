<template>
    <div>
        <div class="display-blah-container">
            <div class="display-container">
                <div class="display-list-item"  v-for="(obj, index) in getWaitList" v-bind:key="obj.id">
                    <span class="display-list-item-index">{{ index + 1 }}.</span>
                    <div class="display-list-item-data" v-bind:class="$root.gameTypeToClass(obj.gameTypes)">
                        <span class="display-list-item-person has-text-weight-bold">{{ obj.person }}</span>
                        <span class="display-list-item-game has-text-weight-semibold">{{ obj.gameTypes | expandGameTypes }}</span>
                    </div>
                </div>
                <!-- <ol>
                    <li>hi</li>
                    <li>hello</li>
                </ol>
                <ol type="1" class="display-list-container">
                    <span class="display-list-item-index">{{ index + 1 }}.</span> -->
                    <!-- <li class="display-list-item" v-bind:class="$root.gameTypeToClass(obj.gameTypes)" v-for="(obj) in getWaitList" v-bind:key="obj.id">
                        <span class="display-list-item-person has-text-weight-bold">{{ obj.person }}</span>
                        <span class="display-list-item-game has-text-weight-semibold">{{ obj.gameTypes | expandGameTypes }}</span>
                    </li>
                </ol> -->
            </div>

            
            <!-- <button ref="button"></button> invisible button to help firing speechSynthesis.speak() -->
            <!-- <notification-message v-if="getPeopleToCall" v-bind:notification="getPeopleToCall"/> -->
        </div>
        
        <notification-message 
            v-for="notification in getPeopleToCall" 
            v-bind:key="notification.id"
            v-bind:notification="notification"
        ></notification-message>
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
        document.title = 'Wait List Display';
        this.clearNotifications(); // clear notifications on each display refresh (prevents odd bug that notifications persist)
    },
    mounted() {
        // this.$refs.button.click(); // click an invisible button for Chrome to fire speechSynthesis.speak() https://www.chromestatus.com/feature/5687444770914304
        this.$refs.columns.click();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.display-container { // https://stackoverflow.com/a/51221889
    display: grid;
    // grid-template-columns: 25vw 25vw 25vw;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: row dense;
    column-gap: 0.5rem;
    padding: 0.3rem;
}

.display-container > :nth-child(-n + 5) {
    grid-column: 1;
}

.display-container > :nth-child(n + 6):nth-child(-n + 10) {
    grid-column: 2;
}

.display-container > :nth-child(n + 11):nth-child(-n + 15) {
    grid-column: 3;
}

// .display-list-container {
//     // display: table;
//     // border-collapse: separate;
//     // border-spacing: 0 8px;
//     // display: grid;
//     display: flex;
//     flex-direction: column;
//     // // list-style-type: decimal;
//     // // list-style-position: inside;
//     // // display: grid;
//     // // align-items: center;
//     // grid-template-columns: 1fr 1fr;
//     // grid-template-rows: auto;
// }

.display-list-item {
    // width: 100%;
    // // background: white;
    // padding: 0.05em;
    // margin-bottom: 1px;
    // width: 400px;
    // display: flex;
    display: grid;
    grid-template-columns: 13% 1fr; // 4rem 1fr
    align-items: center;
    // grid-template-columns: 40% 60%;
    padding-bottom: 0.3rem; // gap between each item

    .display-list-item-index{
        // display: table-cell;
        background-color: rgb(231, 231, 231); // same as body's bg color
        color: hsl(0, 0%, 15%);
        font-size: 3rem;
        border-right: 0.5rem solid transparent;
        // justify-self: left;
    }

    .display-list-item-data {
        display: grid;
        // grid-template-columns: minmax(5rem, 20%) minmax(4rem, 25%);
        grid-template-columns: 1fr 1fr;
        column-gap: 0.5rem;
        align-items: center;
        border-radius: 1rem;

        .display-list-item-person {
            // display: table-cell;
            font-size: 5rem;
            padding-left: 2rem;
            // border-left: 3vw solid transparent;
        }

        .display-list-item-game {
            // display: table-cell;
            font-size: 2rem;
            // border-left: 18vw solid transparent; // old value was 1em
            // border-right: 10vw solid transparent;
            // vertical-align: middle;
            // border-bottom: 0.3em solid transparent;
            // margin-bottom: 10px;
        }
    }

    
}

</style>
