<script lang="ts">
  import Upploads from "./components/Uploads.svelte";
  import Button from "./components/Button.svelte";
  let fileVar: FileList;
  let backendPort = 5000;
  let submit = async () => {
    let formData = new FormData();
    console.log(fileVar);

    formData.append("files", fileVar[0]);
    // /formData.append("text", textTest);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    const res = await fetch(`http://localhost:${backendPort}/upload`, {
      method: "POST",
      body: formData as FormData,
    });
    console.log(res);
  };
</script>

<main>
  <h1>Welcome to the Picture Zone!</h1>
  <p>Uppload a picture to see it in the feed below!</p>
  <form class="form">
    <label class="file-upload-label" for="file-upload"
      >Click here to uppload a picture</label
    >
    <input id="file-upload" type="file" bind:files={fileVar} />
    <Button text={"Submit"} onClick={submit} />
  </form>
  <br />

  <Upploads {backendPort} />
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
