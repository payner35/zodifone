Package.describe({
    summary: "A lightweight and modular front-end framework."
});

Package.on_use(function (api, where) {

    var path = Npm.require('path');

    var asset_path = path.join('uikit-full');

    //js
    api.add_files(path.join(asset_path, 'js', 'uikit.js'), 'client');
    api.add_files(path.join(asset_path, 'js', 'autocomplete.js'), 'client');
    api.add_files(path.join(asset_path, 'js', 'search.js'), 'client');
    api.add_files(path.join(asset_path, 'js', 'datepicker.js'), 'client');
    api.add_files(path.join(asset_path, 'js', 'sticky.js'), 'client');
    api.add_files(path.join(asset_path, 'js', 'codemirror/codemirror.js'), 'client');
    api.add_files(path.join(asset_path, 'js', 'codemirror/markdown.js'), 'client');
    api.add_files(path.join(asset_path, 'js', 'codemirror/overlay.js'), 'client');
    api.add_files(path.join(asset_path, 'js', 'codemirror/xml.js'), 'client');
    api.add_files(path.join(asset_path, 'js', 'codemirror/gfm.js'), 'client');
   // api.add_files(path.join(asset_path, 'js', 'codemirror/marked.js'), 'client');
    api.add_files(path.join(asset_path, 'js', 'htmleditor.js'), 'client');

    //css
    api.add_files(path.join(asset_path, 'css', 'uikit.addons.css'), 'client');
    api.add_files(path.join(asset_path, 'css', 'uikit-pc-patch.css'), 'client');
    api.add_files(path.join(asset_path, 'css', 'codemirror.css'), 'client');
    api.add_files(path.join(asset_path, 'css', 'show-hint.css'), 'client');


    //fonts
    api.add_files(path.join(asset_path, 'fonts', 'fontawesome-webfont.eot'), 'client');
    api.add_files(path.join(asset_path, 'fonts', 'fontawesome-webfont.ttf'), 'client');
    api.add_files(path.join(asset_path, 'fonts', 'fontawesome-webfont.woff'), 'client');
    api.add_files(path.join(asset_path, 'fonts', 'FontAwesome.otf'), 'client');

});