module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { electron: '36' },
        modules: false,
        useBuiltIns: false
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: true,
        regenerator: true
      }
    ]
  ]
}

