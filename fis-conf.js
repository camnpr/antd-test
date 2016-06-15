//// 加 md5
fis.match('*.{js,css,png}', {
    useHash: true
});

//// 启用 fis-spriter-csssprites 插件
//fis.match('::package', {
//    spriter: fis.plugin('csssprites')
//})

//// 对 CSS 进行图片合并
//fis.match('*.css', {
//    // 给匹配到的文件分配属性 `useSprite`
//    useSprite: true
//});

//fis.match('*.js', {
//    // fis-optimizer-uglify-js 插件进行压缩，已内置
//    optimizer: fis.plugin('uglify-js')
//});

//fis.match('*.css', {
//    // fis-optimizer-clean-css 插件进行压缩，已内置
//    optimizer: fis.plugin('clean-css')
//});

//fis.match('*.png', {
//    // fis-optimizer-png-compressor 插件进行压缩，已内置
//    optimizer: fis.plugin('png-compressor')
//});
//-----------------------------------------------------END-----------fis3 release 时添加 md5、静态资源压缩、css 文件引用图片进行合并


////不需要压缩、合并图片、也不需要 hash--------------------START
//fis.media('debug').match('*.{js,css,png}', {
//    useHash: false,
//    useSprite: false,
//    optimizer: null
//})
//-----------------------------------------------------END-----------fis3 release debug 启用 media debug 的配置，覆盖上面的配置，把诸多功能关掉


////简易的打包发布命令
fis.match('*.{html,js,css}', {
    optimizer: fis.plugin('htmlmin')
});


//// cmd>fis3 release build   
//执行合并到packTo制定的路径和文件名
//fis.media('build').match('*.js', {
//    optimizer: fis.plugin('htmlmin'),
//    packTo:'all.js'
//});


//基于页面的打包（根据引用资源的路径来打包）
//fis.match('::package', {
//    postpackager: fis.plugin('loader', {
//        allInOne: true
//    })
//});


// 配置配置文件，注意，清空所有的配置，只留下以下代码即可。
 //fis.match('*.{png,js,css}', {
 //  release: '/static/$0'
 //});

// 压缩 index.html 内联的 js
 //fis.match('index.html:js', {
 //  optimizer: fis.plugin('uglify-js')
 //});

// 压缩 index.html 内联的 css
 //fis.match('index.html:css', {
 //  optimizer: fis.plugin('clean-css')
 //});