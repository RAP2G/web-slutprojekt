<script lang="ts">
  export let backendPort;

  interface IPost {
    id: string;
    createdAt: string;
    picture: string;
  }

  let posts: IPost[] = [];
  // Ber backend om alla poster i databasen
  const getFeed = async () => {
    const res = await window
      .fetch(`http://localhost:${backendPort}/feed`, {
        method: "get",
      })
      .then((res) => res.json());
    return res;
  };

  (async () => {
    posts = await getFeed();
    console.log(posts);
  })();

  setInterval(async () => {
    posts = await getFeed();
  }, 10000);
</script>

<div class="feed">
  <!-- Om det finns poster det skapar en div element för varje -->
  {#if posts.length > 0}
    {#each posts as post}
      <div
        style="background-image: url({post.picture});background-size: cover; background-repeat: no-repeat; min-height: 25vh;"
      />
    {/each}
  {/if}
</div>

<style>
  .feed {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1%;
    /* grid-auto-rows: minmax(50px, auto); */
  }

  /* Ändrar antalet kolumner som gridene består av beroende på bredden av skärmen*/

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
