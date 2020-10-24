<template>
<div>
    <GameGrid :words="words" />
</div>
</template>

<script>
import GameGrid from './components/gameboard/GameGrid'

export default {
    name: 'App',
    components: {
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
        game: function (data) {
            this.words = data.words.slice(0, 25);
        }
    },
}
</script>

<style>
</style>
