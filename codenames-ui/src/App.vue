<template>
<div>
    <Lobby v-if="words.length == 0" />
    <GameGrid 
        v-else 
        :words="words" 
    />
</div>
</template>

<script>
import GameGrid from './components/gameboard/GameGrid'
import Lobby from './components/Lobby'

export default {
    name: 'App',
    components: {
        Lobby,
        GameGrid
    },
    data() {
        return {
            words: []
        }
    },
    mounted() {
        this.$socket.emit("doThing", "BLAHHHH");
    },
    sockets: {
        connect: function () {
            console.log('socket connected')
        },
        // game: function (data) {
        //     this.words = data.words.slice(0, 25);
        // }
    },
}
</script>

<style>
</style>
