<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <!-- Any other Bulma elements you want -->
            
            <article class="message">
                NOW CALLING {{ notification.message }}
            </article>
        </div>

    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: ["notification"],
    data() {
        return {
            timeout: null // to store setTimeout ID
        }
    },
    methods: {
        ...mapActions([
            'removePersonToCall'
        ]),
    },
    created() {
        this.timeout = setTimeout(() => {
            this.removePersonToCall(this.notification);
        }, 5000);
    },
    beforeDestroy() {
        clearTimeout(this.timeout);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modal-content { /* delete confirmation modal */
    width: 600px;

    article {
        font-size: 8em;
    }
}
</style>
