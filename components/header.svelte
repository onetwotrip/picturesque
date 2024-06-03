<script lang="ts">
  import PicturesqueLogo from '~/components/picturesque-logo.svelte'
  import Container from '~/components/container.svelte'
  import OttLogo from '~/components/ott-logo.svelte'
</script>

<Container class="header" tag="header">
  <OttLogo />
  <PicturesqueLogo />
</Container>

<style>
  :global(.header) {
    display: flex;
    gap: var(--space-l);
    padding-block-start: 3rem !important;
  }
</style>
