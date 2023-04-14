
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "com-sarriaroman-photoviewer.PhotoViewer",
          "file": "plugins/com-sarriaroman-photoviewer/www/PhotoViewer.js",
          "pluginId": "com-sarriaroman-photoviewer",
        "clobbers": [
          "PhotoViewer"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "com-sarriaroman-photoviewer": "1.3.0"
    };
    // BOTTOM OF METADATA
    });
    