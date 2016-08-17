;
(function () {
    require.config({
        baseUrl: '/',
        map: {
            '*': {
                depCss: 'h5/libs/require/require-css',
                depImage: 'h5/libs/require/require-image',
                depText: 'h5/libs/require/require-text',
                domReady: 'h5/libs/require/require-domReady'
            }
        },
        paths: {
            jquery: ['h5/libs/jquery-1.9.1'],
            jqueryForm: ['h5/libs/jquery.form'],
            libs: ['h5/libs'],
            common: ['h5/src/common'],
            components: ['h5/src/components'],
            designer: ['h5/src/designer'],
            editors: ['h5/src/editors'],
            publish: ['h5/src/publish']
        },
        waitSeconds: 0,
        shim: {
            jquery: {exports: '$', deps: []},
            jqueryForm: {exports: '$.fn.ajaxSubmit', deps: ['jquery']}
        },
        urlArgs: 'v16.6.4'
    });
}());