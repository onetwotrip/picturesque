<script lang="ts">
  import SizeStatus from '~/components/size-status.svelte'
  import Container from '~/components/container.svelte'
  import CopyCode from '~/components/copy-code.svelte'
  import Download from '~/components/download.svelte'
  import Gradient from '~/components/gradient.svelte'
  import Header from '~/components/header.svelte'
  import Title from '~/components/title.svelte'
  import Image from '~/components/image.svelte'
  import Form from '~/components/form.svelte'
  import Code from '~/components/code.svelte'
  import { repository } from '~/package.json'
  import { firstLoad } from '~/stores/code'
</script>

<Header />
<Container>
  <Form />
</Container>
<Container class="content">
  <div class="images">
    <div class="image-container">
      <Title>Картинка</Title>
      <Image />
    </div>
    <div class="image-container">
      <Title>Градиент</Title>
      <Gradient />
    </div>
    {#if !$firstLoad}
      <div>
        <Title>Результат</Title>
        <SizeStatus />
      </div>
    {/if}
  </div>
  <div>
    <Title>Код</Title>
    <Code />
  </div>
</Container>
<Container class="info">
  <a
    href={`https://github.com/${repository}`}
    rel="noopener noreferrer"
    target="_blank"
  >
    Исходный код
  </a>
  <div class="buttons">
    <CopyCode />
    <Download />
  </div>
</Container>

<style>
  :global(.content) {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-l);
    margin-block-start: var(--space-l);

    @container (inline-size >= 860px) {
      grid-template-columns: 2fr minmax(0, 3fr);
    }
  }

  :global(.info) {
    display: flex;
    flex-direction: column;
    gap: var(--space-l);
    align-items: start;
    justify-content: space-between;
    margin-block-end: var(--space-xl);

    @container (inline-size >= 860px) {
      flex-direction: row;
      align-items: center;
    }
  }

  .image-container {
    max-inline-size: 600px;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);

    @container (inline-size >= 480px) {
      flex-direction: row;
      justify-content: end;
    }
  }

  .images {
    display: flex;
    flex-direction: column;
    gap: var(--space-l);
  }
</style>
