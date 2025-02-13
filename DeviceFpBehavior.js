function P(t) {
    for (var e = "", n = 0; n < t.length; n++)
        e += String.fromCharCode(t[n]);
    return e
}

function M(t) {
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_*";
    if (!t)
        return "";
    for (var n, r, i, o, a, s, c, u = "", l = 0; l < t.length;)
        o = (n = t.charCodeAt(l++)) >> 2,
            a = (3 & n) << 4 | (r = t.charCodeAt(l++)) >> 4,
            s = (15 & r) << 2 | (i = t.charCodeAt(l++)) >> 6,
            c = 63 & i,
            isNaN(r) ? s = c = 64 : isNaN(i) && (c = 64),
            u = u + e.charAt(o) + e.charAt(a) + e.charAt(s) + e.charAt(c);
    return u
}

function base64Encrypt(t) {
    return M(P(t))
}

STRUCT_VERSION = 6,
    HEAD_LENGTH = 2,
    messageBody = [STRUCT_VERSION, 0],
    randomToken = Math.floor(1e9 * Math.random()),
    randomByte = 255 & randomToken,
    segmentOffset = 80;


function addSmallInt(t, e) {
    t &= 255;
    var n, r = segmentOffset % 8, i = randomByte, o = messageBody, a = o.length - 1;
    r ? (n = o[a] ^ i,
        o[a] = n ^ t << r & 255 ^ i,
    8 < r + e && (o[1 + a] = (n = t >> 8 - r) ^ i)) : o[1 + a] = t ^ i,
        segmentOffset += e
}

function addBigInt(t, e) {
    t &= 65535;
    var n, r = segmentOffset % 8, i = randomByte, o = messageBody, a = o.length - 1;
    r ? (n = o[a] ^ i,
        o[a] = n ^ t << r & 255 ^ i,
    8 < r + e && (o[1 + a] = (n = t >> 8 - r & 255) ^ i,
    16 < r + e && (o[2 + a] = (n = t >> 16 - r) ^ i))) : (o[1 + a] = 255 & t ^ i,
        o[2 + a] = t >> 8 & 255 ^ i),
        segmentOffset += e
}

function addString(t) {
    var e = Math.min(255, t.length);
    if (addSmallInt(e, 8),
    0 !== e) {
        for (var n = segmentOffset, r = messageBody, i = randomByte, o = n % 8 ? r.length - 1 : r.length, a = r[o] ^ i, s = 0; s < e; s++) {
            var c = t.charCodeAt(s)
                , u = (127 < c && (c = 32),
            n % 8)
                , a = u ? (r[o] = a ^ c << u & 255 ^ i,
                o += 1,
            c >> 8 - u) : c;
            n += 7
        }
        n % 8 && (r[r.length] = a ^ i),
            segmentOffset = n
    }
}

function addStringLong(t) {
    var e = Math.min(65534, t.length);
    if (addBigInt(e, 16),
    0 !== e) {
        for (var n = segmentOffset, r = messageBody, i = randomByte, o = n % 8 ? r.length - 1 : r.length, a = r[o] ^ i, s = 0; s < e; s++) {
            var c = t.charCodeAt(s)
                , u = (127 < c && (c = 32),
            n % 8)
                , a = u ? (r[o] = a ^ c << u & 255 ^ i,
                o += 1,
            c >> 8 - u) : c;
            n += 7
        }
        n % 8 && (r[r.length] = a ^ i),
            segmentOffset = n
    }
}

function fixed() {
    var t = segmentOffset % 8;
    0 != t && (segmentOffset += 8 - t)
}

function checkSum() {
    for (var t = 176, e = messageBody, n = messageBody.length, r = 2; r < n; r++)
         var i = e[r]
             , t = t + ~(255 & i) & 255 ^ i;
    messageBody[1] = t = 255 & t ^ 255
}

function getDeviceFpBehavior(sessionID, pageUrl) {
    messageBody[2] = 255 & randomToken,
        messageBody[3] = randomToken >> 8 & 255,
        messageBody[4] = randomToken >> 16 & 255,
        messageBody[5] = randomToken >> 24 & 255,
        messageBody.length = 10

    let t = Date.now();
    let startTime = Date.now();
    let mouseMoveCount = Math.floor(Math.random() * (600 - 200 + 1)) + 200; // 随机生成 300 - 600 次鼠标移动次数
    let pageStayTime = Math.floor(Math.random() * (300 - 50 + 1)) + 50; // 随机生成等待的时间差
    let mouseMoveList = [
        {
            "CollectEndTime": Math.floor(t / 1e3),  // 1739427964
            // "PageStayTime": parseInt((t - startTime) / 1e3),  // 656
            "PageStayTime": pageStayTime,
            "PageUrl": pageUrl,  // https://www.midasbuy.com/razer/hk/buy/pubgm
            "MouseMoveCount": mouseMoveCount,
            "MouseClickCount": {
                "Left": 0, "Right": 0
            }
        }
    ]

    addString(sessionID);
    addStringLong(JSON.stringify(mouseMoveList));
    fixed();
    checkSum();

    return base64Encrypt(messageBody)
}

// // 测试样例
// let sessionID = "026538816875392435173942905340187188";
// let pageUrl = "https://www.midasbuy.com/razer/hk/buy/pubgm"
// console.log(getDeviceFpBehavior(sessionID, pageUrl))

exports.getDeviceFpBehavior = getDeviceFpBehavior