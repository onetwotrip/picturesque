export interface Response {
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
  gradient: string
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
