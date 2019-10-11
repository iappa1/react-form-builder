"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _store = _interopRequireDefault(require("./stores/store"));

var _formElementsEdit = _interopRequireDefault(require("./form-elements-edit"));

var _sortableFormElements = _interopRequireDefault(require("./sortable-form-elements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PlaceHolder = _sortableFormElements["default"].PlaceHolder;

var Preview =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Preview, _React$Component);

  function Preview(props) {
    var _this;

    _classCallCheck(this, Preview);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Preview).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "editModeOff", function (e) {
      if (_this.editForm.current && !_this.editForm.current.contains(e.target)) {
        _this.manualEditModeOff();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "manualEditModeOff", function () {
      var editElement = _this.props.editElement;

      if (editElement && editElement.dirty) {
        editElement.dirty = false;

        _this.updateElement(editElement);
      }

      _this.props.manualEditModeOff();
    });

    var onLoad = props.onLoad,
        onPost = props.onPost;

    _store["default"].setExternalHandler(onLoad, onPost);

    _this.editForm = _react["default"].createRef();
    _this.state = {
      data: [],
      answer_data: {}
    };

    var onUpdate = _this._onChange.bind(_assertThisInitialized(_this));

    _store["default"].subscribe(function (state) {
      return onUpdate(state.data);
    });

    _this.moveCard = _this.moveCard.bind(_assertThisInitialized(_this));
    _this.insertCard = _this.insertCard.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Preview, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.data !== nextProps.data) {
        _store["default"].dispatch('updateOrder', nextProps.data);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          url = _this$props.url,
          saveUrl = _this$props.saveUrl;

      _store["default"].dispatch('load', {
        loadUrl: url,
        saveUrl: saveUrl,
        data: data || []
      });

      document.addEventListener('mousedown', this.editModeOff);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('mousedown', this.editModeOff);
    }
  }, {
    key: "_setValue",
    value: function _setValue(text) {
      return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
    }
  }, {
    key: "updateElement",
    value: function updateElement(element) {
      var data = this.state.data;
      var found = false;

      for (var i = 0, len = data.length; i < len; i++) {
        if (element.id === data[i].id) {
          data[i] = element;
          found = true;
          break;
        }
      }

      if (found) {
        _store["default"].dispatch('updateOrder', data);
      }
    }
  }, {
    key: "_onChange",
    value: function _onChange(data) {
      var _this2 = this;

      var answer_data = {};
      data.forEach(function (item) {
        if (item && item.readOnly && _this2.props.variables[item.variableKey]) {
          answer_data[item.field_name] = _this2.props.variables[item.variableKey];
        }
      });
      this.setState({
        data: data,
        answer_data: answer_data
      });
    }
  }, {
    key: "_onDestroy",
    value: function _onDestroy(item) {
      _store["default"].dispatch('delete', item);
    }
  }, {
    key: "insertCard",
    value: function insertCard(item, hoverIndex) {
      var data = this.state.data;
      data.splice(hoverIndex, 0, item);
      this.saveData(item, hoverIndex, hoverIndex);
    }
  }, {
    key: "moveCard",
    value: function moveCard(dragIndex, hoverIndex) {
      var data = this.state.data;
      var dragCard = data[dragIndex];
      this.saveData(dragCard, dragIndex, hoverIndex);
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "cardPlaceHolder",
    value: function cardPlaceHolder(dragIndex, hoverIndex) {// Dummy
    }
  }, {
    key: "saveData",
    value: function saveData(dragCard, dragIndex, hoverIndex) {
      var newData = (0, _immutabilityHelper["default"])(this.state, {
        data: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      });
      this.setState(newData);

      _store["default"].dispatch('updateOrder', newData.data);
    }
  }, {
    key: "getElement",
    value: function getElement(item, index) {
      var SortableFormElement = _sortableFormElements["default"][item.element];
      return _react["default"].createElement(SortableFormElement, {
        id: item.id,
        index: index,
        moveCard: this.moveCard,
        insertCard: this.insertCard,
        mutable: false,
        parent: this.props.parent,
        editModeOn: this.props.editModeOn,
        isDraggable: true,
        key: item.id,
        sortData: item.id,
        data: item,
        _onDestroy: this._onDestroy
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var classes = this.props.className;

      if (this.props.editMode) {
        classes += ' is-editing';
      }

      var data = this.state.data.filter(function (x) {
        return !!x;
      });
      var items = data.map(function (item, index) {
        return _this3.getElement(item, index);
      });
      var borderColor = '';

      if (this.props.borderColor) {
        var _this$props$borderCol = this.props.borderColor,
            r = _this$props$borderCol.r,
            g = _this$props$borderCol.g,
            b = _this$props$borderCol.b,
            a = _this$props$borderCol.a;
        borderColor = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
      }

      var formColor = '';

      if (this.props.formColor) {
        var _this$props$formColor = this.props.formColor,
            _r = _this$props$formColor.r,
            _g = _this$props$formColor.g,
            _b = _this$props$formColor.b,
            _a = _this$props$formColor.a;
        formColor = "rgba(".concat(_r, ", ").concat(_g, ", ").concat(_b, ", ").concat(_a, ")");
      }

      var style = {
        borderWidth: this.props.borderWidth,
        borderColor: borderColor,
        borderStyle: this.props.borderType
      };

      if (this.props.background_image_url.length > 0) {
        style['background'] = "url(\"".concat(this.props.background_image_url, "\")");
        style['background-repeat'] = 'repeat';
      } else {
        style['backgroundColor'] = formColor;
      }
      /**
       * color: 'white',
      background: 'red',
      size: 30,
      alignment: 'center',
      borderRadius: 10,
      bold: false,
      italic: false,
      underline: false
       */


      var _this$props$submitBut = this.props.submitButton,
          color = _this$props$submitBut.color,
          background = _this$props$submitBut.background,
          borderRadius = _this$props$submitBut.borderRadius;
      var toolbarStyle = {
        display: 'flex'
      };
      var submitStyle = {
        color: color,
        background: background,
        borderRadius: borderRadius,
        fontSize: this.props.submitButton.size
      };

      if (this.props.submitButton.alignment === "left") {
        submitStyle.marginRight = 'auto';
      } else if (this.props.submitButton.alignment === "right") {
        submitStyle.marginLeft = 'auto';
      } else {
        submitStyle.margin = '15px auto 0 auto';
      }

      if (this.props.submitButton.bold) {
        submitStyle.fontWeight = 'bold';
      }

      if (this.props.submitButton.italic) {
        submitStyle.fontStyle = 'italic';
      }

      if (this.props.submitButton.underline) {
        submitStyle.textDecoration = 'underline';
      }

      return _react["default"].createElement("div", {
        className: classes,
        style: style
      }, _react["default"].createElement("div", {
        className: "edit-form",
        ref: this.editForm
      }, this.props.editElement !== null && _react["default"].createElement(_formElementsEdit["default"], {
        lists: this.props.lists,
        customAttributes: this.props.customAttributes,
        showCorrectColumn: this.props.showCorrectColumn,
        files: this.props.files,
        manualEditModeOff: this.manualEditModeOff,
        preview: this,
        element: this.props.editElement,
        updateElement: this.updateElement
      })), _react["default"].createElement("div", {
        className: "Sortable"
      }, items), _react["default"].createElement(PlaceHolder, {
        id: "form-place-holder",
        show: items.length === 0,
        index: items.length,
        moveCard: this.cardPlaceHolder,
        insertCard: this.insertCard
      }), _react["default"].createElement("div", {
        style: toolbarStyle
      }, _react["default"].createElement("input", {
        type: "submit",
        style: submitStyle,
        className: "btn btn-school btn-big btn-agree"
      })));
    }
  }]);

  return Preview;
}(_react["default"].Component);

exports["default"] = Preview;
Preview.defaultProps = {
  showCorrectColumn: false,
  files: [],
  editMode: false,
  editElement: null,
  className: 'react-form-builder-preview pull-left'
};