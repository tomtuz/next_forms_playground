import MillionLint from '@million/lint'
import bundler from '@next/bundle-analyzer'
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import { injectWhyDidYouRender } from './src/scripts/wdy/index.js'

// -- WEBPACK --
const createWebpackConfig = (config, { isServer, isDev }) => {
  // Base modifications
  config.module = {
    ...config.module,
    exprContextCritical: false
  }

  // Server-specific modifications
  if (isServer) {
    // Server-side webpack configurations
  }

  // Client-specific modifications
  if (!isServer) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      tls: false,
      fs: false
    }
  }

  return config
}

// -- MDX --
const createMDXConfig = (nextConfig) => {
  const withMDX = createMDX({
    // allow '.md' extensions
    extension: /\.(md|mdx)$/,
    options: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: []
    }
  })
  return withMDX(nextConfig)
}

// -- Million.js --
const millionConfig = (nextConfig) => {
  const withMillion = MillionLint.next({ rsc: true })
  return withMillion(nextConfig)
}

// -- Bundler Analyzer --
const analyzerConfig = (nextConfig) => {
  const withAnalyzer = bundler({ enabled: true })
  return withAnalyzer(nextConfig)
}

// -- WhyDidYouRender --
const didYouRenderConfig = (nextConfig) => {
  return {
    ...nextConfig,
    webpack: (config, ctx) => {
      config = injectWhyDidYouRender(config, ctx)
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, ctx)
      }
      return config
    }
  }
}

// -- utils-config-logger --
const logLoadedConfigs = (configs) => {
  console.log('Loaded configurations:')
  Object.entries(configs).forEach(([key, value]) => {
    if (value) console.log(`- ${key}`)
  })
}

export default (phase, { defaultConfig }) => {
  // [ENV]
  const isDev = process.env.NODE_ENV === 'development'
  const isProd = process.env.NODE_ENV === 'production'
  const configEnv = process.env.APP_ENV // custom

  // [MODES]
  const devTools = {
    useMillionJS: process.env.APP_ENV === 'million',
    useWDYR: process.env.APP_ENV === 'render',
    useAnalyzer: process.env.ANALYZE === 'true'
  }

  /** @type {import('next').NextConfig} */
  let nextConfig = {
    productionBrowserSourceMaps: process.env.VERCEL_ENV !== 'production',
    reactStrictMode: true,

    // Extend `pageExtensions` to include MDX files
    // We don't want to display .mdx files as pages for now so we leave it commented out.
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    transpilePackages: isDev ? ['jotai-devtools'] : [],
    webpack: (config, { isServer }) => {
      // console.log('[webpack] isDev: ', isDev)
      // console.log('[webpack] configEnv: ', configEnv)
      // console.log('[webpack] phase: ', phase)
      // console.log(
      //   '[webpack] PHASE_DEVELOPMENT_SERVER: ',
      //   PHASE_DEVELOPMENT_SERVER
      // )

      config = createWebpackConfig(config, { isServer, isDev })
      return config
    }
  }

  // -- Configs --
  nextConfig = createMDXConfig(nextConfig)

  // -- DEV tools --
  if (isDev) {
    if (devTools.useAnalyzer) {
      nextConfig = analyzerConfig(nextConfig)
    }

    if (devTools.useWDYR) {
      nextConfig = didYouRenderConfig(nextConfig)
    }

    if (devTools.useMillionJS) {
      nextConfig = millionConfig(nextConfig)
    }
  }

  logLoadedConfigs({
    MDX: true,
    Analyzer: isDev && devTools.useAnalyzer,
    WhyDidYouRender: isDev && devTools.useWDYR,
    MillionJS: isDev && devTools.useMillionJS
  })

  return nextConfig
}

// ---------------------

// Next.js uses:
// 1. 'SWC' (instead of 'Babel') for transpilation.
// 2. 'webpack' responsible for:
//     - module bundling
//     - Next.js plugins
//     - code splitting
//     - managing assets
// 3. '.next' folder: both, 'SWC' and 'webpack' create this folder
