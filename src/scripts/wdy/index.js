const injectionSource = './src/scripts/wdy/injection.ts'

/**
 * Injects the injection source into the Next.js webpack configuration for development mode
 * @param config - The webpack configuration object
 * @param context - The Next.js webpack configuration context
 */
// module.exports = (config, context) => {
export const injectWhyDidYouRender = (config, context) => {
  if (context.dev && !context.isServer) {
    const originalEntry = config.entry

    // eslint-disable-next-line no-param-reassign
    config.entry = async () => {
      const entries = await originalEntry()

      if (
        entries['main-app'] &&
        !entries['main-app'].includes(injectionSource)
      ) {
        entries['main-app'].unshift(injectionSource)
      }

      return entries
    }
  }
}
