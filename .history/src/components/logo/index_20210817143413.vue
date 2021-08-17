<template>
  <div class="aside__top_icon">
    <div class="aside__top--icon">icon</div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.aside__top_icon {
  height: 48px;
  line-height: 48px;
  position: fixed;
  left: 0px;
  top: 0;
  width: 200px;
  right: 0;
  background: #282c34;
  z-index: 1000;
  transition: left 0.25s;
  .aside__top--icon {
    color: #fff;
    text-align: center;
  }
}
</style>
