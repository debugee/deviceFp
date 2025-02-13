function base64Decrypt(encoded) {
    var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_*";
    var output = [];

    for (var i = 0; i < encoded.length; i += 4) {
        var a = n.indexOf(encoded.charAt(i));
        var b = n.indexOf(encoded.charAt(i + 1));
        var c = n.indexOf(encoded.charAt(i + 2));
        var d = n.indexOf(encoded.charAt(i + 3));
        var buffer = [];
        buffer[0] = (a << 2) | (b >> 4);
        buffer[1] = ((b & 15) << 4) | (c >> 2);
        buffer[2] = ((c & 3) << 6) | d;

        if (c === 64) {
            buffer = buffer.slice(0, 1);
        } else if (d === 64) {
            buffer = buffer.slice(0, 2);
        }
        output.push(...buffer);
    }

    return output;
}

function base64Encrypt(t) {
    var e = function (t) {
        for (var e = "", n = 0; n < t.length; n++)
            e += String.fromCharCode(t[n]);
        return e
    }(t)
        , n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_*";
    if (!e)
        return "";
    for (var r, i, o, a, s, c, l, u = "", d = 0; d < e.length;)
        a = (r = e.charCodeAt(d++)) >> 2,
            s = (3 & r) << 4 | (i = e.charCodeAt(d++)) >> 4,
            c = (15 & i) << 2 | (o = e.charCodeAt(d++)) >> 6,
            l = 63 & o,
            isNaN(i) ? c = l = 64 : isNaN(o) && (l = 64),
            u = u + n.charAt(a) + n.charAt(s) + n.charAt(c) + n.charAt(l);
    return u
}

function getGpuCanvasFp(gpuData, gpuType) {
    function H(t, e) {
        for (var n = "", r = Math.floor(t.length / e), i = 0, o = 0; o < e;)
            n += t[i],
                i += r,
                o++;
        return n
    }

    // canvasToDataUrl, Chrome、Edge 一致
    canvasToDataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGJJREFUeF7t1AEJAAAMAsHZv/RyPNwSyDncOQIECEQEFskpJgECBM5geQICBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAgQdWMQCX4yW9owAAAABJRU5ErkJggg==";
    c = H(canvasToDataUrl, 500);
    l = "~";
    // WebGL 扩展列表, Chrome、Edge 一致
    supportedExtensions = "ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode";
    // Chrome、Edge 一致
    c += l + supportedExtensions + l + "[1, 1]" + l + "[1, 1024]" + l + 8 + l + "yes" + l + 8 + l + 24 + l + 8 + l + 16 + l + 32 + l + 16384 + l + 1024 + l + 16384 + l + 16 + l + 16384 + l + 30 + l + 16 + l + 16 + l + 4096 + l + "[32767, 32767]" + l + 8 + l + "WebKit WebGL" + l + "WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)" + l + 0 + l + "WebKit" + l + "WebGL 1.0 (OpenGL ES 2.0 Chromium)";
    // GPU 信息 + GPU 类型
    c += l + gpuData + l + gpuType
    // Chrome、Edge 一致
    c += l + 23 + l + 127 + l + 127 + l + 23 + l + 127 + l + 127 + l + 23 + l + 127 + l + 127 + l + 23 + l + 127 + l + 127 + l + 23 + l + 127 + l + 127 + l + 23 + l + 127 + l + 127 + l + 0 + l + 31 + l + 30 + l + 0 + l + 31 + l + 30 + l + 0 + l + 31 + l + 30 + l + 0 + l + 31 + l + 30 + l + 0 + l + 31 + l + 30 + l + 0 + l + 31 + l + 30
    var u = function u(t) {
        return (new TextEncoder).encode(t)
    };

    function D(t, e) {
        for (var n, r, i = 3 & (t = "string" == typeof t ? u(t) : t).length, o = t.length - i, a = e || 16, s = 3432918353, c = 461845907, l = 0; l < o;)
            r = 255 & t[l] | (255 & t[++l]) << 8 | (255 & t[++l]) << 16 | (255 & t[++l]) << 24,
                ++l,
                a = 27492 + (65535 & (n = 5 * (65535 & (a = (a ^= r = (65535 & (r = (r = (65535 & r) * s + (((r >>> 16) * s & 65535) << 16) & 4294967295) << 15 | r >>> 17)) * c + (((r >>> 16) * c & 65535) << 16) & 4294967295) << 13 | a >>> 19)) + ((5 * (a >>> 16) & 65535) << 16) & 4294967295)) + ((58964 + (n >>> 16) & 65535) << 16);
        switch (r = 0,
            i) {
            case 3:
                r ^= (255 & t[l + 2]) << 16;
            case 2:
                r ^= (255 & t[l + 1]) << 8;
            case 1:
                a ^= r = (65535 & (r = (r = (65535 & (r ^= 255 & t[l])) * s + (((r >>> 16) * s & 65535) << 16) & 4294967295) << 15 | r >>> 17)) * c + (((r >>> 16) * c & 65535) << 16) & 4294967295
        }
        return a = 2246822507 * (65535 & (a = (a ^= t.length) ^ a >>> 16)) + ((2246822507 * (a >>> 16) & 65535) << 16) & 4294967295,
            a = 3266489909 * (65535 & (a ^= a >>> 13)) + ((3266489909 * (a >>> 16) & 65535) << 16) & 4294967295,
            "".concat((a ^= a >>> 16) >>> 0)
    }

    return D(c);
}

function nCanvasToDataUrl(toDataURL){
    function H(t, e) {
        for (var n = "", r = Math.floor(t.length / e), i = 0, o = 0; o < e;)
            n += t[i],
                i += r,
                o++;
        return n
    }
    var u = function u(t) {
        return (new TextEncoder).encode(t)
    };

    function D(t, e) {
        for (var n, r, i = 3 & (t = "string" == typeof t ? u(t) : t).length, o = t.length - i, a = e || 16, s = 3432918353, c = 461845907, l = 0; l < o;)
            r = 255 & t[l] | (255 & t[++l]) << 8 | (255 & t[++l]) << 16 | (255 & t[++l]) << 24,
                ++l,
                a = 27492 + (65535 & (n = 5 * (65535 & (a = (a ^= r = (65535 & (r = (r = (65535 & r) * s + (((r >>> 16) * s & 65535) << 16) & 4294967295) << 15 | r >>> 17)) * c + (((r >>> 16) * c & 65535) << 16) & 4294967295) << 13 | a >>> 19)) + ((5 * (a >>> 16) & 65535) << 16) & 4294967295)) + ((58964 + (n >>> 16) & 65535) << 16);
        switch (r = 0,
            i) {
            case 3:
                r ^= (255 & t[l + 2]) << 16;
            case 2:
                r ^= (255 & t[l + 1]) << 8;
            case 1:
                a ^= r = (65535 & (r = (r = (65535 & (r ^= 255 & t[l])) * s + (((r >>> 16) * s & 65535) << 16) & 4294967295) << 15 | r >>> 17)) * c + (((r >>> 16) * c & 65535) << 16) & 4294967295
        }
        return a = 2246822507 * (65535 & (a = (a ^= t.length) ^ a >>> 16)) + ((2246822507 * (a >>> 16) & 65535) << 16) & 4294967295,
            a = 3266489909 * (65535 & (a ^= a >>> 13)) + ((3266489909 * (a >>> 16) & 65535) << 16) & 4294967295,
            "".concat((a ^= a >>> 16) >>> 0)
    }
    return D(H(toDataURL, 500))
}

function getDeviceFP(addLocationHref, sessionID, userAgent, timeZoneOffset, useLanguages, timeZone, gpuData, gpuType, browserToDataURL, navigatorPlatform, networkType, networkDownLink, rttNet, pluginsNum) {
    let STRUCT_VERSION = 6,
        messageBody = [STRUCT_VERSION, 0],
        randomToken = Math.floor(1e9 * Math.random()),
        randomByte = 255 & randomToken,
        segmentOffset = 80;

    messageBody[2] = 255 & randomToken,
        messageBody[3] = randomToken >> 8 & 255,
        messageBody[4] = randomToken >> 16 & 255,
        messageBody[5] = randomToken >> 24 & 255,
        messageBody.length = 10;


    function addSmallInt(t, e) {
        t &= 255;
        var n, r = segmentOffset % 8, i = randomByte, o = messageBody, a = o.length - 1;
        r ? (n = o[a] ^ i,
            o[a] = n ^ t << r & 255 ^ i,
        8 < r + e && (o[1 + a] = (n = t >> 8 - r) ^ i)) : o[1 + a] = t ^ i,
            segmentOffset += e
    }

    function addString(t) {
        var e = Math.min(255, t.length);
        if (addSmallInt(e, 8), 0 !== e) {
            for (var n = segmentOffset, r = messageBody, i = randomByte, o = n % 8 ? r.length - 1 : r.length, a = r[o] ^ i, s = 0; s < e; s++) {
                var c = t.charCodeAt(s)
                    , l = (127 < c && (c = 32), n % 8)
                    , a = l ? (r[o] = a ^ c << l & 255 ^ i, o += 1, c >> 8 - l) : c;
                n += 7
            }
            n % 8 && (r[r.length] = a ^ i),
                segmentOffset = n
        }
    }

    // sessionID
    addString(sessionID);

    // User-Agent
    addString(userAgent);

    // href 固定值 √
    //addLocationHref = 'https://www.midasbuy.com/razer/hk/buy/pubgm'
    addString(addLocationHref);

    function get_random_t() {
        for (var t = "", e = 0; e < 32; e++)
            t += "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ".substr(Math.floor(62 * Math.random()), 1);
        return t
    }

    function z_func() {
        random_t = get_random_t()
        n = 'SC' + random_t;
        return n;
    }

    nSC = z_func();
    addString(nSC);

    // sjarsdfg, html -> √
    addString("sjarsdfg is not defined,SyntaxError: Unexpected token '<', \"<html></html>\" is not valid JSON");

    // setAttribute
    addString("function setAttribute() { [native code] }");

    // offsetWidth
    addString("function get offsetWidth() { [native code] }");

    // 获取当前时间 √
    function getUtcTime() {
        // 创建一个新的Date对象
        let currentDate = new Date();

        // 获取日期的各个部分
        let day = currentDate.getDate();
        // 月份是从 0 开始计数的, 因此需要加 1
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let seconds = currentDate.getSeconds();

        // 构建时间字符串
        let timeString = [
            // 小时
            (hours < 10 ? '0' : '') + hours,
            // 分钟
            (minutes < 10 ? '0' : '') + minutes,
            // 秒
            (seconds < 10 ? '0' : '') + seconds,
        ].join(':');

        // 构建日期字符串
        let dateUtcString = [
            // 星期几
            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][currentDate.getDay()],
            // 月份
            ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month - 1],
            // 日期
            (day < 10 ? '0' : '') + day,
            // 年份
            year,
            // 时间部分
            timeString,
            // 时区
            'GMT+0800',
            // 时区名称
            '(中国标准时间)'
        ].join(' ');

        // 构建日期字符串
        let dateString = [
            // 年份
            year,
            // 月份
            month,
            // 日期
            day,
        ].join('/');

        // 最终的日期时间字符串
        let finalDateTimeString = dateString + ' ' + timeString;

        return {'UTC': dateUtcString, 'Base': finalDateTimeString};
    }

    // UTC 时间 √
    timeDict = getUtcTime()
    utcData = timeDict['UTC'];

    addString(utcData);

    // 标准时间 √
    baseTime = timeDict['Base']
    addString(baseTime);

    // 固定值
    // 获取本地时间与 UTC 时间之间的时区偏移量
    offset = (timeZoneOffset / 60).toString()
    addString(offset)

    // 语言 √
    //addString(JSON.stringify(useLanguages || []));
    addString(useLanguages);

    // timeZone 时区 √
    addString(timeZone);

    // navigator.maxTouchPoints, navigator.msMaxTouchPoints
    addSmallInt(0, 8);

    // GPU 信息 √
    // ANGLE (Intel, Intel(R) UHD Graphics 620 (0x00005917) Direct3D11 vs_5_0 ps_5_0, D3D11)
    addString(gpuData)

    // GPU 型号
    // Google Inc. (Intel)
    addString(gpuType);

    // fp canvas toDataUrl 相关信息, 根据 GPU 信息变化
    sFp = getGpuCanvasFp(gpuData, gpuType)
    addString(sFp)

    // canvas toDataURL 非定值, 不同浏览器不同
    getN = nCanvasToDataUrl(browserToDataURL);
    addString(getN);

    // navigator.platform √
    addString(navigatorPlatform);

    // c = (Math.exp(10) + 1 / Math.exp(10)) / 2 + "|" + Math.tan(-1e300) 固定值 √
    addString("11013.232920103324|-1.4214488238747245");

    // 系统网络连接信息 √
    // Navigator.connection.effectiveType 当前网络连接的有效类型 2g、3g、4g
    addString(networkType);

    // Navigator.connection.downlink 带宽 √
    addString(networkDownLink);

    function addSeg(t) {
        messageBody[messageBody.length - 1] = messageBody[messageBody.length - 1] ^ randomByte ^ t[0] ^ randomByte;
        for (var e = 1, n = t.length - 1; e < n; e++)
            messageBody[messageBody.length] = t[e] ^ randomByte;
        segmentOffset += t[t.length - 1]
    }

    function toByteArray(t, e, n) {
        var r = [0]
            , i = n % 8
            , o = e;
        if (0 < i) {
            r[0] = t << i & 255;
            for (var a = 8 - i, s = 0; s < a; s++)
                t = Math.floor(t / 2);
            o -= a
        }
        if (32 < o) {
            r[r.length] = 255 & t,
                r[r.length] = t >> 8 & 255,
                r[r.length] = t >> 16 & 255,
                r[r.length] = t >> 24 & 255,
                o -= 32;
            for (var c = 0; c < 32; c++)
                t = Math.floor(t / 2)
        }
        for (; 0 < o;)
            r[r.length] = 255 & t,
                t >>= 8,
                o -= 8;
        return r[r.length] = e,
            r
    }

    // rtt -> 100 √
    // 当前网络连接的估计往返时间
    addSeg(toByteArray(rttNet, 16, segmentOffset));

    // saveData √
    addSmallInt(0, 2);

    // d √
    addSmallInt(3, 2);

    // h ->  h = Math.floor(100 * f.level) || 0) -> 0 √
    addSmallInt(0, 7);

    // navigator.plugins.length 当前浏览器已安装的插件数量 √
    addSmallInt(pluginsNum, 6);

    // PDF 组件 √
    addString("internal-pdf-viewer(PDF%20Viewer),application/pdf,text/pdf");

    // PluginArray √
    // {"0":{"0":{},"1":{}},"1":{"0":{},"1":{}},"2":{"0":{},"1":{}},"3":{"0":{},"1":{}},"4":{"0":{},"1":{}}}
    addString("-");

    // navigator.permissions √
    addSmallInt(0, 1);

    // navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack -> 0 | 1 √
    addSmallInt(0, 1);

    // √ var b = ["userActivation"in navigator ? 1 : 0, "mediaSession"in navigator ? 1 : 0, "string" == typeof navigator.vendor && 0 === navigator.vendor.indexOf("Google") ? 1 : 0, "BackgroundFetchManager"in window ? 1 : 0, "BatteryManager"in window ? 1 : 0, "webkitMediaStream"in window ? 1 : 0, "webkitSpeechGrammar"in window ? 1 : 0].join("");
    addSmallInt(parseInt('1111111', 2), 7);

    // "__nightmare"in window ? 1 : 0 √
    addSmallInt(0, 1);

    // parseInt(["callPhantom"in window ? 1 : 0, "_phantom"in window ? 1 : 0, "phantom"in window ? 1 : 0].join(""), 2) √
    addSmallInt(0, 3);

    // navigator.webdriver ? 1 : 0 √
    addSmallInt(0, 1);

    // navigator.javaEnabled && navigator.javaEnabled() √
    addSmallInt(0, 1);

    screen = {
        'colorDepth': 24,
        // 864
        'height': 1080,
        // 1536
        'width': 1920
    }
    addString(screen.colorDepth + "");
    addString(screen.height + "");
    addString(screen.width + "");
    // √
    addSmallInt(1, 1);

    function fixed() {
        var t = segmentOffset % 8;
        0 != t && (segmentOffset += 8 - t)
    }

    fixed()

    function checkSum() {
        HEAD_LENGTH = 2;
        for (var t = 176, e = messageBody, n = messageBody.length, r = HEAD_LENGTH; r < n; r++)
             var i = e[r]
                 , t = t + ~(255 & i) & 255 ^ i;
        messageBody[1] = t = 255 & t ^ 255
    }

    checkSum()
    return base64Encrypt(messageBody);
}

// 需要传入请求时的 sessionID
sessionID = '03263971476451373171067691883267699';

// User-Agent -> user-agent.txt
// --- Edge --
userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0';

// GPU -> gpu.txt
gpuData = 'ANGLE (Intel, Intel(R) UHD Graphics 620 (0x00005917) Direct3D11 vs_5_0 ps_5_0, D3D11)';
gpuType = "Google Inc. (" + gpuData.split(', ')[0].split('(')[1] + ")";

// canvas toDataURL
// --- Edge --- Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0
edgeToDataURL = "data:image/png;base64,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"
// --- Chrome --- Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
chromeToDataURL = "data:image/png;base64,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";
// --- Firefox --- Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0
fireFoxToDataURL = "data:image/png;base64,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"
// 选择一个浏览器的 canvas.toDataURL()
browserToDataURL = edgeToDataURL;

// 操作系统版本 Win64
navigatorPlatform = 'Win32'

// 获取本地时间与 UTC 时间之间的时区偏移量, 固定值
timeZoneOffset = 480

// 语言 en-GB、fr-FR、es-ES
useLanguages = '["zh-CN"]'

// 中国用户所在时区(官方), 固定值
timeZone = 'Asia/Shanghai'

// 网络连接类型 ---> 3g、4g、5g
networkType = '4g'
// 网络带宽 ---> 7.9、9.5、10Mbit/s
networkDownLink = '10'
// 当前网络连接大概的往返时间 ---> 100、200ms
rttNet = 100

// 当前浏览器已安装的插件数量
pluginsNum = 5

addLocationHref = 'https://www.midasbuy.com/razer/hk/buy/pubgm'

device_fp = getDeviceFP(addLocationHref, sessionID, userAgent, timeZoneOffset, useLanguages, timeZone, gpuData, gpuType, browserToDataURL, navigatorPlatform, networkType, networkDownLink, rttNet, pluginsNum);
//console.log(device_fp);

exports.getDeviceFP = getDeviceFP

