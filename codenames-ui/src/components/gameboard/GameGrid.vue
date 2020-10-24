<template>
<div class="game-grid">
    <Card v-for="word in words" :key="word" :word="word" />
</div>
</template>

<script>
import Card from './Card'

export default {
    name: 'GameGrid',
    components: {
        Card
    },
    props: {
        words: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>
.game-grid {
    display: grid;
    grid-template: repeat(5, 75px) / repeat(5, 150px);
    gap: 10px 10px;
}
</style>
