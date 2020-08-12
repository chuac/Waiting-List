<template>
    <div class="columns is-centered" ref="columns">
        <div class="column is-narrow">
            <div>
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
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'getWaitList',
            'getWaitListPaginate'
        ])
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
