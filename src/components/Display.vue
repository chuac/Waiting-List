<template>
    <div class="">
        <div class="">
            <div>
                <div class="display-list-header">
                    <div></div>
                    <span>Waiting Number</span>
                </div>
                
                <div v-for="(obj, index) in getWaitList" v-bind:key="obj.id">
                    <div class="display-list-item">
                        <span class="display-list-item-index">{{ index + 1 }}.</span>
                        <div class="display-list-item-data" v-bind:class="$root.gameTypeToClass(obj.gameTypes)">
                            <span class="display-list-item-person has-text-weight-bold" v-bind:class="$root.displayFontSize(obj.person)">{{ obj.person }}</span>
                            <span class="display-list-item-game has-text-weight-bold">{{ obj.gameTypes | expandGameTypes | toAllCaps }}</span>
                        </div>
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
    <!-- <div>
        <div class="display-blah-container">
            <div class="display-container">
                <div v-for="(obj, index) in getWaitList" v-bind:key="obj.id">
                    <hr v-if="index === 15 || index === 20 || index === 25 || index === 30 || index === 35 || index === 40">
                    <div class="display-list-item">
                        <span class="display-list-item-index">{{ index + 1 }}.</span>
                        <div class="display-list-item-data" v-bind:class="$root.gameTypeToClass(obj.gameTypes)">
                            <span class="display-list-item-person has-text-weight-bold" v-bind:class="$root.displayFontSize(obj.person)">{{ obj.person }}</span>
                            <span class="display-list-item-game has-text-weight-semibold">{{ obj.gameTypes | expandGameTypes }}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
        <notification-message 
            v-for="notification in getPeopleToCall" 
            v-bind:key="notification.id"
            v-bind:notification="notification"
        ></notification-message>
    </div> -->
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
        // this.$refs.columns.click();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.big-display-text {
    font-size: 6rem;
}

.smaller-display-text {
    font-size: 4.5rem;
}

.smallest-display-text {
    font-size: 3rem;
}

.display-container { // https://stackoverflow.com/a/51221889
    display: grid;
    // grid-template-columns: 25vw 25vw 25vw;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    // grid-template-rows: repeat(5, minmax(20%, 1fr));
    grid-auto-flow: row dense;
    column-gap: 0.5rem;
    padding: 0.3rem;
    padding-right: 1.5rem;
    padding-left: 1rem;
}

.display-container > :nth-child(-n + 5),
.display-container > :nth-child(n + 16):nth-child(-n + 20),
.display-container > :nth-child(n + 31):nth-child(-n + 35) {
    grid-column: 1;
}

.display-container > :nth-child(n + 6):nth-child(-n + 10),
.display-container > :nth-child(n + 21):nth-child(-n + 25),
.display-container > :nth-child(n + 36):nth-child(-n + 40) {
    grid-column: 2;
}

.display-container > :nth-child(n + 11):nth-child(-n + 15),
.display-container > :nth-child(n + 26):nth-child(-n + 30),
.display-container > :nth-child(n + 41):nth-child(-n + 45) {
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

// hr {
//     // position: absolute;
//     display: contents;
// }

// .display-list-item {
//     // width: 100%;
//     // // background: white;
//     // padding: 0.05em;
//     // margin-bottom: 1px;
//     // width: 400px;
//     // display: flex;
//     display: grid;
//     grid-template-columns: 13% 1fr; // 4rem 1fr
//     // grid-template-rows: 1fr;
//     align-items: center;
//     // grid-template-columns: 40% 60%;
//     padding-bottom: 0.3rem; // gap between each item

//     .display-list-item-index{
//         // display: table-cell;
//         background-color: rgb(231, 231, 231); // same as body's bg color
//         color: hsl(0, 0%, 15%);
//         font-size: 3rem;
//         // border-right: 0.5rem solid transparent;
//         // justify-self: left;
//     }

//     .display-list-item-data {
//         display: grid;
//         // grid-template-columns: minmax(5rem, 20%) minmax(4rem, 25%);
//         grid-template-columns: 1fr 1fr;
//         column-gap: 0.5rem;
//         align-items: center;
//         border-radius: 1rem;

//         .display-list-item-person {
//             // display: table-cell;
//             // font-size: 5rem; // now dynamically provided
//             padding-left: 2rem;
//             // border-left: 3vw solid transparent;
//         }

//         .display-list-item-game {
//             // display: table-cell;
//             font-size: 2rem;
//             // padding-right: 0.3rem;
//             // border-left: 18vw solid transparent; // old value was 1em
//             // border-right: 10vw solid transparent;
//             // vertical-align: middle;
//             // border-bottom: 0.3em solid transparent;
//             // margin-bottom: 10px;
//         }
//     }

.display-list-header {
    font-size: 4rem;
    font-weight: 600;
    padding-left: 1.5rem;

    display: grid;
    grid-template-columns: 7% 80vw; // recreate column alignment like display-list-item
    justify-content: center;
}

.display-list-item {
// width: 100%;
// // background: white;
// padding: 0.05em;
// margin-bottom: 1px;
// width: 400px;
display: grid;
grid-template-columns: 7% 80vw;
justify-content: center;
align-items: center;
// grid-template-columns: 40% 60%;
padding-bottom: 0.3rem;
.display-list-item-index{
    // display: table-cell;
    background-color: rgb(231, 231, 231); // same as body's bg color
    color: hsl(0, 0%, 15%);
    font-size: 4.3em;
    border-right: 1.5vw solid transparent;
    justify-self: right;
}
.display-list-item-data {
    display: grid;
    grid-template-columns: minmax(150px, 30%) minmax(0, 1fr); // 40vw 50vw. minmax(100px, min-content) minmax(0, 1fr)
    // column-gap: 0.5rem;
    // display: flex;
    align-items: center;
    border-radius: 1rem;
    border: 4px solid black;

    .display-list-item-person {
        // display: table-cell;
        // font-size: 6rem;
        // padding-left: 0rem;
        justify-self: center;
        // border-left: 3vw solid transparent;
    }
    .display-list-item-game {
        // display: table-cell;
        // padding-left: 20rem;
        font-size: 3.5rem;
        // border-left: 18vw solid transparent; // old value was 1em
        // border-right: 10vw solid transparent;
        // vertical-align: middle;
        // border-bottom: 0.3em solid transparent;
        // margin-bottom: 10px;
    }
}
    
}

</style>
