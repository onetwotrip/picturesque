<script lang="ts">
  import { loading as codeLoading } from '~/stores/code'
  import { partnerName } from '~/stores/form-data'
  import Button from '~/components/button.svelte'
  import { loading, zip } from '~/stores/zip'

  $: download = () => {
    if ($zip && $partnerName) {
      let url = URL.createObjectURL($zip)

      let a = document.createElement('a')
      a.href = url
      a.download = `${$partnerName}.zip`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    }
  }
</script>

<Button loading={$codeLoading || $loading} onClick={download}>
  Скачать картинки
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
    <path
      d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5l5-5m-5-7v12"
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke="currentColor"
      stroke-width="2"
      fill="none"
    />
  </svg>
</Button>

<style>
  .icon {
    inline-size: 16px;
    block-size: 16px;
  }
</style>
