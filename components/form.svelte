<script lang="ts">
  import {
    useImportant,
    partnerName,
    verticals,
    vertical,
    image,
  } from '~/stores/form-data'
  import FileUpload from '~/components/file-upload.svelte'
  import Checkbox from '~/components/checkbox.svelte'
  import Select from '~/components/select.svelte'
  import Input from '~/components/input.svelte'
  import Label from '~/components/label.svelte'

  import Hr from './hr.svelte'
</script>

<form class="form">
  <div class="form-data">
    <div class="form-group">
      <Label htmlFor="name">Имя партнёра</Label>
      <Input onChange={value => partnerName.set(value)} value={$partnerName} />
    </div>
    <Hr />
    <div class="form-group">
      <Label htmlFor="name">Продукт</Label>
      <Select
        onChange={value => vertical.set(value)}
        options={verticals}
        value={$vertical}
      />
    </div>
    <Hr />
    <div class="form-group">
      <Label htmlFor="name">Использовать <code>!important</code></Label>
      <Checkbox
        onChange={value => useImportant.set(value)}
        value={$useImportant}
      />
    </div>
  </div>
  <FileUpload onChange={value => image.set(value)}>
    Загрузить картинку
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
      <g
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke="currentColor"
        stroke-width="2"
        fill="none"
      >
        <path
          d="M15 8h.01M12 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v7"
        />
        <path
          d="m3 16l5-5c.928-.893 2.072-.893 3 0l3 3m0 0l1-1c.928-.893 2.072-.893 3 0m-2 9l5-5m0 4.5V17h-4.5"
        />
      </g>
    </svg></FileUpload
  >
</form>

<style>
  .form {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
    container-type: inline-size;
  }

  .form-data {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-m);
    align-items: center;
    margin-block-start: var(--space-xs);

    @container (inline-size >= 600px) {
      grid-template-columns: 1fr auto 1fr auto;
    }

    @container (inline-size >= 980px) {
      grid-template-columns: 1fr auto 1fr auto 1fr;
    }
  }

  .form-group {
    display: flex;
    gap: var(--space-m);
    align-items: center;
  }

  .icon {
    inline-size: 16px;
    block-size: 16px;
  }
</style>
