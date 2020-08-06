<template>
    <div>
        Added {{ relativeTime }}
    </div>
</template>

<script>
import moment from 'moment';

export default {
    props: ['created_at'],
    data () {
        return {
            relativeTime: null,
            interval: null
        }
    },
    methods: {
        getRelativeTime: function () {
            this.relativeTime = moment(this.created_at).fromNow();
        }
    },
    created() {
        this.getRelativeTime();
        this.interval = setInterval(this.getRelativeTime, 30000); // update every 30 seconds
    },
    beforeDestroy() {
        clearInterval(this.interval);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
