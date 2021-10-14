// var webpack=require("webpack")

module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
    // ,
    // [
    //   　　new webpack.optimize.CommonsChunkPlugin('common.js'),
    //   　　new webpack.ProvidePlugin({
    //   　　　　jQuery: "jquery",
    //   　　　　$: "jquery"
    //   　　})
    // ]
  ]
}