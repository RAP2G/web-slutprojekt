<script lang="ts">
  import Upploads from "./components/Upploads.svelte";
  import Button from "./components/Button.svelte";

  let submit = () => {
    console.log("Hello!");
  };
</script>

<main>
  <h1>Welcome to the Picture Zone!</h1>
  <p>Uppload a picture to see it in the feed below!</p>
  <form class="form" action="">
    <label class="file-upload-label" for="file-upload"
      >Click here to uppload a picture</label
    >
    <input id="file-upload" type="file" />
    <Button text="Submit" onClick={submit} />
  </form>
  <br />

  <Upploads />
</main>

<style>
  .file-upload-label {
    border: none;
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
  }
  input[type="file"] {
    border: none;
    display: none;
  }
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
