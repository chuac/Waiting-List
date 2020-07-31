
<script>
import { mapGetters } from 'vuex';

export default {
    template: `
        <draggable v-model="waitList" ghost-class="ghost" @end="onEnd" handle=".handle">
            <transition-group type="transition" name="table-list">
                <tr v-for="(obj) in getWaitList" v-bind:key="obj.id">
                    <td><i class="fa fa-align-justify handle"></i></td>
                    <td>{{ obj.person }}</td>
                    <td>{{ obj.gameTypes | expandGameTypes }}</td>
                </tr>
            </transition-group>
        </draggable>
    `,
    computed: {
        ...mapGetters([
            'getWaitList'
        ]),
    },
    mounted() {
        console.log('lol');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
