<script lang="ts">
  import { writable } from 'svelte/store'

  import { image } from '~/stores/form-data'

  $: imageUrl = writable<string | null>(null)

  $: if ($image) {
    let reader = new FileReader()
    reader.readAsDataURL($image)
    reader.onloadend = () => {
      $imageUrl = reader.result as string
    }
  }
</script>

{#if $imageUrl}
  <img alt="Превью картинки" src={$imageUrl} class="image" />
{/if}

<style>
  .image {
    inline-size: 100%;
    block-size: 200px;
    object-fit: cover;
    border: 1px solid var(--color-border-primary);
    border-radius: var(--border-radius);
  }
</style>
