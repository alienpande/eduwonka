<template>
    <div>
        <div style="color: #000000CC;font-weight:500;font-size:16px" >{{title}}</div>
        <div style="color: #00000099;font-size:17px;margin-top:10px">{{text}}</div>
    </div>
</template>
<script>
export default {
    props:['title','text']
}
</script>