module.exports = (api) => {
  // Testing if babel is being run in test mode

  /**
   * Cache the returned value forever and don't call this function again. This is the default behavior but since we
   * are reading the env value above, we need to explicitly set it after we are done doing that, else we get a
   * caching was left unconfigured error.
   */
  api.cache(true)
  return {
    presets: [['@babel/preset-env', { targets: { node: '10' } }], '@babel/preset-typescript'],
    plugins: [
      '@babel/proposal-object-rest-spread',
      [
        'module-resolver',
        {
          alias: {
            '^#(.+)': './src/\\1',
          },
          extensions: ['.ts', '.js', '.json'],
        },
      ],
      [
        '@babel/proposal-decorators',
        {
          legacy: true,
        },
      ],
      ['@babel/proposal-class-properties', { loose: true }],
      ['inline-json-import', {}],
    ],
  }
}
