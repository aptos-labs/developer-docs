/* eslint-env node */
import { ImageResponse } from '@vercel/og'
import { docsConfig } from '@docs-config';

export const config = {
  runtime: 'edge'
}

const font = fetch(new URL('./Inter-SemiBold.otf', import.meta.url)).then(res =>
  res.arrayBuffer()
)

export const alt = 'Aptos Docs'

export const size = {
  width: 2400,
  height: 1256,
}

export const contentType = 'image/png'

/**
 * For more details on OpenGraph configuration, see
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
 */
export default async function (req) {
  const inter = await font

  const { searchParams } = new URL(req.url)

  // ?title=<title>
  const hasTitle = searchParams.has('title')
  const title = hasTitle
    ? searchParams.get('title')?.slice(0, 100)
    : docsConfig.defaultTitle

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 160,
          backgroundColor: '#030303',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          backgroundPosition: '-30px -10px',
          fontWeight: 600,
          color: 'white'
        }}
      >
        <p
          style={{
            position: 'absolute',
            bottom: 140,
            left: 160,
            margin: 0,
            fontSize: 60,
            letterSpacing: -1
          }}
        >
          {docsConfig.defaultTitle}
        </p>
        <h1
          style={{
            fontSize: 164,
            margin: '0 0 40px -2px',
            lineHeight: 1.1,
            textShadow: '0 2px 30px #000',
            letterSpacing: -4,
            backgroundImage: 'linear-gradient(90deg, #fff 40%, #aaa)',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          {title}
        </h1>
      </div>
    ),
    {
      width: 2400,
      height: 1256,
      fonts: [
        {
          name: 'inter',
          data: inter,
          style: 'normal'
        }
      ],
    }
  )
}
