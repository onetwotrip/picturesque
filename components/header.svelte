<script lang="ts">
  import PicturesqueLogo from '~/components/picturesque-logo.svelte'
  import ThemeToggle from '~/components/theme-toggle.svelte'
  import Container from '~/components/container.svelte'
  import OttLogo from '~/components/ott-logo.svelte'
</script>

<Container class="header" tag="header">
  <div class="logos">
    <OttLogo />
    <PicturesqueLogo />
  </div>
  <ThemeToggle />
</Container>

<style>
  :global(.header) {
    display: flex;
    gap: var(--space-l);
    align-items: center;
    justify-content: space-between;
    padding-block-start: 3rem !important;
  }

  .logos {
    display: flex;
    gap: var(--space-l);
  }
</style>
