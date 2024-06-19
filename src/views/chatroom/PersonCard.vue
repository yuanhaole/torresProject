<template>
  <div class="person-card" >
    <div class="info">
      <div class="name">{{ personInfo.name }}</div>
    </div>
  </div>
</template>

<script>

export default {
  // TODO: 如果这个用户是自己，要在name后面加一个(我)
  props: {
    personInfo: { 
      default: {
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.person-card {
  width: 250px;
  height: 80px;
  border-radius: 10px;
  background-color: #a49d93;
  position: relative;
  margin: 25px 0;

  .info {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    display: flex;
      .name {
        color: #fff;
        font-size: 22px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 5px;
      }
  }
  &:hover {
    background-color: rgb(95, 87, 76);
    transition: 0.3s;
    box-shadow: 0px 0px 10px 0px rgba(95, 87, 76);
    // box-shadow:  0 5px 20px rgba(251, 152, 11, .5);
  }
}
</style>