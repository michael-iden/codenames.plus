<template>
<div>
    <div>
        Play online with your friends
    </div>
    <button v-if="!showRoomInput" @click="showRoomInput = true">Create new room</button>
    <div v-if="showRoomInput">
        <label for="roomName">Room name:</label>
        <input id="roomName" v-model="roomName" type="text" maxlength="25" />
        <button @click="createRoom">Create</button>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            showRoomInput: false,
            roomName: ""
        }
    },
    methods: {
        createRoom() {
            this.$socket.emit("createRoom", this.roomName);
        }
    },
    sockets: {
        createResponse: (data) => {
            if (data.success) {
                console.log("SUCCESS")
            }
        }
    }
}
</script>

<style>

</style>
