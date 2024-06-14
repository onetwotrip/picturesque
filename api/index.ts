export interface Response {
  gradients: {
    'to right bottom': string
    'to right top': string
    'to bottom': string
    'to right': string
  }
  images: {
    webp: {
      desktop: string
      mobile: string
      tablet: string
    }
  }
  sizes: {
    original: number
    desktop: number
    mobile: number
  }
}

export let picturesque = async (image: File): Promise<Response> => {
  let formData = new FormData()
  formData.append('image', image)
  let response = await fetch('/.netlify/functions/picturesque', {
    body: formData,
    method: 'POST',
  })
  return await response.json()
}
