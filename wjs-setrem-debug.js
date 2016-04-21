
(function(win, wjs) {
  var doc = win.document;
  var docEl = doc.documentElement;
  // var viewport = doc.querySelector('meta[name="viewport"]');
  // var devicePixelRatio = win.devicePixelRatio;
  // var dpr = 1; // 物理像素与逻辑像素的对应关系
  // var scale = 1; // css 像素缩放比率
  var tid;

  // 初始化数据
  var wjsNode = doc.querySelector('#wjs-setrem') || docEl; // setrem 数据元素节点
  var designWidth = wjsNode.getAttribute('data-design-width') || 640; // 设计稿宽度
  // var baseFontSize = wjsNode.getAttribute('data-base-font-size') || null; // body 基准字体大小

  // 设置 viewport
  // function setViewport() {
  //   var isIPhone = !!win.navigator.appVersion.match(/iphone/gi);
  //   if (isIPhone) {
  //     if (devicePixelRatio >= 3) {
  //       dpr = 3;
  //     } else if (devicePixelRatio === 2) {
  //       dpr = 2;
  //     } else {
  //       dpr = 1;
  //     }
  //   }

  //   wjs.dpr = dpr;
  //   scale = 1 / dpr;
  //   if (viewport) {
  //     viewport.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
  //   }
  // }

  // 设置 rem 的基准像素
  function setRem() {
    var viewportWidth = docEl.getBoundingClientRect().width;
    // alert('viewportWidth: ' + viewportWidth);
    var rem = 100 * viewportWidth / designWidth;
    // alert('rem: ' + rem);
    // rem = rem > 80 ? 80 : 50 > rem ? 50 : rem;
    rem = rem > 58 ? 58 : 50 > rem ? 50 : rem;
    wjs.rem = rem;
    docEl.style.fontSize = rem + 'px';
  }

  win.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(setRem, 300);
    }
  }, false);

  win.addEventListener('resize', function() {
    clearTimeout(tid);
    tid = setTimeout(setRem, 300);
  }, false);

  // win.addEventListener('onorientationchange', function() {
  //   clearTimeout(tid);
  //   tid = setTimeout(setRem, 300);
  // }, false);

  // if (baseFontSize) {
  //   if (doc.readyState === 'complete') {
  //     doc.body.style.fontSize = baseFontSize * dpr + 'px';
  //   } else {
  //     doc.addEventListener('DOMContentLoaded', function() {
  //       doc.body.style.fontSize = baseFontSize * dpr + 'px';
  //     }, false);
  //   }
  // }

  // setViewport();
  setRem();
  // docEl.classList.add('dpr' + dpr);
  // docEl.setAttribute('data-dpr', dpr);
})(window, window.wjs || (window.wjs = {}));