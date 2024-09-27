// import injectWhyDidYouRender from './src/scripts/wdy/index.js'
// import MillionLint from '@million/lint'

// export default (phase, { defaultConfig }) => {
//   const configEnv = process.env.APP_ENV
//   console.log('configEnv: ', configEnv)

//   switch (configEnv) {
//     case 'render': {
//       const nextConfig = {
//         webpack: (config, context) => {
//           injectWhyDidYouRender(config, context)
//           return config
//         }
//       }
//       return nextConfig
//     }
//     case 'million': {
//       const nextConfig = {}
//       return MillionLint.next({
//         rsc: true
//       })(nextConfig)
//     }
//     default: {
//       const nextConfig = {}
//       return nextConfig
//     }
//   }
// }

// default config
// -----------------
// /** @type {import('next').NextConfig} */
// const nextConfig = {}

import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

// Next.js uses:
// 1. 'SWC' (instead of 'Babel') for transpilation.
// 2. 'webpack' responsible for:
//     - module bundling
//     - Next.js plugins
//     - code splitting
//     - managing assets
// 3. '.next' folder: both, 'SWC' and 'webpack' create this folder

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Extend `pageExtensions` to include MDX files
  // We don't want to display .mdx files as pages for now so we leave it commented out.
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  // disable during prod
  transpilePackages: ['jotai-devtools'],
  reactStrictMode: true

  // webpack: (config, context) => {
  //   injectWhyDidYouRender(config, context)
  //   return config
  // },
}

const withMDX = createMDX({
  // allow '.md' extensions
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: []
  }
})

// export default nextConfig
export default withMDX(nextConfig)
