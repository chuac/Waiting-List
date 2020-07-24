<template>
    <div>
        <li v-for="obj in getList()" v-bind:key="obj.id">
            {{ obj.person }}
        </li>
        
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'getWaitList',
        ])
    },
    methods: {
        getList: function() {
            return this.$store.state.waitList;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
