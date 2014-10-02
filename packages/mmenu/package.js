Package.describe({
  summary: "mmenu for meteor ",
  version: "1.0.0",
  git: " \* Fill me in! *\ "
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.3');
  var path = Npm.require('path');

  var asset_path = path.join('mmenu');

  //js
  api.add_files(path.join(asset_path, 'js', 'jquery.mmenu.js'), 'client');
  api.add_files(path.join(asset_path, 'js', 'jquery.mmenu.header.js'), 'client');


  //css
  api.add_files(path.join(asset_path, 'css', 'jquery.mmenu.css'), 'client');
  api.add_files(path.join(asset_path, 'css', 'jquery.mmenu.themes.css'), 'client');
  api.add_files(path.join(asset_path, 'css', 'jquery.mmenu.header.css'), 'client');
  api.add_files(path.join(asset_path, 'css', 'jquery.mmenu.effects.css'), 'client');



});