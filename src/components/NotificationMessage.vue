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
                        <section v-bind:class="$root.gameTypeToClass(notification.gameTypes)" class="blinking">
                            <span>{{ notification.person }}</span>
                        </section>
                        
                    </article>
                </div>
            </div>
            
        </div>
        {{ notification.person }}
        <text-to-speech v-if="isAtStart()" v-bind:message="buildTTSMessage"/>
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
        },
        buildTTSMessage() {
            let person = this.notification.person;
            if ( !isNaN(parseFloat(person)) && isFinite(person) ) { // check if the string of person is a number...https://stackoverflow.com/a/52986361
                return `Calling number ${this.notification.person}`;
            } else {
                return `Calling ${this.notification.person}`;
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
        }
    },
    created() {
        this.intervalTimer = setInterval(() => {
            if (this.isAtStart()) { // if notification is at front of the queue then cancel the 100ms interval timer, and start our long timer for displaying this notification
                clearInterval(this.intervalTimer);

                this.timeout = setTimeout(() => {
                    this.removePersonToCall(this.notification);
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
.modal-content {
    //  width: 600px;
    overflow: hidden; // to hide scrollbars for modal

    .message {
        font-size: 5rem;
        text-align: center;

        section {
            padding: 1em;

            span {
                font-size: 10rem; // make this larger
            }
        }
    }
}

.blinking{
    animation:blinkingText 1s infinite;
}
// @keyframes blinkingText{
//     0%{     color: #000;    }
//     49%{    color: #000; }
//     60%{    color: transparent; }
//     99%{    color: transparent;  }
//     100%{   color: #000;    }
// }
@keyframes blinkingText{
    0%{     color: inherit;    }
    49%{    color: inherit; }
    60%{    color: transparent; }
    99%{    color: transparent;  }
    100%{   color: inherit;    }
}

</style>
