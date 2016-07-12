describe( 'CommonUtils.', function () {
  CommonUtils = require( '../../src/utils/commonUtils' );

  it( 'parseTarget: parsing full path replacement', function () {
    let reqUrl = '/pingan/trade';
    let routeUrlRegexp = /(\/pingan\/.*)/;
    let targetPattern = 'http://localhost:10000[path]';

    let parsedTarget = CommonUtils.parseTarget(reqUrl, routeUrlRegexp, targetPattern);
    expect( parsedTarget ).toBe( 'http://localhost:10000/pingan/trade' );
  } );

  it( 'parseTarget: parsing part path replacement', function () {
    let reqUrl = '/dist/trade/js/index.js';
    let routeUrlRegexp = /\/dist\/(.*)/;
    let targetPattern = './resources/[path]';

    let parsedTarget = CommonUtils.parseTarget(reqUrl, routeUrlRegexp, targetPattern);
    expect( parsedTarget ).toBe( './resources/trade/js/index.js' );
  } );

  it( 'parseTarget: parsing full static path replacement', function () {
    let reqUrl = '/dist/trade/css/themes/black/entrance.css?staticVersion=dev.version';
    let routeUrlRegexp = /\/(dist\/.*)/;
    let targetPattern = './resources/[path]';

    let parsedTarget = CommonUtils.parseTarget(reqUrl, routeUrlRegexp, targetPattern, true);
    expect( parsedTarget ).toBe( './resources/dist/trade/css/themes/black/entrance.css' );
  } );

  it( 'parseTarget: parsing part static path replacement', function () {
    let reqUrl = '/dist/trade/css/themes/black/entrance.css?staticVersion=dev.version';
    let routeUrlRegexp = /\/dist\/(.*)/;
    let targetPattern = './resources/[path]';

    let parsedTarget = CommonUtils.parseTarget(reqUrl, routeUrlRegexp, targetPattern, true);
    expect( parsedTarget ).toBe( './resources/trade/css/themes/black/entrance.css' );
  } );

  it( 'parseTarget: parsing part static path replacement without search', function () {
    let reqUrl = '/dist/trade/css/themes/black/entrance.css';
    let routeUrlRegexp = /\/dist\/(.*)/;
    let targetPattern = './resources/[path]';

    let parsedTarget = CommonUtils.parseTarget(reqUrl, routeUrlRegexp, targetPattern, true);
    expect( parsedTarget ).toBe( './resources/trade/css/themes/black/entrance.css' );
  } );

  it( 'parseTarget: parsing without capturing parentheses', function () {
    let reqUrl = '/pingan/trade';
    let routeUrlRegexp = /\/pingan\/.*/;
    let targetPattern = 'http://localhost:10000/[path]';

    let parsedTarget = CommonUtils.parseTarget(reqUrl, routeUrlRegexp, targetPattern);
    expect( parsedTarget ).toBe( 'http://localhost:10000/[path]' );
  } );

  it( 'parseTarget: parsing without target[path]', function () {
    let reqUrl = '/pingan/trade';
    let routeUrlRegexp = /(\/pingan\/.*)/;
    let targetPattern = 'http://localhost:10000/xxxx';

    let parsedTarget = CommonUtils.parseTarget(reqUrl, routeUrlRegexp, targetPattern);
    expect( parsedTarget ).toBe( 'http://localhost:10000/xxxx' );
  } );

  it( 'parseTarget: parsing without capturing parentheses and target[path]', function () {
    let reqUrl = '/pingan/trade';
    let routeUrlRegexp = /\/pingan\/.*/;
    let targetPattern = 'http://localhost:10000/xxxx';

    let parsedTarget = CommonUtils.parseTarget(reqUrl, routeUrlRegexp, targetPattern);
    expect( parsedTarget ).toBe( 'http://localhost:10000/xxxx' );
  } );

} );