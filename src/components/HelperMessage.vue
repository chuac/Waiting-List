<template>
    <div class="modal is-active">
        <div v-on:click="closeMessage()" class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head has-background-primary">
                <p class="modal-card-title">Help Page</p>
                <button v-on:click="closeMessage()" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="content">
                    <h4 class="title is-4">Adding a new person to the wait list</h4>
                    
                    <ol>
                        <li>
                            Enter one of these Game Type codes:
                            <ul>
                                <li><span class="is-italic has-text-weight-semibold">A</span> for Any</li>
                                <li><span class="is-italic has-text-weight-semibold">P</span> for Pool</li>
                                <li><span class="is-italic has-text-weight-semibold">S</span> for Snooker</li>
                                <li><span class="is-italic has-text-weight-semibold">TT</span> for Table Tennis</li>
                                <li><span class="is-italic has-text-weight-semibold">U</span> for American Pool</li>
                                <li><span class="is-italic has-text-weight-semibold">PU</span> for Pool or American Pool</li>
                                <li><span class="is-italic has-text-weight-semibold">PT</span> for Pool or Table Tennis</li>
                            </ul>
                        </li>
                        <li>
                            Enter their name or number. This has to be unique.
                        </li>
                        <li>
                            Add any optional remarks
                        </li>
                    </ol>
                    
                    <hr>
                    <h4 class="title is-4 is-spaced">Re-ordering a person</h4>
                    <p class="subtitle is-6 has-text-justified">
                        Click-and-drag the <i>handle</i> <i class="fa fa-align-justify handle"></i>
                        next to each person.
                    </p>
                    <hr>
                    <h4 class="title is-4 is-spaced">Editing a person</h4>
                    <p class="subtitle is-6 has-text-justified">
                        Click the <i>edit button</i> <i class="far fa-edit edit-button"></i>,
                        change any values then press <i>Enter</i> or click the <i>tick</i> <i class="fas fa-check-square fa-lg"></i>
                        to save changes.
                    </p>
                    <hr>
                    <h4 class="title is-4 is-spaced">Calling a person</h4>
                    <p class="subtitle is-6 has-text-justified">
                        Clicking the <i>call button</i> <i class="fa fa-volume-up call-button"></i> will add that person to
                        the queue. Their name or number will eventually be flashing on the Display page, with a robotic voice calling them.
                    </p>
                    <hr>
                    <h4 class="title is-4 is-spaced">Deleting a person</h4>
                    <p class="subtitle is-6 has-text-justified">
                        Click the grey <i>delete button</i> <i class="delete"></i> and then the <i>red button</i> <i class="delete confirm-delete"></i>
                        to confirm the deletion.
                    </p>
                    <hr>
                    <h4 class="title is-4 is-spaced">Clearing the whole waiting list</h4>
                    <p class="subtitle is-6 has-text-justified">
                        Waiting list data isn't deleted even if the browser is closed so use the <i>yellow button</i>
                        <button class="button is-small is-warning">Clear Waiting List</button> to clear all data.
                    </p>
                    <hr>
                    <h4 class="title is-4 is-spaced">Opening the Display page</h4>
                    <p class="subtitle is-6 has-text-justified">
                        Click on the <i>display icon</i> <i class="fa fa-desktop"></i> to open the Display page
                        in another tab.
                    </p>
                    
                    <hr>
                </div>
                
            </section>
            <!-- <footer class="modal-card-foot">
                <button v-on:click="closeMessage()" class="button is-primary">Close</button>
            </footer> -->
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeMessage: function() {
            this.$emit('close-message'); // emit this custom event when user clicks a valid close area
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
section {
    .delete {
        pointer-events: none; // disable the hover effect of this icon, necessary for the red icon to show properly
    }

    .confirm-delete {
        background-color: red;
    }

    .button {
        pointer-events: none;
    }
}

</style>
