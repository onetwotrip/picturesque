import type { HandlerResponse, HandlerEvent, Handler } from '@netlify/functions'

import busboy from 'busboy'
import sharp from 'sharp'
import Jimp from 'jimp'

interface Image {
  filename: string
  content: Buffer
  type: string
}

interface Fields {
  [key: string]: Image[] | string
  image: Image[]
}

let parseMultipartForm = (event: HandlerEvent): Promise<Fields | null> =>
  new Promise((resolve, reject) => {
    let fields: Fields = { image: [] }
    let bb = busboy({ headers: event.headers })

    bb.on('file', (name, file, info) => {
      let { filename, mimeType } = info
      let chunks: Buffer[] = []

      file.on('data', data => {
        chunks.push(data)
      })

      file.on('end', () => {
        let fieldValue = fields[name]
        if (typeof fieldValue !== 'string') {
          fieldValue.push({
            content: Buffer.concat(chunks),
            type: mimeType,
            filename,
          })
        }
      })
    })

    bb.on('field', (name, value) => {
      fields[name] = value
    })

    bb.on('close', () => {
      resolve(fields)
    })

    bb.on('error', err => {
      reject(err)
    })

    bb.end(Buffer.from(event.body!, 'base64'))
  })

let rgbaToHex = ({ r, g, b }: { r: number; g: number; b: number }): string =>
  `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`

let generateImages = async (buffer: Buffer, quality: number) => {
  let metadata = await sharp(buffer).metadata()
  let { height, width } = metadata
  let sizes = [
    {
      width: typeof width === 'number' && width > 2600 ? 2600 : null,
      suffix: 'desktop',
    },
    { suffix: 'tablet', width: 1200 },
    { suffix: 'mobile', width: 768 },
  ] as const

  let formats = [{ format: 'webp', quality }] as const

  let imagePromises = []

  for (let size of sizes) {
    for (let format of formats) {
      let resizedImage = size.width
        ? sharp(buffer).resize({
            position: 'center',
            width: size.width,
            fit: 'cover',
            height,
          })
        : sharp(buffer)

      let promise = resizedImage
        .toFormat(format.format, { quality: format.quality })
        .toBuffer()
        .then(imageBuffer => {
          let key = `${size.suffix}_${format.format}`
          return { base64: imageBuffer.toString('base64'), key }
        })

      imagePromises.push(promise)
    }
  }

  let results = await Promise.all(imagePromises)

  type Images = Record<
    (typeof formats)[number]['format'],
    {
      [key in (typeof sizes)[number]['suffix']]: string
    }
  >

  let images: Images = formats.reduce(
    (accumulator, { format }) => ({ ...accumulator, [format]: {} }) as Images,
    {} as Images,
  )

  for (let result of results) {
    let [size, format] = result.key.split('_') as [
      (typeof sizes)[number]['suffix'],
      (typeof formats)[number]['format'],
    ]
    images[format][size] = result.base64
  }

  return images
}

let getSizes = async (
  buffer: Buffer,
  images: { desktop: string; mobile: string },
) => {
  let originalMetadata = await sharp(buffer).metadata()
  let clean = (image: string) => Buffer.from(image, 'base64')
  return {
    desktop: clean(images.desktop).length,
    mobile: clean(images.mobile).length,
    original: originalMetadata.size,
  }
}

interface Gradients {
  'to right bottom': string
  'to right top': string
  'to bottom': string
  'to right': string
}

const getGradients = async (buffer: Buffer): Promise<Gradients> => {
  let img = await Jimp.read(buffer)
  let { height, width } = img.bitmap

  let points = {
    'to right bottom': [
      { y: height / 4, x: width / 4 },
      { y: height / 2, x: width / 2 },
      { y: (3 * height) / 4, x: (3 * width) / 4 },
    ],
    'to right top': [
      { y: (3 * height) / 4, x: width / 4 },
      { y: height / 2, x: width / 2 },
      { x: (3 * width) / 4, y: height / 4 },
    ],
    'to bottom': [
      { y: height / 2, x: width / 4 },
      { y: height / 2, x: width / 2 },
      { x: (3 * width) / 4, y: height / 2 },
    ],
    'to right': [
      { y: height / 4, x: width / 4 },
      { y: height / 4, x: width / 2 },
      { x: (3 * width) / 4, y: height / 4 },
    ],
  }

  let gradients: Record<keyof Gradients, string> = {} as Record<
    keyof Gradients,
    string
  >

  for (let direction in points) {
    let colors = points[direction as keyof typeof points].map(point =>
      rgbaToHex(Jimp.intToRGBA(img.getPixelColor(point.x, point.y))),
    ) as [string, string, string]
    gradients[direction as keyof Gradients] =
      `linear-gradient(${direction}, ${colors.join(', ')})`
  }

  return gradients
}

export let handler: Handler = async (
  event: HandlerEvent,
): Promise<HandlerResponse> => {
  if (event.httpMethod !== 'POST') {
    return {
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      statusCode: 405,
    }
  }

  try {
    let fields = await parseMultipartForm(event)

    if (!fields) {
      throw new Error('Unable to parse image')
    }

    let [image] = fields.image
    let buffer = image.content
    let quality = parseInt(fields.quality as string, 10)

    /**
     * Generate a gradient from the image's center points
     */
    let gradients = await getGradients(buffer)

    /**
     * Generate WebP
     */
    let images = await generateImages(buffer, quality)

    /**
     * Get the sizes of the images
     */
    let sizes = await getSizes(buffer, images.webp)

    return {
      body: JSON.stringify({
        gradients,
        images,
        sizes,
      }),
      statusCode: 200,
    }
  } catch (error) {
    return {
      body: JSON.stringify({ message: error?.toString() }),
      statusCode: 400,
    }
  }
}
