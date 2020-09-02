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
            interval: null // hold the setInterval timer ID to be cleared if needed
        }
    },
    methods: {
        getRelativeTime: function () {
            this.relativeTime = moment(this.created_at).fromNow(); // Moment.js package returns a relative time string
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
