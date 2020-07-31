import WaitList from './components/WaitList.vue';
import WaitListTable from './components/WaitListTable.vue';
import Display from './components/Display.vue';

export default [
    {
        path: '/',
        component: WaitList
    },
    {
        path: '/table',
        component: WaitListTable
    },
    {
        path: '/display',
        component: Display
    }
]