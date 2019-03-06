window["toast"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/js/toast.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var wrapper = null;
var instances = [];
var options = {
  type: 'log',
  content: '',
  delay: 3000,
  closeButton: true,
  closeOnIteract: true,
  newerOnTop: false,
  position: 'bottom-right',
  escapeHtml: false,
  preventDuplicates: false,
  preventCloseOnHover: true,
  actionButton: '',
  onCreate: function onCreate() {},
  onClick: function onClick() {},
  onAction: function onAction() {},
  onShow: function onShow() {},
  onHide: function onHide() {}
};
var WRAPPER_CLASS = 'toast-wrapper';
var ITEM_CLASS = 'toast-item';
var CONTAINER_CLASS = 'toast-container';

var Toast =
/*#__PURE__*/
function () {
  /**
   *Creates an instance of Toast.
      * @param {object} opts
      */
  function Toast() {
    var _this = this;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Toast);

    // Set opts
    this.opts = Object.assign({}, options, opts); // Prevent doublicates

    if (this.opts.preventDuplicates) {
      var doubleInstance = instances.find(function (instance) {
        return instance.opts.content == _this.opts.content;
      });

      if (doubleInstance && doubleInstance.isShow) {
        doubleInstance._startHide();

        return doubleInstance;
      }
    } // Create toast


    this._create();

    this._bindEvents();

    this.show();
    return this;
  }
  /**
   * @description Create toast element
   * @returns this
   */


  _createClass(Toast, [{
    key: "_create",
    value: function _create() {
      var opts = this.opts;
      var toast = document.createElement('article');
      toast.className = "".concat(ITEM_CLASS, " ").concat(ITEM_CLASS, "-").concat(opts.type);
      toast.innerHTML = ["<div class=\"".concat(CONTAINER_CLASS, "\">"), "<div class=\"".concat(CONTAINER_CLASS, "--content\"></div>"), opts.actionButton ? "<div class=\"".concat(CONTAINER_CLASS, "--action\"><span>").concat(opts.actionButton, "</span></div>") : '', opts.closeButton ? "<div class=\"".concat(CONTAINER_CLASS, "--close\"></div>") : '', '</div>'].join('');
      var content = toast.querySelector(".".concat(CONTAINER_CLASS, "--content"));
      var actionButton = toast.querySelector(".".concat(CONTAINER_CLASS, "--action"));
      var closeButton = toast.querySelector(".".concat(CONTAINER_CLASS, "--close")); // Insert content in toast

      if (opts.content instanceof Node) {
        content.appendChild(opts.content);
      } else if (opts.escapeHtml) {
        content.innerText = opts.content;
      } else {
        content.innerHTML = opts.content;
      } // Define Toast element


      this.toast = toast;
      this.content = content;
      this.actionButton = actionButton;
      this.closeButton = closeButton;

      if (typeof opts.onCreate === 'function') {
        opts.onCreate(this);
      }

      return this;
    }
    /**
     * @description Add listeners on toast actions
     */

  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      var _this2 = this;

      var opts = this.opts;
      var toast = this.toast; // Close on click

      toast.addEventListener('click', function (e) {
        var result;

        if (typeof opts.onClick === 'function') {
          result = opts.onClick(_this2, e);
        }

        if (result !== false && opts.closeOnIteract) {
          _this2.hide();
        }
      }, false); // Prevent from hide when hovered

      if (opts.preventCloseOnHover) {
        toast.addEventListener('mouseenter', this._stopHide.bind(this), false);
        toast.addEventListener('mouseleave', this._startHide.bind(this), false);
      } // Close on close btn


      if (this.closeButton) {
        this.closeButton.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();

          _this2.hide();
        }, false);
      } // Action button


      if (this.actionButton) {
        this.actionButton.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();

          if (typeof opts.onAction === 'function') {
            opts.onAction(_this2, e);
          }

          return false;
        }, false);
      }
    }
    /**
     * @description Run timer after that toast will be hidden
     */

  }, {
    key: "_startHide",
    value: function _startHide() {
      var _this3 = this;

      var opts = this.opts;

      this._stopHide(); // Autohide after delay


      if (typeof opts.delay === 'number' && opts.delay > 0) {
        this._hideTimeout = setTimeout(function () {
          _this3.hide();
        }, opts.delay);
      }
    }
    /**
     * @description Stop timer after that toast will be hidden
     */

  }, {
    key: "_stopHide",
    value: function _stopHide() {
      clearTimeout(this._hideTimeout);
    }
    /**
     * @description Show toast
     */

  }, {
    key: "show",
    value: function show() {
      var opts = this.opts;
      var toast = this.toast;
      this.isShow = true; // First show, create empty wrapper

      if (!wrapper || !document.body.contains(wrapper)) {
        wrapper = document.createElement('section');
        wrapper.className = "".concat(WRAPPER_CLASS, " editor-ui");
        document.body.appendChild(wrapper);
      } // Insert in DOM


      if (!wrapper.contains(toast)) {
        wrapper.setAttribute('position', opts.position);

        if (opts.newerOnTop) {
          wrapper.insertBefore(toast, wrapper.firstChild);
        } else {
          wrapper.appendChild(toast);
        }
      } // Store in instances


      if (instances.indexOf(this) === -1) {
        instances.push(this);
      } // Show


      toast.classList.remove("".concat(ITEM_CLASS, "--hide"));
      toast.classList.add("".concat(ITEM_CLASS, "--display"));
      toast.offsetWidth; // repaint

      toast.classList.add("".concat(ITEM_CLASS, "--show"));

      if (typeof opts.onShow === 'function') {
        opts.onShow(this);
      } // Hide after timeout


      this._startHide();
    }
    /**
     * @description Hide toast
     */

  }, {
    key: "hide",
    value: function hide() {
      var _this4 = this;

      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var opts = this.opts;
      var toast = this.toast;

      var removeToast = function removeToast() {
        var index = instances.indexOf(_this4);

        if (index !== -1) {
          instances.splice(index, 1);
        }

        if (typeof opts.onHide === 'function') {
          opts.onHide(_this4);
        }

        toast.classList.remove("".concat(ITEM_CLASS, "--display"));

        if (wrapper.contains(toast)) {
          wrapper.removeChild(toast);
        }
      };

      this.isShow = false; // Force remove

      if (force) {
        removeToast();
      } // Animate
      else {
          // Remove after animation done
          toast.addEventListener('transitionend', removeToast, false); // Fallback (if hasnt transitions on toast)

          setTimeout(function () {
            removeToast();
          }, 1000); // Hide

          toast.style.height = "".concat(toast.offsetHeight, "px");
          requestAnimationFrame(function () {
            toast.classList.remove("".concat(ITEM_CLASS, "--show"));
            toast.classList.add("".concat(ITEM_CLASS, "--hide"));
            toast.style.height = '';
          });
        }
    }
  }]);

  return Toast;
}();

var notify = function notify() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'log';
  var opts;

  if (_typeof(arguments.length <= 1 ? undefined : arguments[1]) === 'object' && !((arguments.length <= 1 ? undefined : arguments[1]) instanceof Node)) {
    opts = arguments.length <= 1 ? undefined : arguments[1];
  } else {
    opts = Object.assign({
      content: arguments.length <= 1 ? undefined : arguments[1]
    }, arguments.length <= 2 ? undefined : arguments[2]);
  }

  opts.type = type;
  return new Toast(opts);
};

var log = function log() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return notify.apply(void 0, ['log'].concat(args));
};

var error = function error() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return notify.apply(void 0, ['error'].concat(args));
};

var success = function success() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return notify.apply(void 0, ['success'].concat(args));
};

var clear = function clear(force) {
  instances.forEach(function (instance) {
    return instance.hide(force);
  });
}; // Export


/* harmony default export */ var toast = ({
  get wrapper() {
    return wrapper;
  },

  get instances() {
    return instances;
  },

  get options() {
    return options;
  },

  set options(opts) {
    options = Object.assign(options, opts);
  },

  log: log,
  error: error,
  success: success,
  clear: clear
});
// CONCATENATED MODULE: ./src/index.js

/* harmony default export */ var src = __webpack_exports__["default"] = (toast);

/***/ })
/******/ ])["default"];