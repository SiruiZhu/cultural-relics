// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"data/architecture_point_completed.geojson":[function(require,module,exports) {
module.exports = "/architecture_point_completed.dfdeea8a.geojson";
},{}],"interactive_map.js":[function(require,module,exports) {
var _map = null,
    _centerLat = 35.5,
    _centerLng = 105,
    _dataFile = require('./data/architecture_point_completed.geojson'),
    _accessToken = "pk.eyJ1Ijoiemh1c2lydWkiLCJhIjoiczRLMGhEMCJ9.37GHQC_3mSKufR5ERmXsLw",
    _mapStyle = "mapbox://styles/zhusirui/cjote0r366qqd2spcea8df8td";

mapboxgl.accessToken = _accessToken;
_map = new mapboxgl.Map({
  container: "map",
  style: _mapStyle,
  center: [_centerLng, _centerLat],
  zoom: 3.3
});

function init() {
  _map.addSource("markers-source", {
    type: "geojson",
    data: _dataFile
  });

  _map.addLayer({
    "id": "markers",
    "type": "circle",
    "source": "markers-source",
    "paint": {
      "circle-color": {
        property: "classification_en",
        type: "categorical",
        stops: [['Ancient architecture', "#66c2a5"], ['Ancient ruins', "#fc8d62"], ['Historical buildings of modern times', "#8da0cb"], ['Ancient tomb', "#e78ac3"], ['Cave temple and stone carving', "#a6d854"], ['others', "#ffd92f"]]
      },
      "circle-radius": 3.5,
      "circle-stroke-width": 0.5
    }
  }); // change the click to hover    


  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  _map.on('mouseenter', 'markers', function (e) {
    _map.getCanvas().style.cursor = "default";
    var coordinates = e.features[0].geometry.coordinates.slice();
    var feature = e.features[0];
    var detail = e.features[0].properties; // console.log('Detail is', detail)

    title = e.features[0].properties.name_en; // console.log('Title is', title)

    era = e.features[0].properties.era_en;
    address = e.features[0].properties.province_en;
    type = e.features[0].properties.classification_en;
    var layout = "<div class='g-popup-line-1'>" + title + "</div>" + "<div class='g-popup-divider'></div>" + "<div class='g-popup-line-1-address'>" + 'Province: ' + address + "</div>" + "<div class='g-popup-line-1-address'>" + 'Type: ' + type + "</div>" + "<div class='g-popup-line-1-address'>" + 'Era: ' + era + "</div>" + "</div></div>"; //               "<div class='g-popup-line-2' style='width: 50%;'>RESIDENTS PER:</div>" + 
    //               "<div class='g-popup-line-2' style='width: 25%; text-align: right;'>AIDE</div>" + 
    //               "<div class='g-popup-line-2' style='width: 25%; text-align: right;'>NURSE</div>" +
    //               "<div class='g-popup-divider'></div>" +
    //               "<div class='.g-popup-line-container'><div class='g-popup-line-3' style='width: 50%;'>Best days</div>" + 
    //               "<div class='g-popup-line-3' style='width: 25%; text-align: right; font-weight: 700;'>" + bestDayAide + "</div>" + 
    //               "<div class='g-popup-line-3' style='width: 25%; text-align: right; font-weight: 700;'>" + bestDayNurse + "</div></div>" +
    //               "<div class='.g-popup-line-container'><div class='g-popup-line-3' style='width: 50%;'>Worst days</div>" + 
    //               "<div class='g-popup-line-3' style='width: 25%; text-align: right; font-weight: 700;'>" + worstDayAide + "</div>" + 
    //               "<div class='g-popup-line-3' style='width: 25%; text-align: right; font-weight: 700;'>" + worstDayNurse + "</div></div>";

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    } // .setLngLat(_map.unproject(e.point))
    // console.log(feature)


    popup.setLngLat(coordinates) // .setHTML("<h4>Relics Information</h4>" + 
    //                     "<table>" + "<tr>" + 
    //                     "<th>Relics Classification" + "</th>" + "<th>Relics Era" + "</th>" + "<th>Relics Detail" + "</th>" + "</tr>" + "<tr>" + 
    //                     "<td>" + feature.properties.classification_en + "</td>" + "<td>" + feature.properties.era_en + "</td>" + "<td>" + feature.properties.add_detail + "</td>" + "</tr>" + 
    //                     "</table>"
    //                    )
    .setHTML(layout).addTo(_map); // _map.getSource("highlight").setData({ "type":"circle",
    //                                       "coordinates": coordinates
    //                                       });
    // _map.setLayoutProperty("highlight", "visibility", "visible");
  });

  _map.on('mouseout', 'markers', function () {
    _map.getCanvas().style.cursor = '';
    popup.remove();
  });
}

_map.once("style.load", function (e) {
  init();

  _map.addControl(new mapboxgl.NavigationControl());

  var layers = ['Architecture before 1912', 'Ruins', 'Architecture after 1912', 'Tomb', 'Cave temple and carving', 'Others'];
  var colors = ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f"];

  for (i = 0; i < layers.length; i++) {
    var layer = layers[i];
    var color = colors[i];
    var item = document.createElement('div');
    var key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;
    var value = document.createElement('span');
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }
});
},{"./data/architecture_point_completed.geojson":"data/architecture_point_completed.geojson"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57944" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","interactive_map.js"], null)
//# sourceMappingURL=/interactive_map.364b8401.map