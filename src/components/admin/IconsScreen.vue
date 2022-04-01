<template>
    <h1>Иконки:</h1>
    <div class="icons-wrapper">
        <div v-for="icon in icons" :key="icon" class="box" style="font-size: 30px">
            <i class="ci" :class="`ci-${icon}`"/>
            <div class="tooltip" v-text="icon"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "IconsScreen",
    data: () => ({
        icons: [
            'warning',
            'cloud',
            'locked',
            'inbox',
            'comment',
            'mic',
            'envelope',
            'briefcase',
            'cart',
            'contrast',
            'clock',
            'user',
            'cog',
            'music',
            'twitter',
            'pencil',
        ]
    })
}
</script>

<style scoped>
.icons-wrapper {
    display: flex;
    flex-wrap: wrap;
}
.box {
    background: grey;
    padding: 5px;
    margin: 5px;
    transition: .3s;
    position: relative;
    cursor: pointer;
}
.box:hover {
    transform: scale(2);
}
.box:hover .tooltip {
    display: block;
}
.tooltip {
    transition: .3s;
    display: none;
    position: absolute;
}
</style>
