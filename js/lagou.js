function Banner(idName, interval, effect) {
    this.banner = document.getElementById(idName);
    this.bannerL = document.getElementById('bannerL');
    this.oUl = document.getElementById('bannerR');
    this.aP = this.bannerL.getElementsByTagName('p');
    this.aLi = this.oUl.getElementsByTagName('li');
    this.autoTimer = null;
    this.interval = interval || 1000;
    this.step = 0;
    this.myEffect = 0 || effect;
    this.init();


}

Banner.prototype = {
    constructor: Banner,
    init: function init() {
        var _this = this;
        this.autoMove();
        this.autoTimer = setInterval(function () {//开启定时器，让图片自动轮播
            _this.autoMove();
        }, this.interval);
        this.handleChange();
    },
    autoMove: function autoMove() {
        if (this.step >= this.aP.length - 1) {
            this.step = 0;
            utils.css(this.bannerL, 'bottom', 0);
        }
        this.step++;
        zhufengAnimate(this.bannerL, {bottom: this.step * 165}, 400, this.myEffect);
        this.bannerTip();
    },
    bannerTip: function bannerTip() {
        var tmpStep = this.step >= this.aLi.length ? 0 : this.step;
        for (var i = 0; i < this.aLi.length; i++) {
            i === tmpStep ? utils.addClass(this.aLi[i], 'bg') : utils.removeClass(this.aLi[i], 'bg');
        }
    },
    handleChange: function handleChange() {
        var _this = this;
        for (var i = 0; i < _this.aLi.length; i++) {
            _this.aLi[i].index = i;
            _this.aLi[i].onclick = function () {
                _this.step = this.index;
                zhufengAnimate(_this.bannerL, {bottom: _this.step * 165}, 400);
                _this.bannerTip();
            }
        }
    }
};
var pageModule = (function () {
    var oBtn = document.getElementById('oBtn');
    var timer = null;
    var target = utils.win('scrollTop');
    var hide = document.getElementById('hide');
    var focus = document.getElementById('focus');
    var block = document.getElementById('block');
    var none = document.getElementById('none');
    var bottom = document.getElementById('bottom');
    var footer = document.getElementById('footer');
    var body = document.getElementById('body');
    var fixed = document.getElementById('fixed');

    //回到顶部
    function toTop() {
        window.onscroll = function computedDisplay() {
            if (utils.win('scrollTop') > 100) {
                oBtn.style.display = 'block';
            } else {
                oBtn.style.display = 'none';
            }
        }
        oBtn.onclick = function () {
            var timer = null;
            var target = utils.win('scrollTop');
            var hide = document.getElementById('hide');
            var duration = 500;
            var interval = 30;
            var step = target / duration * interval;
            console.log(step)
            timer = setInterval(function () {
                var curTop = utils.win('scrollTop');
                if (curTop <= 0) {
                    clearInterval(timer);
                    return;
                }
                curTop -= step;
                utils.win('scrollTop', curTop);
            }, interval)
        }

    }

    //底部盒子是否为隐藏
    function hideBox() {
        hide.style.display = 'none';
        focus.onclick = function () {
            hide.style.display = hide.style.display === 'block' ? 'none' : 'block';
        }

    }

//底部login部分
    window.addEventListener('scroll', changeFixed, false);
    function changeFixed() {
        if (hide.style.display === 'none') {
            if ((utils.win('scrollTop') + utils.win('clientHeight')) >= 2430) {
                utils.css(footer, {
                    position: 'relative',
                    bottom: 0,
                    left: 0
                });
            } else {
                utils.css(footer, {
                    position: 'fixed',
                    bottom: 0,
                    left: 0
                });
            }

        } else {
            if ((utils.win('scrollTop') + utils.win('clientHeight')) >= 2540) {
                utils.css(footer, {
                    position: 'relative',
                    bottom: 0,
                    left: 0
                });

            } else {
                utils.css(footer, {
                    position: 'fixed',
                    bottom: 0,
                    left: 0
                });
            }

        }

    }


    function follow() {
            var oDiv = document.getElementById('flow');
            var aLi = oDiv.getElementsByTagName("li");
            for (var i = 0; i < aLi.length; i++) {
                var curLi = aLi[i];
                curLi.onmouseenter = curLi.onmouseleave = function (e) {
                    var mark = this.getElementsByTagName('div')[0];
                    var o = utils.offset(this);
                    var w = this.offsetWidth;
                    var h = this.offsetHeight;
                    var interval = 200;
                    var x = (e.pageX - o.left - (w / 2)) * (w > h ? (h / w) : 1);
                    var y = (e.pageY - o.top - (h / 2)) * (h > w ? (w / h) : 1);
                    var dir = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
                    var curL = 0, curT = 0, tarL = 0, tarT = 0;
                    if (e.type === "mouseenter") {
                        dir === 0 ? curT = -117 : null;
                        dir === 1 ? curL = 117 : null;
                        dir === 2 ? curT = 117 : null;
                        dir === 3 ? curL = -117 : null;
                        utils.css(mark, {top: curT, left: curL, display: "block"});
                        zhufengAnimate(mark, {top: tarT, left: tarL}, interval, function () {
                            utils.css(mark, {top: tarT, left: tarL});
                        });
                    } else if (e.type === "mouseleave") {
                        dir === 0 ? tarT = -117 : null;
                        dir === 1 ? tarL = 117 : null;
                        dir === 2 ? tarT = 117 : null;
                        dir === 3 ? tarL = -117 : null;
                        zhufengAnimate(mark, {top: tarT, left: tarL}, interval, 2, function () {
                            utils.css(mark, {top: tarT, left: tarL});
                        });
                    }
                }
            }
        }




    function init() {
        toTop();
        hideBox();
        changeFixed();
        follow();
    }

    return {init: init}
})();
pageModule.init()




