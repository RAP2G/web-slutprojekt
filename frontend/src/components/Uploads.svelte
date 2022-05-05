<script lang="ts">
</script>

<div class="feed">
  <div style="background-image: url(/karat.jpg);" />
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
  <div />
</div>

<style>
  .feed {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1%;
    /* grid-auto-rows: minmax(50px, auto); */
  }
  .feed div {
    width: 100%;
    height: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #d6a7bd;
  }

  @media only screen and (max-width: 1920px) {
    .feed {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  @media only screen and (max-width: 1200px) {
    .feed {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media only screen and (max-width: 800px) {
    .feed {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media only screen and (max-width: 600px) {
    .feed {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
