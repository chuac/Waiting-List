<template>
    <div class="modal" v-bind:class="{'is-active': isAtStart()}">
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
import { mapActions, mapGetters } from 'vuex';

export default {
    props: ["notification"],
    computed: {
        ...mapGetters([
            'getIndexOfNotification'
        ]),
        isAtStartOfNotificationQueue() {
            if (this.getIndexOfNotification(this.notification) === 0) {
                return true;
            } else {
                return false;
            }
        }
    },
    data() {
        return {
            timeout: null, // to store setTimeout ID,
            show: false
        }
    },
    methods: {
        ...mapActions([
            'removePersonToCall'
        ]),
        close () {
          // destroy the vue listeners, etc
          this.$destroy();

          // remove the element from the DOM
          this.$el.parentNode.removeChild(this.$el);
        },
        isAtStart() {
            return (this.getIndexOfNotification(this.notification) === 0);
        }
    },
    created() {
        // if (this.isAtStart()) {
        //     this.timeout = setTimeout(() => {
        //         console.log('in timeout plus ID: ' + this.timeout);
        //         this.removePersonToCall(this.notification);
        //         //this.close();
        //     }, 3000);
        // }
        this.timeout = setTimeout(() => {
            console.log('in timeout plus ID: ' + this.timeout);
            this.removePersonToCall(this.notification);
            //this.close();
        }, 3000);
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
