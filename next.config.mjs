import injectWhyDidYouRender from './src/scripts/wdy/index.js'
import MillionLint from '@million/lint'

export default (phase, { defaultConfig }) => {
  const configEnv = process.env.APP_ENV
  console.log('configEnv: ', configEnv)

  switch (configEnv) {
    case 'render': {
      const nextConfig = {
        webpack: (config, context) => {
          injectWhyDidYouRender(config, context)
          return config
        }
      }
      return nextConfig
    }
    case 'million': {
      const nextConfig = {}
      return MillionLint.next({
        rsc: true
      })(nextConfig)
    }
    default: {
      const nextConfig = {}
      return nextConfig
    }
  }
}
