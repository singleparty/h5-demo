require(['require', '../../common/js/require-config'], function (require, config) {
    require([
        'designer/js/main',
        'components/components',
        'editors/editors',
        'domReady!'
    ], function (main, com, edt, _domReady) {
        main(com, edt);
    });
});