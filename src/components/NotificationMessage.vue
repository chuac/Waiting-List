<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="columns">
                <div class="column is-full">
                    <article class="message">
                        <div class="message-header">
                            NOW CALLING: 
                        </div>
                        <div class="message-body">
                            {{ notification.message }}
                        </div>
                        
                    </article>
                </div>
            </div>
            
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
    // width: 600px;
    overflow: hidden; // to hide scrollbars for modal

    .message {
        font-size: 5rem;
        text-align: center;
    }
}
</style>
