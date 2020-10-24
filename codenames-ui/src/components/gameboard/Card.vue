<template>
<div class="card">{{ word }}</div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        word: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.card {
    background: beige;
    border: 1px solid black;
    border-radius: 5px;
    width: 150px;
    height: 75px;
}
</style>
