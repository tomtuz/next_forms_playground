// default config
// -----------------
/** @type {import('next').NextConfig} */
const nextConfig = {}

// const nextConfig = withLess({
//   distDir: 'dist',
//   reactStrictMode: true,
//   experimental: {
//     forceSwcTransforms: true
//   }
// })

export default nextConfig

// why-did-you render config
// -----------------
// import injectWhyDidYouRender from './src/scripts/wdy/index.js'
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack: (config, context) => {
//     injectWhyDidYouRender(config, context)
//     return config
//   }
// }
// export default nextConfig

// // Million.js config
// // -----------------
// import MillionLint from '@million/lint'

// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// export default MillionLint.next({
//   rsc: true
// })(nextConfig)
