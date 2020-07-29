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
                        <div v-bind:class="$root.gameTypeToClass(notification.gameTypes)" class="message-body blinking">
                            {{ notification.person }}
                        </div>
                        
                    </article>
                </div>
            </div>
            
        </div>
        <text-to-speech v-if="isAtStart()" v-bind:message="`Calling ${notification.person}`"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TextToSpeech from './TextToSpeech.vue'

export default {
    components: {
        'text-to-speech': TextToSpeech
    },
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
            intervalTimer: null,
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
        },
        buildTTSMessage() {
            
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
        // this.timeout = setTimeout(() => {
        //     console.log('in timeout plus ID: ' + this.timeout);
        //     this.removePersonToCall(this.notification);
        //     //this.close();
        // }, 3000);
        // this.intervalTimer = setInterval(this.showOrNot(), 100);
        this.intervalTimer = setInterval(() => {
            if (this.isAtStart()) {
                clearInterval(this.intervalTimer);

                this.timeout = setTimeout(() => {
                    console.log('in timeout plus ID: ' + this.timeout);
                    this.removePersonToCall(this.notification);
                    //this.close();
                }, 5000);
            }
        }, 100); // check every 100ms if this notification is at the front of the queue
    },
    beforeDestroy() {
        clearInterval(this.intervalTimer);
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

        .message-body {
            font-size: 5rem; // make this larger
        }
    }
}

.blinking{
    animation:blinkingText 1.2s infinite;
}
@keyframes blinkingText{
    0%{     color: #000;    }
    49%{    color: #000; }
    60%{    color: transparent; }
    99%{    color:transparent;  }
    100%{   color: #000;    }
}

</style>
