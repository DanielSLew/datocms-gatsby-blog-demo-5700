"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var createUrl = require('./createUrl');

var _require = require('gatsby-plugin-image/graphql-utils'),
    getGatsbyImageResolver = _require.getGatsbyImageResolver;

var _require2 = require('gatsby-plugin-image'),
    generateImageData = _require2.generateImageData;

var getBase64 = require('./getBase64');

var getTracedSVG = require('./getTracedSVG');

var blurHashCache = new Map();

var generateImageSource = function generateImageSource(baseURL, width, height, format, fit, _ref) {
  var focalPoint = _ref.focalPoint,
      options = _objectWithoutProperties(_ref, ["focalPoint"]);

  var src = createUrl(baseURL, _objectSpread({}, options, {
    w: width,
    h: height
  }), {
    autoFormat: true,
    focalPoint: focalPoint
  });
  return {
    src: src,
    width: width,
    height: height,
    format: format
  };
};

module.exports = function (_ref2) {
  var cacheDir = _ref2.cacheDir;

  function resolve(_x, _x2) {
    return _resolve.apply(this, arguments);
  }

  function _resolve() {
    _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(node, _ref3) {
      var _node$entityPayload;

      var _ref3$imgixParams, imgixParams, _ref3$placeholder, placeholder, props, image, sourceMetadata, otherProps;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref3$imgixParams = _ref3.imgixParams, imgixParams = _ref3$imgixParams === void 0 ? {} : _ref3$imgixParams, _ref3$placeholder = _ref3.placeholder, placeholder = _ref3$placeholder === void 0 ? 'DOMINANT_COLOR' : _ref3$placeholder, props = _objectWithoutProperties(_ref3, ["imgixParams", "placeholder"]);
              image = node === null || node === void 0 ? void 0 : (_node$entityPayload = node.entityPayload) === null || _node$entityPayload === void 0 ? void 0 : _node$entityPayload.attributes;

              if (!(!image.is_image || image.format === 'svg')) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", null);

            case 4:
              sourceMetadata = {
                width: image.width,
                height: image.height,
                format: image.format
              };
              otherProps = {};

              if (!(placeholder === 'DOMINANT_COLOR')) {
                _context.next = 10;
                break;
              }

              otherProps.backgroundColor = image.colors[0].hex;
              _context.next = 20;
              break;

            case 10:
              if (!(placeholder === 'BLURRED')) {
                _context.next = 16;
                break;
              }

              _context.next = 13;
              return getBase64(_objectSpread({}, sourceMetadata, {
                src: image.url
              }), cacheDir);

            case 13:
              otherProps.placeholderURL = _context.sent;
              _context.next = 20;
              break;

            case 16:
              if (!(placeholder === 'TRACED_SVG')) {
                _context.next = 20;
                break;
              }

              _context.next = 19;
              return getTracedSVG(_objectSpread({}, sourceMetadata, {
                src: image.url
              }), cacheDir);

            case 19:
              otherProps.placeholderURL = _context.sent;

            case 20:
              imgixParams.focalPoint = node.focalPoint;
              return _context.abrupt("return", generateImageData(_objectSpread({
                filename: image.url,
                pluginName: 'gatsby-source-datocms',
                generateImageSource: generateImageSource,
                sourceMetadata: sourceMetadata,
                formats: ['auto'],
                options: imgixParams
              }, otherProps, {}, props)));

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _resolve.apply(this, arguments);
  }

  return getGatsbyImageResolver(resolve, {
    imgixParams: 'DatoCmsImgixParams',
    placeholder: {
      type: 'enum DatoImagePlaceholder { NONE, DOMINANT_COLOR, TRACED_SVG, BLURRED }',
      description: "Format of generated placeholder, displayed while the main image loads.\nDOMINANT_COLOR: a solid color, calculated from the dominant color of the image (default).\nBLURRED: a blurred, low resolution image, encoded as a base64 data URI \nTRACED_SVG: a low-resolution traced SVG of the image. Note that this will download the image at build time for processing.\nNONE: no placeholder. Set \"backgroundColor\" to use a fixed background color."
    }
  });
};