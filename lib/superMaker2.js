/**
 * Created by 101tx on 2016/10/13
 *
 * superMakerkj框架.
 */
/**
 *
 *Tool 工具类
 *元素选择
 */
function $s(id) {
    if (document.getElementById(id) != null) {
        return document.getElementById(id);
    }

}


/**
 * 随机数
 * @param a
 * @returns {number}
 */
function random(a) {
    return Math.random() * a;
}


function rmInt(a) {
    return Math.floor(Math.random() * a);
}
/**
 *
 * 数组功能拓展
 * 根据值删除数组元素
 * @param val
 */
Array.prototype.remove = function (val) {
    if (val != null && this.length > 0) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) {
                this.splice(i, 1);
                break;
            }
        }
    }
}
CanvasRenderingContext2D.prototype.roundrect =
    function (x, y, width, height, radius, fill, stroke) {
        if (typeof stroke == "undefined") {
            stroke = true;
        }
        if (typeof radius === "undefined") {
            radius = 5;
        }
        this.beginPath();
        this.moveTo(x + radius, y);
        this.lineTo(x + width - radius, y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.lineTo(x + width, y + height - radius);
        this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.lineTo(x + radius, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.lineTo(x, y + radius);
        this.quadraticCurveTo(x, y, x + radius, y);
        this.closePath();
        if (stroke) {
            this.stroke();
        }
        if (fill) {
            this.fill();
        }
    };

CanvasRenderingContext2D.prototype.xuline = function (fromX, fromY, toX, toY, pattern, xw, color) {
    // default interval distance -> 5px
    if (typeof pattern === "undefined") {
        pattern = 5;
    }

    // calculate the delta x and delta y
    var dx = (toX - fromX);
    var dy = (toY - fromY);
    var distance = Math.floor(Math.sqrt(dx * dx + dy * dy));
    var dashlineInteveral = (pattern <= 0) ? distance : (distance / pattern);
    var deltay = (dy / distance) * pattern;
    var deltax = (dx / distance) * pattern;

    // draw dash line
    this.beginPath();
    this.lineWidth = xw;
    this.strokeStyle = color;
    for (var dl = 0; dl < dashlineInteveral; dl++) {
        if (dl % 2) {
            this.lineTo(fromX + dl * deltax, fromY + dl * deltay);
        } else {
            this.moveTo(fromX + dl * deltax, fromY + dl * deltay);
        }
    }
    this.stroke();
};
/**
 *
 * 删除指定索引处元素
 * @param dx
 * @returns {Array}
 */
Array.prototype.del = function (dx) {
    if (isNaN(dx) || dx > this.length || dx < 0) {
        return this;
    } else {
        this.splice(dx, 1);
    }
}

/**
 *
 * 向数组末尾追加一个元素
 * @param val
 * @returns {Number|number}
 */
Array.prototype.add = function (val) {

    if (val != null) {
        return this.push(val);


    }
}

/**
 *
 * 清空数组
 * @returns {Array|T[]}
 */
Array.prototype.clear = function () {
    return this.splice(0, this.length);
}


/**
 *
 *
 * 交换两个元素的值
 * @param index1
 * @param index2
 * @returns {*|T}
 */
Array.prototype.swap = function (index1, index2) {
    if (index1 < this.length && index2 < this.length && index1 >= 0 && index2 >= 0) {
        return this[index1] = this.splice(index2, 1, this[index1])[0];
    }
}

/**
 * 数组上移
 * @param index
 */
Array.prototype.up = function (index) {
    if (index != null && index >= 0 && index < this.length) {
        if (index == 0) {
            return;
        }
        this.swap(index, index - 1);
    }
};
//以冒泡的形式将任意位置的元素浮出到数组末尾
Array.prototype.fc = function (index) {


    if (index != null && index >= 0 && index < this.length) {

        for (var i = 0; i < this.length - index; i++) {
            this.swap(index + i, index + i + 1);
        }

    }


}
/**
 *
 *
 * 数组下移
 * @param index
 */
Array.prototype.down = function (index) {
    if (index != null && index >= 0 && index < this.length) {
        if (index == this.length - 1) {
            return;
        }
        this.swap(index, index + 1);
    }
};

/**
 *
 * 数组元素变为第一个元素
 * @param index
 */
Array.prototype.dips = function (index) {
    if (index != null && index >= 0 && index < this.length) {
        if (index == 0) {
            return;
        }
        this.swap(index, 0);
    }
}

/**
 *
 *  数组元素变为最后一个元素
 * @param index
 */
Array.prototype.floats = function (index) {
    if (index != null && index >= 0 && index < this.length) {
        if (index == this.length - 1) {
            return;
        }
        this.swap(index, this.length - 1);
    }
}

Array.prototype.find = function (val) {

    if (this.length > 0) {


        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) {


                return i;
            }


        }


    }


}

/**
 *
 * 全局变量
 *
 */

var canvas = document.createElement("canvas");

canvas.style.border = "5px solid rgba(166, 38, 102, 0.93)";
canvas.style.margin = "0 auto";
canvas.id = "canvas";
var mcontext = canvas.getContext("2d");

/**
 *
 *
 * @param val
 */

var scaneArray = new Array();


/***
 *
 * 场景
 * @constructor
 */
function Scane() {
    scaneArray.add(this);
    this.id = '';
    this.playtime = 500; //指定场景播放时间
    this.playflag = false;
    this.frame = '';  //场景编号
    this.loopflag = false;  //循环标志
    this.nextframe = "";  //在限定时间播放后调到指定编号场景
    this.layer = new Layer();  //场景中的图层
    this.add = function (val) {
        this.layer.array.add(val);
    }


    this.getId = function (val) {


        if (this.layer.array.length > 0 && val != null && typeof(val) === "object") {
            for (var i = 0; i < this.layer.array.length; i++) {
                if (this.layer.array[i] == val) {
                    return this.layer.array[i].id;

                }

            }


        } else {
            return null;
        }


    }

    this.getById = function (id) {
        if (this.layer.array.length > 0 && id != null && (typeof(id) === "string")) {
            for (var i = 0; i < this.layer.array.length; i++) {
                if (this.layer.array[i].id == id) {
                    return this.layer.array[i];

                }

            }


        } else {
            return null;
        }


    }

    this.remove = function (val) {
        if (this.layer.array.length > 0 && val != null && typeof(val) === "object") {
            for (var i = 0; i < this.layer.array.length; i++) {
                if (this.layer.array[i] == val) {
                    this.layer.array.del(i);

                }

            }


        } else {
            return;
        }
    }

    this.del = function (val) {
        if (this.layer.array.length > 0 && val != null && (val != "") && typeof(val) === "string") {
            for (var i = 0; i < this.layer.array.length; i++) {
                if (this.layer.array[i].id == val) {
                    this.layer.array.del(i);

                }

            }


        } else {
            return;
        }
    }


    this.startplay = function () {
        this.playflag = true;
    }
    this.stopplay = function () {
        this.playflag = false;
    }
}

/**
 *
 *
 * 场景中的层
 * @constructor
 */
function Layer() {
    this.array = new Array();
    this.add = function (val) {
        this.array.add(val)
    }
    this.remove = function (val) {
        if (this.array.length > 0) {
            if (val != null) {
                this.array.remove(val);
            }

        }
    }

    this.top = function (val) {
        if (this.array.length > 0) {
            this.array.fc(this.array.find(val));
        }
    }

    this.clear = function () {
        if (this.array.length > 0) {
            for (var i in this.array) {
                this.remove(this.array[i]);
            }
        }
    }

    this.hides = function () {

        if (this.array.length > 0) {

            for (var i in this.array) {

            }
        }
    }

    this.show = function () {
        if (this.array.length > 0) {
            for (var i in this.array) {

            }
        }
    }

}


/**
 *
 * 阴影效果
 */
function shadow() {
    this.color = null;
    this.blur = 0; //羽化偏移量
    this.offsetX = 0;
    this.offsetY = 0;

}
/***
 *
 * 场景中的超级对象
 * @param role
 * @returns {Object}
 */
function player(role) {
    if (role == "img") {
        var obj = new Object();
        obj.role = role;
        obj.img = new Image();
        obj.shadow = new shadow();
        obj.id = '';
        obj.x = 0;
        obj.du = 0;
        obj.y = 0;
        obj.spqx = 0;
        obj.czqx = 0;
        obj.scalex = 1;
        obj.scaley = 1;
        obj.rotate = 0;
        obj.apl = 1;
        obj.sanba = false;
        obj.editflag = false;
        obj.edit = false;
        obj.ckg = false;
        obj.hitx = 0;
        obj.hity = 0;
        obj.txkg = false;
        obj.visible = true;
        obj.die = false;
        obj.txtime = null;
        obj.txjstime = 0;
        obj.dlmsjs = function () {
            if (obj.txjstime == 0) {
                obj.txjstime = getCurrent();

            }

        }
        obj.action = function () {


        }

        obj.mouseup = function (e) {

        }
        obj.mousedown = function (e) {


        }
        obj.mousemove = function (e) {


        }
        obj.mousein = function (e) {


        }
        obj.mouseout = function (e) {

        }
        obj.hit = function (mv) {


            if (this.x >= mv.x && this.x >= mv.x + mv.w) {
                return false;
            } else if (this.x <= mv.x && this.x + this.img.width <= mv.x) {
                return false;
            } else if (this.y >= mv.y && this.y >= mv.y + mv.h) {
                return false;
            } else if (this.y <= mv.y && this.y + this.img.height <= mv.y) {
                return false;
            }
            return true;

        }
        return obj;
    }
    if (role == 'mv') {
        var obj = new Object();
        obj.role = role;
        obj.source = [];
        obj.shadow = new shadow();
        obj.id = '';
        obj.i = 0;
        obj.x = 0;
        obj.spqx = 0;
        obj.czqx = 0;
        obj.du = 0;
        obj.y = 0;
        obj.scalex = 1;
        obj.scaley = 1;
        obj.rotate = 0;
        obj.mvjs = new Date();
        obj.apl = 1;
        obj.editflag = false;
        obj.edit = false;
        obj.ckg = false;
        obj.hitx = 0;
        obj.hity = 0;
        obj.loop = true;
        obj.jgtime = 1000;
        obj.play = function (index) {
            if (index <= obj.i) {
                obj.i = index;
            }
        }
        obj.stop = function (index) {
            if (index <= obj.i) {
                obj.i = index;
                obj.loop = false;
            }
        }

        return obj;


    }

    if (role == "text") {
//canv, kx, gradient, str, x, y, size, kind, alg, color
        var obj = new Object();
        obj.role = role;
        obj.id = '';
        obj.x = 0;
        obj.kx = false;
        obj.gradient = 'red';
        obj.y = 0;
        obj.str = '';
        obj.size = 15;
        obj.kind = 'Arial';
        obj.alg = 'center';
        obj.color = 'snow';
        obj.rotate = 0;
        obj.alphatx = 100;
        obj.shadow = new shadow();
        obj.editflag = false;
        obj.visible = true;
        obj.action = function () {
        }

        obj.mouseup = function (e) {

        }
        obj.mousedown = function () {


        }
        obj.mousemove = function (e) {


        }
        obj.mousein = function (e) {


        }
        obj.mouseout = function (e) {

        }
        obj.hit = function (mv) {


            if (this.x >= mv.x && this.x >= mv.x + mv.w) {
                return false;
            } else if (this.x <= mv.x && this.x + this.w <= mv.x) {
                return false;
            } else if (this.y >= mv.y && this.y >= mv.y + mv.h) {
                return false;
            } else if (this.y <= mv.y && this.y + this.h <= mv.y) {
                return false;
            }
            return true;

        }
        return obj;
    }


    if (role == "rect") {

        var obj = new Object();
        obj.role = role;
        obj.shadow = new shadow();
        obj.id = '';
        obj.x = 0;
        obj.y = 0;
        obj.w = 50;
        obj.h = 50;
        obj.spqx = 0;
        obj.czqx = 0;
        obj.scalex = 1;
        obj.scaley = 1;
        obj.apl = 1;
        obj.color = "red";
        obj.linewidth = 2;
        obj.rotate = 0;
        obj.alphatx = 100;
        obj.shadow = new shadow();
        obj.editflag = false;
        obj.visible = true;
        obj.action = function () {


        }

        obj.mouseup = function (e) {

        }
        obj.mousedown = function () {


        }
        obj.mousemove = function (e) {


        }
        obj.mousein = function (e) {


        }
        obj.mouseout = function (e) {

        }
        obj.hit = function (mv) {


            if (this.x >= mv.x && this.x >= mv.x + mv.w) {
                return false;
            } else if (this.x <= mv.x && this.x + this.w <= mv.x) {
                return false;
            } else if (this.y >= mv.y && this.y >= mv.y + mv.h) {
                return false;
            } else if (this.y <= mv.y && this.y + this.h <= mv.y) {
                return false;
            }
            return true;

        }
        return obj;
    } else if (role == "line") {
        //canv, linew, color, p1, p2
        var obj = new Object();
        obj.role = role;
        obj.property = "kj";
        obj.id = '';
        obj.x1 = 0;
        obj.y1 = 0;
        obj.x2 = 0;
        obj.y2 = 0;
        obj.color = "red";
        obj.linewidth = 2;


        return obj;

    } else if (role == "p") {
        //canv, linew, color, p1, p2
        var obj = new Object();
        obj.role = role;
        obj.property = "kj";
        obj.id = '';
        obj.x = 0;
        obj.y = 0;
        obj.r = 5;
        obj.color = "red";
        return obj;

    } else if (role == "yuan") {
        //canv, linew, color, p1, p2
        var obj = new Object();
        obj.role = role;
        obj.property = "kj";
        obj.id = '';
        obj.x = 0;
        obj.y = 0;
        obj.r = 5;
        obj.a1 = 0;
        obj.a2 = 360
        obj.color = "red";
        obj.fx = false;
        return obj;

    }


}

var time = 0;


/**
 *
 * 主绘图程序
 * @constructor
 */
function DrawMain() {

    if (scaneArray.length > 0) {
        for (var i = 0; i < scaneArray.length; i++) {
            if (scaneArray[i].playflag) {

                if (time < scaneArray[i].playtime) {
                    time += 1;
                }
                //----------------------当循环播放----------------------------------------------------------
                if (scaneArray[i].loopflag) {
                    if (time >= scaneArray[i].playtime) {
                        time = 0;
                    }
                } else {
                    //-------------播放指定时间长---------------------------------------------------------
                    if (time >= scaneArray[i].playtime) {
                        //--------------跳入指定的场景根据其场景编号--------------------------------------------------------
                        if (scaneArray[i].nextframe != "" && scaneArray[i].nextframe != null) {
                            time = 0;
                            for (var p = 0; p < scaneArray.length; p++) {
                                if (scaneArray[p].frame == scaneArray[i].nextframe) {
                                    scaneArray[p].playflag = true;
                                    scaneArray[i].playflag = false;
                                    break;
                                }
                            }
                        }
                        scaneArray[i].playflag = false;
                    }
                }

                if (scaneArray[i].layer.array.length > 0) {
                    var k;
                    for (var j = 0; j < scaneArray[i].layer.array.length; j++) {
                        k = scaneArray[i].layer.array[j];
                        //----------------------------------------绘制图片----------------------------------

                        if (k.role == "img") {
                            if (!k.die) {
                                if (k.txkg) {

                                    if (k.txtime != null) {
                                        k.dlmsjs();
                                        var tm = getCurrent();
                                        if (tm - k.txjstime > k.txtime) {
                                            k.txkg = false;
                                            k.txtime = null;
                                            k.txjstime = 0;
                                        }
                                    }
                                    k.action();
                                }
                                Draw.img(canvas, k.img, k.x, k.y, k.rotate, k.scalex, k.scaley, k.apl, k.shadow, k.spqx, k.czqx);

                                if (k.edit && Draw.path(canvas, k.x, k.y, k.img.width, k.img.height, k.rotate, 5, 2, "blue", k.scalex, k.scaley, k.spqx, k.czqx, k.hitx, k.hity) == true) {
                                    k.editflag = true;
                                } else {
                                    k.editflag = false;
                                }
                                if (k.ckg) {
                                    Draw.rect(canvas, 1, "red", k.rotate, new point(k.x, k.y), new point(k.img.width, k.img.height), k.scalex, k.scaley, k.apl, k.shadow, k.spqx, k.czqx);
                                }
                            } else {

                                scaneArray[i].layer.array.remove(k);
                            }
                        }
                        else if (k.role == "mv") {
                            if (k.source.length >= 1) {
                                if (k.loop) {
                                    if (k.i < k.source.length) {
                                        try {
                                            Draw.img(canvas, k.source[k.i], k.x, k.y, k.rotate, k.scalex, k.scaley, k.apl, k.shadow, k.spqx, k.czqx);
                                            if ((getCurrent() - k.mvjs) >= (k.i + 1) * (k.jgtime)) {
                                                k.i++;
                                            }
                                        } catch (error) {
                                            console.log(error + "mv source has problem!");
                                        }
                                    } else {
                                        k.i = 0;
                                        k.mvjs = getCurrent();
                                    }
                                } else {
                                    if (k.i < k.source.length) {
                                        try {
                                            Draw.img(canvas, k.source[k.i], k.x, k.y, k.rotate, k.scalex, k.scaley, k.apl, k.shadow, k.spqx, k.czqx);
                                        } catch (error) {
                                            console.log(error + "mv source has problem!");
                                        }
                                    }
                                }
                            }
                        } else if (k.role == "rect") {

                            Draw.rect(canvas, k.linewidth, k.color, k.rotate, new point(k.x, k.y), new point(k.w, k.h), k.scalex, k.scaley, k.apl, k.shadow, k.spqx, k.czqx);

                        } else if (k.role == "text") {

                            Draw.word(canvas, k.kx, k.gradient, k.str, k.x, k.y, k.size, k.kind, k.alg, k.color);


                        } else if (k.role == "line") {

                            Draw.line(canvas, k.linewidth, k.color, {x: k.x1, y: k.y1}, {x: k.x2, y: k.y2});


                        } else if (k.role == "yuan") {
                            Draw.crls(canvas, k.color, {x: k.x, y: k.y}, k.r, k.a1, k.a2, k.fx);

                        } else if (k.role == "p") {
                            Draw.crls(canvas, k.color, {x: k.x, y: k.y}, k.r, 0, 360, false);

                        }


                    }
                }
                break;
            }
        }


    }


}
/**
 *
 *
 * @type {CanvasRenderingContext2D|any}
 */
var paint = canvas.getContext("2d");

/**
 *
 *
 * @param w
 * @param h
 * @param color
 * @param id
 * @constructor
 */
function Stage(w, h, bg) {
    Stage.w = w;
    Stage.h = h;
    Stage.background = bg;
    canvas.width = w;
    canvas.height = h;
    onload = function () {
        try {
            document.body.appendChild(canvas);
            Stage.init();
        } catch (e) {
            alert("找不到对应的id值无法创建画板" + e.message);
        }
    };

    Stage.init = function () {

    }
    Stage.update = function () {


    }
    Stage.draw = function () {


    }


    Stage.findScane = function (id) {
        if (scaneArray.length > 0) {

            for (var i = 0; i < scaneArray.length; i++) {
                if (scaneArray[i].id == id) {
                    return scaneArray[i];
                }
            }
        }
    }


    Stage.removeScane = function (id) {
        if (scaneArray.length > 0) {

            for (var i = 0; i < scaneArray.length; i++) {
                if (scaneArray[i].id == id) {
                    scaneArray.remove(scaneArray[i]);

                }


            }

        }

    }


    /**
     *
     *
     *
     * 按键监听事件
     * 空的事件可以拓展
     */

    Stage.upKey = function () {


    }
    Stage.downKey = function () {


    }
    Stage.leftKey = function () {


    }

    Stage.rightKey = function () {


    }

    Stage.spaceKey = function () {


    }
    document.addEventListener("keydown", function (e) {
        var e = e || event;
        var currKey = e.keyCode || e.which || e.charCode;
        switch (currKey) {
            case 37:
                Stage.leftKey();
                break;//左
            case 38:
                Stage.upKey();
                break;//上
            case 39:
                Stage.rightKey();
                break;//右
            case 40:
                Stage.downKey()
                break;//下
            case 32:
                Stage.spaceKey();
                break;//  space暂停
            default:
                break;
        }
    });


    update();
}

/**
 *
 *获取准确的坐标值
 * @param canvas
 * @param evt
 * @returns {{x: number, y: number}}
 */
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left * (canvas.width / rect.width),
        y: evt.clientY - rect.top * (canvas.height / rect.height)
    }
}
/**
 *
 *
 *基于矩形的碰撞检测
 * @param mv1
 * @param x
 * @param y
 * @returns {boolean}
 */
function Hit(mv1, x, y) {
    if ((x > mv1.x && x < (mv1.x + mv1.w)) && (y > mv1.y && y < (mv1.y + mv1.h))) {


        return true;
    } else {

        return false;
    }


}

function Hit1(mv1, mv2) {
    if (mv1 != null && mv2 != null) {
        if ((mv2.x > mv1.x && mv2.x < (mv1.x + mv1.w)) && (mv2.y > mv1.y && mv2.y < (mv1.y + mv1.h))) {


            return true;
        } else {

            return false;
        }
    }

}
/***
 *
 *
 *
 */



var updatemovie = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
function update() {
    paint.clearRect(0, 0, Stage.w, Stage.h);
    drawBackground({canvas: canvas, background: Stage.background, width: Stage.w, height: Stage.h});
    Stage.update();
    Stage.draw();
    DrawMain();
    updatemovie(update);
    // requestAnimationFrame(update);//修改于2017/2/7

}


///////////////////////////////////////////////////////////////////额外画板（工具画板）的操作/////////////////////////////////////////////////////////////////////////////


/**
 *
 *
 *  判断 背景是单纯颜色还是图片
 * @param val
 * @returns {string}
 */
function getBgType(val) {
    return typeof(val) == "string" ? "string" : val instanceof Image ? "image" : null;
}

function drawBackground(val) {
    var jpan = val.canvas.getContext("2d");

    if (getBgType(val.background) == "string" && val.background != "" && val.background != null) {
        jpan.fillStyle = val.background;
        jpan.beginPath();
        jpan.fillRect(0, 0, val.width, val.height);
    } else if (getBgType(val.background) == "image") {

        jpan.drawImage(val.background, 0, 0, val.width, val.height);

    }

}
////---------------------------------------this is a draw API in the next package----------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * 点
 * @param x
 * @param y
 */
function point(x, y) {
    this.x = x;
    this.y = y;
}

/**
 *
 * 用于滤镜设置！
 * @param pd
 * @param color
 */
function ca(pd, color) {
    this.pd = pd;
    this.color = color;

}


/**
 *
 *
 *
 * 以下的方法是对html5 绘图方法的封装
 *
 * 方法名
 */
var Draw = {

    trace: function (val) {
        alert(val);
    },
    print: function (val) {
        console.log(val);

    },

    /**
     *
     * 自定义形状图像的绘制带填充
     * @param canv
     * @param arr
     * @param val
     * @param linew
     * @param color
     */
    fillShape: function (canv, arr, val, linew, color) {
        var cw;
        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var ctx = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }
        try {
            ctx.beginPath();
            ctx.lineJoin = "round";
            ctx.moveTo(arr[0].x, arr[0].y);
            for (var k = 1; k < arr.length; k++) {
                ctx.lineTo(arr[k].x, arr[k].y);
            }


            ctx.strokeStyle = val;
            ctx.lineWidth = linew;
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.fill();
        } catch (e) {

            Draw.trace("提供的绘图信息有误！请查看参数设置!");
            Draw.print("提供的绘图信息有误！请查看参数设置!");

        }
    },
    /**
     *
     *
     * 自定义图形绘制未填充
     * @param canv
     * @param arr
     * @param val
     * @param linew
     */
    shape: function (canv, arr, val, linew) {
        var cw;
        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var ctx = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }
        try {
            ctx.beginPath();
            ctx.lineJoin = "round";
            ctx.moveTo(arr[0].x, arr[0].y);
            for (var k = 1; k < arr.length; k++) {
                ctx.lineTo(arr[k].x, arr[k].y);
            }
            ctx.strokeStyle = val;
            ctx.lineWidth = linew;
            ctx.stroke();

        } catch (e) {

            Draw.trace("提供的绘图信息有误！请查看参数设置!");
            Draw.print("提供的绘图信息有误！请查看参数设置!");

        }
    },

    /**
     *
     *
     * 线性渐变滤镜
     * @param canv
     * @param p1
     * @param p2
     * @param arr
     * @returns {CanvasGradient}
     */
    filterX: function (canv, p1, p2, arr) {
        var cw;
        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var ctx = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }
        var grd = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].pd >= 0 && arr[i].pd <= 1) {
                grd.addColorStop(arr[i].pd, arr[i].color);

            }

        }


        return grd;
    },

    /**
     *
     *
     * 放射状滤镜
     * @param canv
     * @param p1
     * @param p2
     * @param r1
     * @param r2
     * @param arr
     * @returns {CanvasGradient}
     */
    filterR: function (canv, p1, p2, r1, r2, arr) {


        var cw;
        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var ctx = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }

        var grd = ctx.createRadialGradient(p1.x, p1.y, r1, p2.x, p2.y, r2);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].pd >= 0 && arr[i].pd <= 1) {
                grd.addColorStop(arr[i].pd, arr[i].color);

            }

        }
        return grd;
    },
    /**
     *
     *
     * 清除方法
     * @param canv
     * @param x
     * @param y
     * @param w
     * @param h
     */
    clear: function (canv, x, y, w, h) {
        var cw;
        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var ctx = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }

        ctx.clearRect(x, y, w, h);


    },


    /**
     *
     *
     * 空心矩形
     */
    rect: function (canv, linew, color, du, p1, p2, scalex, scaley, apl, shadow, spqx, czqx) {
        var cw;
        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var jpan = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }
        jpan.translate(p1.x + p2.x / 2, p1.y + p2.y / 2);
        jpan.rotate(du * Math.PI / 180);
        jpan.transform(scalex, czqx, spqx, scaley, 0, 0);
        jpan.translate(-(p1.x + p2.x / 2), -(p1.y + p2.y / 2));
        apl != null ? jpan.globalAlpha = apl : null;
        if (shadow != null) {
            jpan.shadowBlur = shadow.blur
            jpan.shadowColor = shadow.color;
            jpan.shadowOffsetX = shadow.offsetX;
            jpan.shadowOffsetY = shadow.offsetY;
        }
        jpan.lineWidth = linew;
        jpan.strokeStyle = color;
        jpan.beginPath();
        jpan.strokeRect(p1.x, p1.y, p2.x, p2.y);

        jpan.globalAlpha = 1;
        jpan.shadowBlur = 0;
        jpan.shadowColor = null;
        jpan.shadowOffsetX = 0;
        jpan.shadowOffsetY = 0;
        jpan.setTransform(1, 0, 0, 1, 0, 0);


    },
    rects: function (canv, color, p1, p2) {
        var cw;
        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var jpan = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }


        jpan.fillStyle = color;
        jpan.beginPath();
        jpan.fillRect(p1.x, p1.y, p2.x, p2.y);

    },
    /***
     *
     * 线
     */
    line: function (canv, linew, color, p1, p2) {

        var cw;
        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var jpan = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }


        jpan.lineWidth = linew;
        jpan.strokeStyle = color;
        jpan.beginPath();
        jpan.moveTo(p1.x, p1.y);
        jpan.lineTo(p2.x, p2.y);
        jpan.stroke();


    },
    /**
     * 双控制点曲线
     */
    curves: function (canv, linew, color, p1, p2, p3, p4) {

        var cw;
        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var jpan = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }


        jpan.lineWidth = linew;
        jpan.strokeStyle = color;
        jpan.beginPath();
        jpan.moveTo(p1.x, p1.y);
        jpan.bezierCurveTo(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
        jpan.stroke();


    },

    /**
     *
     *单控制点曲线
     *
     */
    curve: function (canv, linew, color, p1, p2, p3) {

        var cw;
        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var jpan = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }


        jpan.lineWidth = linew;
        jpan.strokeStyle = color;
        jpan.beginPath();
        jpan.moveTo(p1.x, p1.y);
        jpan.quadraticCurveTo(p2.x, p2.y, p3.x, p3.y);
        jpan.stroke();

    },
    /*
     * 绘制圆弧 空心圆弧
     * 参数分别为x,y, 半径，起始角度，结尾角度，boolean（顺时针/逆时针)
     */

    crl: function (canv, linew, color, p1, r, a3, a4, bool) {

        var cw;
        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var jpan = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }

        jpan.lineWidth = linew;
        jpan.strokeStyle = color;
        jpan.beginPath();
        jpan.arc(p1.x, p1.y, r, (a3 * Math.PI) / 180, (a4 * Math.PI) / 180, bool);
        jpan.stroke();
    }, crls: function (canv, color, p1, r, a3, a4, bool) {

        var cw;
        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var jpan = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }
        jpan.fillStyle = color;
        jpan.beginPath();
        jpan.arc(p1.x, p1.y, r, (a3 * Math.PI) / 180, (a4 * Math.PI) / 180, bool);
        jpan.fill();


    },
    /**
     *
     *
     *
     *
     *  * 参数依次是
     * 字符串，x,y,大小,类型,对齐方式
     * 常用类型有Arial,Verdana,Times New Roman,serif,sans-serif,
     * 对齐方式有 center, end left right, start textBaseline(竖直方向)
     *
     *
     * @param {Object} str
     * @param {Object} x
     * @param {Object} y
     * @param {Object} size
     * @param {Object} kind
     * @param {Object} alg
     * @param canv
     */
    word: function (canv, kx, gradient, str, x, y, size, kind, alg, color) {
        var cw;
        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var jpan = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }
        jpan.beginPath();
        jpan.font = size + "px " + kind;
        jpan.textAlign = alg;
        if (kx == false) {
            jpan.fillStyle = color;
            jpan.fillText(str, x, y);
        } else {
            jpan.strokeStyle = gradient;
            jpan.strokeText(str, x, y);
        }


    },
    img: function (canv, image, xz, yz, du, scalex, scaley, apl, shadow, spqx, czqx) {
        var cw;
        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var paint = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }

        paint.translate(xz + image.width / 2, yz + image.height / 2);
        paint.rotate(du * Math.PI / 180);
        if (czqx == null || czqx == "") {
            czqx = 0;
        }
        if (spqx == null || spqx == "") {
            spqx = 0;
        }
        paint.transform(scalex, czqx, spqx, scaley, 0, 0);
        apl != null ? paint.globalAlpha = apl : null;
        if (shadow != null) {
            paint.shadowBlur = shadow.blur
            paint.shadowColor = shadow.color;
            paint.shadowOffsetX = shadow.offsetX;
            paint.shadowOffsetY = shadow.offsetY;
        }

        paint.translate(-(xz + image.width / 2), -(yz + image.height / 2));

        paint.beginPath();

        paint.drawImage(image, xz, yz, image.width, image.height);

        paint.globalAlpha = 1;
        paint.shadowBlur = 0;
        paint.shadowColor = null;
        paint.shadowOffsetX = 0;
        paint.shadowOffsetY = 0;

        paint.setTransform(1, 0, 0, 1, 0, 0);

    }, path: function (canv, x, y, w, h, du, jg, xw, color, scalex, scaley, spqx, czqx, hitx, hity) {

        var cw;
        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var paint = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }
        paint.translate(x + w / 2, y + h / 2);
        paint.rotate(du * Math.PI / 180);

        if (czqx == null || czqx == "") {
            czqx = 0;
        }
        if (spqx == null || spqx == "") {
            spqx = 0;
        }
        paint.transform(scalex, czqx, spqx, scaley, 0, 0);
        paint.translate(-(x + w / 2), -(y + h / 2));

        paint.beginPath();
        paint.rect(x, y, w, h);
        if (paint.isPointInPath(hitx, hity)) {
            paint.lineWidth = 1;
            paint.strokeStyle = "orange";
            paint.stroke();
            paint.beginPath();
            paint.xuline(x, y, x + w, y, jg, xw, color);
            paint.xuline(x + w, y, x + w, y + h, jg, xw, color);
            paint.xuline(x + w, y + h, x, y + h, jg, xw, color);
            paint.xuline(x, y + h, x, y, jg, xw, color);
            paint.setTransform(1, 0, 0, 1, 0, 0);
            return true;
        } else {
            paint.setTransform(1, 0, 0, 1, 0, 0);
            return false;


        }


    }, video: function (canv, xz, yz, width, height, du, src, id) {
        var cw;

        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var paint = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }

        if (document.getElementById(id) == null) {
            var videos = document.createElement("video");
            videos.innerHTML = '<video  id="' + id + '" autoplay="true" loop="true"  style="display: none"><source src=' + src + 'type="video/mp4"></video>';
            document.body.appendChild(videos);
        }
        var video1 = document.getElementById(id);
        paint.translate(xz + width / 2, yz + height / 2);
        paint.rotate(du * Math.PI / 180);
        paint.translate(-(xz + width / 2), -(yz + height / 2));
        paint.beginPath();
        paint.drawImage(video1, xz, yz, width, height);
        paint.setTransform(1, 0, 0, 1, 0, 0);

    }, getImg: function (canv, x, y, w, h) {

        var cw;

        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var paint = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }

        return paint.getImageData(x, y, w, h);


    }, putImg: function (canv, imgdata, x, y, w1, h1, w, h) {
        var cw;

        if ((typeof canv) == "string") {
            cw = document.getElementById(canv);

        } else if ((typeof canv) == "object" && canv != null) {
            cw = canv;
        }
        try {
            var paint = cw.getContext("2d");
        } catch (e) {
            Draw.trace("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
            Draw.print("提供的画布信息有误！请查看画布设置，或画布的id信息是否有误!");
        }

        paint.putImageData(imgdata, x, y, w1, h1, w, h);


    }


}

/**
 * 定时器
 * @param tm
 * @param action
 * @constructor
 */

function Timer(tm, action) {
    var d1, d2;
    d1 = new Date();
    d2 = new Date();
    while (d2 - d1 <= tm) {
        d2 = new Date();
    }
    action();


}

/**
 *
 * 循环间隔执行器
 * @param tm
 * @param action
 * @param cs
 * @constructor
 */
function Loop(tm, action, cs) {
    var d1 = new Date()
    var d2 = new Date();
    var cou = 0;
    while (true) {
        d2 = new Date();
        if ((d2 - d1) % tm == 0) {
            action();
            cou++;
            if (cou >= cs) {
                break;
            }
        }


    }

}


function addbutton(id, src, left, top, w, h, action, action1) {

    if (document.getElementById(id) == null) {
        var node1 = document.createElement("button");
        node1.id = id;
        node1.style.backgroundImage = 'url("' + src + '")';
        node1.style.backgroundColor = 'transparent';
        node1.style.backgroundRepeat = "no-repeat";
        node1.style.backgroundSize = "100%";
        node1.style.borderStyle = "none";
        node1.style.width = w;
        node1.style.height = h;
        node1.style.position = "absolute";
        node1.style.left = left;
        node1.style.top = top;
        node1.ontouchstart = function () {
            action();
        }

        node1.ontouchend = function () {
            action1();
        }
        document.body.appendChild(node1);
    }
}


function addpicbt(id, src, left, top, w, h, action, action1) {
    var node1 = document.createElement("img");
    if (document.getElementById(id) == null) {
        node1.id = id;
        node1.src = src;
        node1.width = w;
        node1.height = h;
        node1.style.position = "absolute";
        node1.style.left = left;
        node1.style.top = top;


        node1.ontouchstart = function () {
            action();
        }

        node1.ontouchend = function () {
            action1();
        }
        document.body.appendChild(node1);
    } else {
        console.log("id重复");
    }


}


function addDiv(a, id, left, top, w, h, color, conent) {
    var node1 = document.createElement(a);
    if (document.getElementById(id) == null) {
        node1.id = id;
        node1.style.position = "absolute";
        node1.style.left = left;
        node1.style.top = top;
        node1.style.background = color;
        node1.style.width = w;
        node1.style.height = h;
        node1.style.border = 0;
        node1.innerHTML = conent;
        document.body.appendChild(node1);
    } else {
        alert("id重复");

    }


}

function addNode(a, conent) {
    var node1 = document.createElement(a);
    node1.innerHTML = conent;

    document.body.appendChild(node1);
}


///禁止复制  //调用 nocopy();
function nocopy() {

    document.oncontextmenu = function () {
        return false;
    }
    document.onkeydown = function () {
        if (event.ctrlKey && window.event.keyCode == 67) {
            return false;
        }
    }
    document.body.oncopy = function () {
        return false;
    }
    document.onselectstart = function () {
        return false;
    }
}


//////////////////////////////////audio音频处理/////////////////////////////

function addmusic(nam, src, loop) {
    var music = document.createElement("audio");

    if (loop) {
        var str = '<audio id="' + nam + '"   controls="controls" style="display: none"  loop="loop"  src="' + src + '" type="audio/mpeg"></audio>';
        music.innerHTML = str;

        document.body.appendChild(music);
    } else {

        var str = '<audio id="' + nam + '"  controls="controls" style="display: none"   src="' + src + '" type="audio/mpeg"></audio>';
        music.innerHTML = str;

        document.body.appendChild(music);

    }
}

function mplay(name) {

    var music = document.getElementById(name);
    // document.getElementById(name).play();

    if (music != null) {
        try {
            document.getElementById(name).play();

        } catch (err) {

            console.log("音乐加载错误");
        }

    }
}

function mstop(name) {

    var music = document.getElementById(name);


    if (music != null) {
        try {
            document.getElementById(name).pause();

        } catch (err) {

            console.log("音乐加载错误");
        }

    }
}


////////////////////////////////////////////滤镜数据的转变//////////////////////////////////////////////////
var mfilter = {

    /**
     * invert color value of pixel, new pixel = RGB(255-r, 255-g, 255 - b)
     *颜色反转
     * @param binaryData - canvas's imagedata.data
     * @param l - length of data (width * height of image data)
     */
    colorInvertProcess: function (binaryData, l) {
        for (var i = 0; i < l; i += 4) {
            var r = binaryData[i];
            var g = binaryData[i + 1];
            var b = binaryData[i + 2];

            binaryData[i] = 255 - r;
            binaryData[i + 1] = 255 - g;
            binaryData[i + 2] = 255 - b;
        }
    },

    /**
     * adjust color values and make it more darker and gray...
     *灰度的应用
     * @param binaryData
     * @param l
     */
    colorAdjustProcess: function (binaryData, l) {
        for (var i = 0; i < l; i += 4) {
            var r = binaryData[i];
            var g = binaryData[i + 1];
            var b = binaryData[i + 2];

            binaryData[i] = (r * 0.272) + (g * 0.534) + (b * 0.131);
            binaryData[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
            binaryData[i + 2] = (r * 0.393) + (g * 0.769) + (b * 0.189);
        }
    },

    /**
     * deep clone image data of canvas
     *
     * @param context
     * @param src
     * @returns
     */
    copyImageData: function (context, src) {
        var dst = context.createImageData(src.width, src.height);
        dst.data.set(src.data);
        return dst;
    },

    /**
     * convolution - keneral size 5*5 - blur effect filter(模糊效果)
     *模糊应用
     * @param context
     * @param canvasData
     */
    blurProcess: function (context, canvasData) {
        console.log("Canvas Filter - blur process");
        var tempCanvasData = this.copyImageData(context, canvasData);
        var sumred = 0.0, sumgreen = 0.0, sumblue = 0.0;
        for (var x = 0; x < tempCanvasData.width; x++) {
            for (var y = 0; y < tempCanvasData.height; y++) {

                // Index of the pixel in the array
                var idx = (x + y * tempCanvasData.width) * 4;
                for (var subCol = -2; subCol <= 2; subCol++) {
                    var colOff = subCol + x;
                    if (colOff < 0 || colOff >= tempCanvasData.width) {
                        colOff = 0;
                    }
                    for (var subRow = -2; subRow <= 2; subRow++) {
                        var rowOff = subRow + y;
                        if (rowOff < 0 || rowOff >= tempCanvasData.height) {
                            rowOff = 0;
                        }
                        var idx2 = (colOff + rowOff * tempCanvasData.width) * 4;
                        var r = tempCanvasData.data[idx2 + 0];
                        var g = tempCanvasData.data[idx2 + 1];
                        var b = tempCanvasData.data[idx2 + 2];
                        sumred += r;
                        sumgreen += g;
                        sumblue += b;
                    }
                }

                // calculate new RGB value
                var nr = (sumred / 25.0);
                var ng = (sumgreen / 25.0);
                var nb = (sumblue / 25.0);

                // clear previous for next pixel point
                sumred = 0.0;
                sumgreen = 0.0;
                sumblue = 0.0;

                // assign new pixel value
                canvasData.data[idx + 0] = nr; // Red channel
                canvasData.data[idx + 1] = ng; // Green channel
                canvasData.data[idx + 2] = nb; // Blue channel
                canvasData.data[idx + 3] = 255; // Alpha channel
            }
        }
    },

    /**
     * after pixel value - before pixel value + 128
     * 浮雕效果
     */
    reliefProcess: function (context, canvasData) {
        console.log("Canvas Filter - relief process");
        var tempCanvasData = this.copyImageData(context, canvasData);
        for (var x = 1; x < tempCanvasData.width - 1; x++) {
            for (var y = 1; y < tempCanvasData.height - 1; y++) {

                // Index of the pixel in the array
                var idx = (x + y * tempCanvasData.width) * 4;
                var bidx = ((x - 1) + y * tempCanvasData.width) * 4;
                var aidx = ((x + 1) + y * tempCanvasData.width) * 4;

                // calculate new RGB value
                var nr = tempCanvasData.data[aidx + 0] - tempCanvasData.data[bidx + 0] + 128;
                var ng = tempCanvasData.data[aidx + 1] - tempCanvasData.data[bidx + 1] + 128;
                var nb = tempCanvasData.data[aidx + 2] - tempCanvasData.data[bidx + 2] + 128;
                nr = (nr < 0) ? 0 : ((nr > 255) ? 255 : nr);
                ng = (ng < 0) ? 0 : ((ng > 255) ? 255 : ng);
                nb = (nb < 0) ? 0 : ((nb > 255) ? 255 : nb);

                // assign new pixel value
                canvasData.data[idx + 0] = nr; // Red channel
                canvasData.data[idx + 1] = ng; // Green channel
                canvasData.data[idx + 2] = nb; // Blue channel
                canvasData.data[idx + 3] = 255; // Alpha channel
            }
        }
    },

    /**
     *    before pixel value - after pixel value + 128
     *  雕刻效果
     *
     * @param canvasData
     */
    diaokeProcess: function (context, canvasData) {
        console.log("Canvas Filter - process");
        var tempCanvasData = this.copyImageData(context, canvasData);
        for (var x = 1; x < tempCanvasData.width - 1; x++) {
            for (var y = 1; y < tempCanvasData.height - 1; y++) {

                // Index of the pixel in the array
                var idx = (x + y * tempCanvasData.width) * 4;
                var bidx = ((x - 1) + y * tempCanvasData.width) * 4;
                var aidx = ((x + 1) + y * tempCanvasData.width) * 4;

                // calculate new RGB value
                var nr = tempCanvasData.data[bidx + 0] - tempCanvasData.data[aidx + 0] + 128;
                var ng = tempCanvasData.data[bidx + 1] - tempCanvasData.data[aidx + 1] + 128;
                var nb = tempCanvasData.data[bidx + 2] - tempCanvasData.data[aidx + 2] + 128;
                nr = (nr < 0) ? 0 : ((nr > 255) ? 255 : nr);
                ng = (ng < 0) ? 0 : ((ng > 255) ? 255 : ng);
                nb = (nb < 0) ? 0 : ((nb > 255) ? 255 : nb);

                // assign new pixel value
                canvasData.data[idx + 0] = nr; // Red channel
                canvasData.data[idx + 1] = ng; // Green channel
                canvasData.data[idx + 2] = nb; // Blue channel
                canvasData.data[idx + 3] = 255; // Alpha channel
            }
        }
    },

    /**
     * mirror reflect
     *镜像效果
     * @param context
     * @param canvasData
     */
    mirrorProcess: function (context, canvasData) {
        console.log("Canvas Filter - process");
        var tempCanvasData = this.copyImageData(context, canvasData);
        for (var x = 0; x < tempCanvasData.width; x++) // column
        {
            for (var y = 0; y < tempCanvasData.height; y++) // row
            {

                // Index of the pixel in the array
                var idx = (x + y * tempCanvasData.width) * 4;
                var midx = (((tempCanvasData.width - 1) - x) + y * tempCanvasData.width) * 4;

                // assign new pixel value
                canvasData.data[midx + 0] = tempCanvasData.data[idx + 0]; // Red channel
                canvasData.data[midx + 1] = tempCanvasData.data[idx + 1];
                ; // Green channel
                canvasData.data[midx + 2] = tempCanvasData.data[idx + 2];
                ; // Blue channel
                canvasData.data[midx + 3] = 255; // Alpha channel
            }
        }
    },
};


/////////////////////////////////////////////////////////////////2017/2/10额外补充//////////////////
/**
 * 快捷加载元件
 * @param scan
 * @param id
 * @param src
 * @param x
 * @param y
 * @param w
 * @param h
 */
function addp(scan, id, src, x, y, w, h, du, scalex, scaley, apl, shadow, sp, cz, kg) {
    var playeri = new player("img");
    playeri.id = id;
    playeri.img = new Image();
    playeri.img.src = src;

    if (kg != null) {
        playeri.edit = kg;
    }
    if (shadow != null) {
        playeri.shadow = shadow;
    }
    if (w != "auto" && w != null) {
        playeri.img.width = w;
    }
    if (h != "auto" && h != null) {
        playeri.img.height = h;
    }
    playeri.scalex = scalex;
    playeri.scaley = scaley;
    playeri.apl = apl;
    playeri.x = x;
    playeri.y = y;


    if (sp != null && sp != "") {

        playeri.spqx = sp;
    }
    if (cz != null && cz != "") {

        playeri.czqx = cz;
    }

    if (du != null && du != "") {
        playeri.rotate = du;
    }
    scan.add(playeri);
}

function addlz(scan, id, x, y, r, color) {
    var p = new player("p");
    p.id = id;
    p.x = x;
    p.y = y;
    p.color = color;
    p.r = r;
    scan.add(p);
}
/**
 *
 * 截取字符串后几位
 * @param str
 * @param s
 * @returns {string}
 */
function getStr(str, s) {
    if (str != null && str.length > 0 && s < str.length) {
        return str.substr(str.length - s)
    }
}

/*

 显示和不显示div
 */
function disDiv(id, a) {
    if ($s(id) != null) {
        if (a == 1) {
            $s(id).style.display = "block";
        } else if (a == 0) {
            $s(id).style.display = "none";

        }

    }


}
function getAnyColor() {

    var sz = ['#84AA72', '#AA6D4A', 'red', 'yellow', 'orange', 'snow', 'blue', 'green', 'pink', 'green', 'black', 'yellow', '	#CD00CD', '	#CD3278', '#BFEFFF', '#A6A6A6', '#AC3571', '#4F70D1', '839CAA'];

    return sz[rmInt(sz.length)];

}

function getRandomColor() {
    var c = '#';
    var cArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    for (var i = 0; i < 6; i++) {
        var cIndex = Math.round(Math.random() * 15);
        c += cArray[cIndex];
    }
    return c;
}
//////////
/**
 * 渲染测试
 * @returns {Stats}
 */
function initStats() {
    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
    return stats;
}


/**
 * 圆运动方法；
 * 用于在update中快捷实现圆运动；速度为正为顺时针运动，速度为负为逆时针运动
 * r1=r是圆运动，不等为椭圆
 * @param bd
 * @param x
 * @param y
 * @param r
 * @param speed
 */
function circleSport(bd, x, y, r, r1, speed) {
    if (bd != null && speed >= 0) {
        if (bd.du < 360) {
            bd.du += speed;
            bd.x = x + r * Math.cos(bd.du * Math.PI / 180);
            bd.y = y + r1 * Math.sin(bd.du * Math.PI / 180);
        } else {
            bd.du = 0;
        }
    } else if (bd != null && speed < 0) {
        if (bd.du > -360) {
            bd.du += speed;
            bd.x = x + r * Math.cos(bd.du * Math.PI / 180);
            bd.y = y + r1 * Math.sin(bd.du * Math.PI / 180);
        } else {
            bd.du = 0;
        }
    }
}
/**
 * 自转运动
 * @param bd
 * @param speed
 */
function selfRotate(bd, speed) {
    if (speed >= 0) {
        bd.rotate += speed;
        if (bd.rotate >= 360) {
            bd.rotate = 0;
        }
    } else {
        bd.rotate += speed;
        if (bd.rotate < -360) {
            bd.rotate = 0;
        }
    }
}


////指纹跟踪识别
function bin2hex(s) {

    var i, l, o = '',
        n;

    s += '';

    for (i = 0, l = s.length; i < l; i++) {
        n = s.charCodeAt(i)
            .toString(16);
        o += n.length < 2 ? '0' + n : n;
    }

    return o;
}
function getUUID(domain) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var txt = domain;
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.textBaseline = 'tencent';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = 'blue';
    ctx.fillText(txt, 4, 17);
    var b64 = canvas.toDataURL().replace('data:image/png;base64,', '');
    var bin = window.atob(b64);
    var crc = bin2hex(bin.slice(-16, -12));
    return crc;
}
/**
 * 获取当前时间
 * @returns {Date}
 */
function getCurrent() {
    return new Date();
}
/**
 * 快捷加载movieClip；
 * @param scan
 * @param src
 * @param id
 * @param x
 * @param y
 * @param loop
 * @param jgtime
 * @param length
 * @param w
 * @param h
 */
function addmv(scan, id, src, x, y, loop, jgtime, length, w, h, spqx, czqx) {
    var mv = new player("mv");
    mv.source = new Array();
    mv.loop = true;
    mv.jgtime = jgtime;
    for (var i = 0; i < length; i++) {
        var img = new Image();
        if (w != null) {
            img.width = w;
        }
        if (h != null) {
            img.height = h;
        }
        img.src = src + (1 + i) + ".png";
        mv.source.add(img);
    }
    if (spqx != null) {
        mv.spqx = spqx;
    }
    if (czqx != null) {
        mv.czqx = czqx;
    }
    mv.x = x;
    mv.y = y;
    mv.id = id;
    scan.add(mv);
}

///////////////////////////////////////////////////////数据类型//////////////////////////////////////////////////////////////////////////////
//任意类型转换为整形
function jsInt(number) {
    return number && +number | 0 || 0;
}
//转换为字符串 效率高
function jsString(number) {

    return "" + number;

}

//字符串拼接 效率高
function StringBf() {
    this.__strings__ = [];
};
StringBf.prototype.add = function (str) {
    this.__strings__.push(str);
};
StringBf.prototype.toString = function () {
    return this.__strings__.join('');
};


//////////////////////////////////////////上传pic并且预览//////////////////////////////////////
var picpath = null;
function getPath(obj, fileQuery, transImg) {
    var imgSrc = '', imgArr = [], strSrc = '';
    if (window.navigator.userAgent.indexOf("MSIE") >= 1) { // IE浏览器判断
        if (obj.select) {
            obj.select();
            var path = document.selection.createRange().text;
            obj.removeAttribute("src");
            imgSrc = fileQuery.value;
            imgArr = imgSrc.split('.');
            strSrc = imgArr[imgArr.length - 1].toLowerCase();
            if (strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0) {
                obj.setAttribute("src", transImg);
                obj.style.filter =
                    "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + path + "', sizingMethod='scale');"; // IE通过滤镜的方式实现图片显示
            } else {
                throw new Error('File type Error! please image file upload..');
            }
        } else {
            imgSrc = fileQuery.value;
            imgArr = imgSrc.split('.');
            strSrc = imgArr[imgArr.length - 1].toLowerCase();
            if (strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0) {
                obj.src = fileQuery.value;
                picpath = fileQuery.value
                obj.style.width = '100px';
                obj.style.height = '100px';
            } else {
                throw new Error('File type Error! please image file upload..');
            }
        }
    } else {
        var file = fileQuery.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            imgSrc = fileQuery.value;
            imgArr = imgSrc.split('.');
            strSrc = imgArr[imgArr.length - 1].toLowerCase();
            if (strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0) {
                obj.setAttribute("src", e.target.result);
                picpath = e.target.result;
                obj.style.width = '100px';
                obj.style.height = '100px'
            } else {
                throw new Error('File type Error! please image file upload..');
            }
        }
        reader.readAsDataURL(file);
    }
}


//获取下拉选的值文本；
function getSelectValue(id) {
    var obj = $s(id); //定位id
    if (obj != null) {
        var index = obj.selectedIndex; // 选中索引

        return obj.options[index].text;
    } else {

        return null;
    }
    // var value = obj.options[index].value; // 选中值


}