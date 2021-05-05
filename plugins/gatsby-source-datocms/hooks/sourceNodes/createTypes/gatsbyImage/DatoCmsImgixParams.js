"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var imgixParams = require('imgix-url-params/dist/parameters');

var _require = require('humps'),
    camelize = _require.camelize;

var objectEntries = require('object.entries');

module.exports = function (_ref) {
  var actions = _ref.actions,
      schema = _ref.schema,
      store = _ref.store;
  var imgixParamsFields = {};
  var mappings = {
    "boolean": 'Boolean',
    hex_color: 'String',
    integer: 'Int',
    list: 'String',
    number: 'Float',
    path: 'String',
    string: 'String',
    timestamp: 'String',
    unit_scalar: 'Float',
    font: 'String',
    ratio: 'String',
    url: 'String'
  };
  objectEntries(imgixParams.parameters).forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        param = _ref3[0],
        doc = _ref3[1];

    var type = 'String';

    if (doc.expects.length === 1) {
      if (mappings[doc.expects[0].type]) {
        type = mappings[doc.expects[0].type];
      }
    }

    imgixParamsFields[camelize(param)] = {
      type: type,
      description: "".concat(doc.short_description, " (").concat(doc.url, ")")
    };
  });
  actions.createTypes([schema.buildInputObjectType({
    name: "DatoCmsImgixParams",
    fields: imgixParamsFields
  })]);
};