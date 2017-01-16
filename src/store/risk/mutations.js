export default {

    init() {
        document.body.addEventListener('touchstart', function() {});
        (function(doc, win) {
            var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function() {
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    if (clientWidth >= 740) {
                        clientWidth = 740;
                        docEl.style.fontSize = (100 * (clientWidth / 320) - 10) + 'px';
                    }
                    if (clientWidth <= 320) {
                        clientWidth = 320;
                        docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
                    }

                };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);
    }

}