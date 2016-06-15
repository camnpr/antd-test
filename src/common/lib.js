//import 'antd/lib/index.css';
import 'antd/dist/antd.css';

// 你确定，你的浏览器，不被全球唾弃吗？ 我们不喜欢IE6789...
let browser = !!window.ActiveXObject && +/msie\s(\d+)/i.exec(navigator.userAgent)[1] || 0 / 0;
if(browser<8){
      window.location.href="http://camnpr.com/TuiJianTools/kill-ie.html";
}
// 统计
document.writeln("<script src=\"http://s95.cnzz.com/z_stat.php?id=1258232042&web_id=1258232042\" language=\"JavaScript\"></script>");
setTimeout(function(){
      var a = document.querySelector("a[title='站长统计']");
      if(a) a.style.display="none";
}, 500);

// 百度分享
document.writeln('<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"slide":{"type":"slide","bdImg":"5","bdPos":"right","bdTop":"100"}};with(document)0[(getElementsByTagName(\'head\')[0]||body).appendChild(createElement(\'script\')).src=\'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=\'+~(-new Date()/36e5)];</script>');

// 设置cookie
function setCookie(key, val, time, path, domain, sec) {
            if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key))
                return !1;
            var tm = "";
            tm = "; expires=" + new Date((new Date).getTime() + 1e3 * time).toUTCString();
            return document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(val) + tm + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (sec ? "; secure" : ""),
            !0
}

function getQueryString(name) {
            var reg = new RegExp("(^|&|/?)" + name + "=([^&]*)(&|$)", "i");
            var _uri = decodeURIComponent(window.location.search);
            var r = _uri.substr(1).match(reg);
            if (r != null) return r[2];
            return null;
}