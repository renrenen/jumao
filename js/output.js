(function () {})();

let eden = {
  "start": function () {
    let _0x4bdd05 = config.url,
        _0x5b796f = config.id,
        _0x17053a = config.poster,
        _0x39cc18 = config.title;
    $("body").attr("style", "margin:0;padding:0;");
    $("body").append("<div class=\"artplayer-app\" style=\"width:100%;height:100%;padding:0;margin:0;\">");
    let _0x46296d = "";
    if (config.url.indexOf(".m3u8") == true) _0x46296d = "m3u8";else config.url.indexOf(".flv") == true ? _0x46296d = "flv" : _0x46296d = "";
    eden.player(_0x4bdd05, _0x5b796f, _0x46296d, _0x17053a, _0x39cc18);
  },
  "player": function (_0x341ff0, _0x3b578a, _0x3218f9, _0x20c726, _0x8015bb) {
    var _eden = new Artplayer({
      "container": ".artplayer-app",
      "url": _0x341ff0,
      "id": _0x3b578a,
      "type": _0x3218f9,
      "poster": _0x20c726,
      "title": _0x8015bb,
      "flip": true,
      "playbackRate": true,
      "aspectRatio": true,
      "setting": true,
      "autoMini": true,
      "autoSize": false,
      "loop": false,
      "screenshot": true,
      "hotkey": true,
      "pip": true,
      "fullscreen": true,
      "miniProgressBar": false,
      "playsInline": true,
      "lock": true,
      "fastForward": true,
      "autoPlayback": true,
      "whitelist": ["*"],
      "lang": navigator.language.toLowerCase(),
      "icons": {
        "loading": "<img src=\"//npm.elemecdn.com/eden-static@1.0.0/img/ploading.gif\">",
        "state": "<img src=\"//npm.elemecdn.com/eden-static@1.0.0/img/state.svg\" width=\"150\" heigth=\"150\">",
        "indicator": "<img src=\"//npm.elemecdn.com/eden-static@1.0.0/img/indicator.svg\">",
        "setting": "<img src=\"//npm.elemecdn.com/eden-static@1.0.0/img/setting.svg\" width=\"90%\">",
        "screenshot": "<img src=\"//npm.elemecdn.com/eden-static@1.0.0/img/screenshot.svg\" width=\"85%\">",
        "danmuOn": "<img src=\"//npm.elemecdn.com/eden-static@1.0.0/img/danmuOn.svg\" width=\"85%\">",
        "danmuOff": "<img src=\"//npm.elemecdn.com/eden-static@1.0.0/img/danmuOff.svg\" width=\"85%\">",
        "lock": "<img src=\"//npm.elemecdn.com/eden-static@1.0.0/img/lock.svg\" width=\"60%\">",
        "unlock": "<img src=\"//npm.elemecdn.com/eden-static@1.0.0/img/unlock.svg\" width=\"60%\">",
        "pip": "<img src=\"//npm.elemecdn.com/eden-static@1.0.0/img/pip.svg\" width=\"60%\">",
        "play": "<img src=\"//npm.elemecdn.com/eden-static@1.0.0/img/play.svg\" width=\"80%\">",
        "pause": "<img src=\"//npm.elemecdn.com/eden-static@1.0.0/img/pause.svg\" width=\"80%\">",
        "volume": "<img src=\"//npm.elemecdn.com/eden-static@1.0.0/img/volume.svg\" width=\"80%\">",
        "volumeClose": "<img src=\"//npm.elemecdn.com/eden-static@1.0.0/img/volumeClose.svg\" width=\"80%\">",
        "fullscreenOn": "<img src=\"//npm.elemecdn.com/eden-static@1.0.0/img/fullscreenOn.svg\" width=\"80%\">",
        "fullscreenOff": "<img src=\"//npm.elemecdn.com/eden-static@1.0.0/img/fullscreenOff.svg\" width=\"80%\">"
      },
      "plugins": [artplayerPluginDanmuku({
        "disable": false,
        "danmuku": config.api + "?ac=dm&type=xml&id=" + config.id,
        "color": "#FFFFFF",
        "margin": [10, "25%"],
        "antiOverlap": true,
        "synchronousPlayback": false,
        "filter": _0x539267 => _0x539267.text.length < 50,
        "fontSize": 25,
        "lockTime": config.locktime,
        "maxLength": 50,
        "minWidth": 200,
        "maxWidth": 400,
        "theme": "light",
        "beforeEmit": _0x4dc090 => !!_0x4dc090.text.trim()
      })],
      "moreVideoAttr": {
        "preload": "metadata"
      },
      "customType": {
        "m3u8": playM3u8,
        "flv": playFlv,
        "mpd": playMpd
      }
    });

    eden.Barrage.Init(_eden);

    _eden.on("artplayerPluginDanmuku:emit", _0x9e8627 => {
      eden.Barrage.Insert(_0x9e8627);
    });
  },
  "Barrage": {
    "Init": function (_eden) {
      let _0x631113 = user.group,
          _0x449a4a = user.id != "" ? true : false;

      _0x449a4a == false || _0x631113 == "游客" ? eden.Barrage.Off() : eden.Barrage.On();

      _eden.on("artplayerPluginDanmuku:error", _0x4223e4 => {
        console("加载错误", _0x4223e4);
        eden.Msg.Popup("弹幕库连接失败", 3000);
      });

      _eden.on("artplayerPluginDanmuku:loaded", _0x1433a1 => {
        console.info("已加载弹幕数量为:", _0x1433a1.length);
      });
    },
    "Insert": function (_0x5de0b0) {
      if (_0x5de0b0.text < 1) {
        eden.Msg.Popup("内容呢？", 3000);
        return;
      }

      $.ajax({
        "url": config.api + "?ac=dm",
        "type": "POST",
        "contentType": "application/x-www-form-urlencoded",
        "data": JSON.stringify({
          "player": config.id,
          "author": "",
          "time": _0x5de0b0.time,
          "text": _0x5de0b0.text.replace(new RegExp(config.shield.join("|"), "img"), "哔.."),
          "color": _0x31a97f(_0x5de0b0.color),
          "type": _0x5de0b0.mode == 1 ? "1" : "0",
          "size": "25px",
          "referer": _0x12a15b()
        }),
        "success": function (_0x16df7e) {
          eden.Msg.Popup("发送成功~", 3000);
        },
        "error": function (_0x5cd28c) {
          console.log("发送失败", _0x5cd28c);
          eden.Msg.Popup("发送失败!?", 3000);
        }
      });
    },
    "On": function () {
      let _0x38ec31 = user.name,
          _0x3fe4f3 = "欢迎您 " + _0x38ec31;

      eden.Msg.Popup(_0x3fe4f3, 3000);
      $(".art-danmuku-input").attr("placeholder", "发个友善的弹幕见证当下~");
    },
    "Off": function () {
      $(".art-danmuku-send").attr("disabled", "false");
      $(".art-danmuku-input").attr({
        "disabled": "false",
        "placeholder": "请先 登录 / 注册 账号以发送弹幕~"
      });
    }
  },
  "Msg": {
    "Popup": function (_0x592f00, _0x27eade) {
      $(".artplayer-app").append("<div class=\"popup-msg\"><div class=\"popup-contents\"></div></div>");
      $(".popup-contents").html(_0x592f00);
      $(".popup-msg").show();
      setTimeout(eden.Msg.Remove, _0x27eade);
    },
    "Remove": function () {
      $(".popup-msg").remove();
    }
  }
};

function _0x12a15b() {
  let _0x455fc4 = "";
  return document.referrer.length > 0 ? _0x455fc4 = document.referrer : _0x455fc4 = window.location.href, _0x455fc4;
}

function _0x31a97f(_0x2b44f0) {
  var _0x3aa890 = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

  if (!_0x3aa890.test(_0x2b44f0)) {
    console.log("无效的Hex值");
    return;
  }

  let _0x1de424 = _0x2b44f0.toLowerCase().replace(/\#/g, ""),
      _0x9b435f = _0x1de424.length;

  if (_0x9b435f == 3) {
    let _0x1a6123 = "";

    for (var _0x59cd5f = 0; _0x59cd5f < _0x9b435f; _0x59cd5f++) {
      _0x1a6123 += _0x1de424.slice(_0x59cd5f, _0x59cd5f + 1).concat(_0x1de424.slice(_0x59cd5f, _0x59cd5f + 1));
    }

    _0x1de424 = _0x1a6123;
  }

  let _0x5b7b08 = [];

  for (var _0x59cd5f = 0; _0x59cd5f < 6; _0x59cd5f = _0x59cd5f + 2) {
    let _0x2c16e9 = _0x1de424.slice(_0x59cd5f, _0x59cd5f + 2);

    _0x5b7b08.push(parseInt("0x" + _0x2c16e9));
  }

  return "rgb(" + _0x5b7b08.join(",") + ")";
}