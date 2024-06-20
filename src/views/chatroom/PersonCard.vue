<template>
  <div class="person-card" >
    <div class="info">
      <div class="name">{{ personInfo.name }}</div>
    </div>
  </div>
</template>

<script>

export default {
  // TODO: 如果這個用戶是自己，要在name後面加一個(我)
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
  width: 200px;
  height: 45px;
  border-radius: 10px;
  background-color: #e3e3e3;
  position: relative;
  margin: 15px 0;
  margin-left: 15px;
  .info {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    display: flex;
      .name {
        color: black;
        font-size: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 5px;
      }
  }
  &:hover {
    background-color: #e3e3e3(95, 87, 76);
    transition: 0.3s;
    box-shadow: 0px 0px 5px 0px #e3e3e3(95, 87, 76);
  }
}
</style>