"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactTextareaAutosize = _interopRequireDefault(require("react-textarea-autosize"));

var _draftJs = require("draft-js");

var _draftjsToHtml = _interopRequireDefault(require("draftjs-to-html"));

var _reactDraftWysiwyg = require("react-draft-wysiwyg");

var _ColorPic = _interopRequireDefault(require("./ColorPic"));

var _dynamicOptionList = _interopRequireDefault(require("./dynamic-option-list"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var toolbar_options = {
  options: ['inline', 'fontSize', 'fontFamily', 'textAlign', 'list', 'colorPicker', 'link', 'image'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['bold', 'italic', 'underline', 'strikethrough'],
    bold: {
      className: undefined
    },
    italic: {
      className: undefined
    },
    underline: {
      className: undefined
    },
    strikethrough: {
      className: undefined
    }
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined
  },
  fontSize: {
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined
  },
  fontFamily: {
    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['unordered', 'ordered', 'indent', 'outdent'],
    unordered: {
      className: undefined
    },
    ordered: {
      className: undefined
    },
    indent: {
      className: undefined
    },
    outdent: {
      className: undefined
    }
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['left', 'center', 'right', 'justify'],
    left: {
      className: undefined
    },
    center: {
      className: undefined
    },
    right: {
      className: undefined
    },
    justify: {
      className: undefined
    }
  },
  colorPicker: {
    className: undefined,
    component: _ColorPic["default"],
    popupClassName: undefined
  },
  image: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    previewImage: false,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: {
      present: false,
      mandatory: false
    },
    defaultSize: {
      height: 'auto',
      width: 'auto'
    }
  }
};

var FormElementsEdit =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FormElementsEdit, _React$Component);

  function FormElementsEdit(props) {
    var _this;

    _classCallCheck(this, FormElementsEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormElementsEdit).call(this, props));
    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false
    };
    return _this;
  }

  _createClass(FormElementsEdit, [{
    key: "toggleRequired",
    value: function toggleRequired() {// const this_element = this.state.element;
    }
  }, {
    key: "editElementProp",
    value: function editElementProp(elemProperty, targProperty, e) {
      var _this2 = this;

      // elemProperty could be content or label
      // targProperty could be value or checked
      var this_element = this.state.element;
      this_element[elemProperty] = e.target[targProperty];
      this.setState({
        element: this_element,
        dirty: true
      }, function () {
        if (targProperty === 'checked') {
          _this2.updateElement();
        }
      });
    }
  }, {
    key: "onEditorStateChange",
    value: function onEditorStateChange(index, property, editorContent) {
      // const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '<div>').replace(/<\/p>/g, '</div>');
      var html = (0, _draftjsToHtml["default"])((0, _draftJs.convertToRaw)(editorContent.getCurrentContent())).replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/(?:\r\n|\r|\n)/g, ' ');
      var this_element = this.state.element;
      this_element[property] = html;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "updateElement",
    value: function updateElement() {
      var this_element = this.state.element; // to prevent ajax calls with no change

      if (this.state.dirty) {
        this.props.updateElement.call(this.props.preview, this_element);
        this.setState({
          dirty: false
        });
      }
    }
  }, {
    key: "convertFromHTML",
    value: function convertFromHTML(content) {
      var newContent = (0, _draftJs.convertFromHTML)(content);

      if (!newContent.contentBlocks) {
        // to prevent crash when no contents in editor
        return _draftJs.EditorState.createEmpty();
      }

      var contentState = _draftJs.ContentState.createFromBlockArray(newContent);

      return _draftJs.EditorState.createWithContent(contentState);
    }
  }, {
    key: "render",
    value: function render() {
      console.log("S: ", this.state);

      if (this.state.dirty) {
        this.props.element.dirty = true;
      }

      var this_checked = this.props.element.hasOwnProperty('required') ? this.props.element.required : false;
      var this_read_only = this.props.element.hasOwnProperty('readOnly') ? this.props.element.readOnly : false;
      var this_default_today = this.props.element.hasOwnProperty('defaultToday') ? this.props.element.defaultToday : false;
      var this_show_time_select = this.props.element.hasOwnProperty('showTimeSelect') ? this.props.element.showTimeSelect : false;
      var this_show_time_select_only = this.props.element.hasOwnProperty('showTimeSelectOnly') ? this.props.element.showTimeSelectOnly : false;
      var this_checked_inline = this.props.element.hasOwnProperty('inline') ? this.props.element.inline : false;
      var this_checked_bold = this.props.element.hasOwnProperty('bold') ? this.props.element.bold : false;
      var this_checked_italic = this.props.element.hasOwnProperty('italic') ? this.props.element.italic : false;
      var this_checked_center = this.props.element.hasOwnProperty('center') ? this.props.element.center : false;
      var this_checked_page_break = this.props.element.hasOwnProperty('pageBreakBefore') ? this.props.element.pageBreakBefore : false;
      var this_checked_alternate_form = this.props.element.hasOwnProperty('alternateForm') ? this.props.element.alternateForm : false;
      var _this$props$element = this.props.element,
          canHaveAlternateForm = _this$props$element.canHaveAlternateForm,
          canHaveDisplayHorizontal = _this$props$element.canHaveDisplayHorizontal,
          canHaveOptionCorrect = _this$props$element.canHaveOptionCorrect,
          canHaveOptionValue = _this$props$element.canHaveOptionValue;
      var this_custom_attributes = this.props.customAttributes && this.props.customAttributes.length > 0 ? this.props.customAttributes : [];
      var this_files = this.props.files.length ? this.props.files : [];

      if (this_files.length < 1 || this_files.length > 0 && this_files[0].id !== '') {
        this_files.unshift({
          id: '',
          file_name: ''
        });
      }

      var editorState;

      if (this.props.element.hasOwnProperty('content')) {
        editorState = this.convertFromHTML(this.props.element.content);
      }

      if (this.props.element.hasOwnProperty('label')) {
        editorState = this.convertFromHTML(this.props.element.label);
      }

      console.log('12345');
      console.log(this.props);
      console.log(this_custom_attributes);
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "clearfix"
      }, _react["default"].createElement("h4", {
        className: "pull-left"
      }, this.props.element.text), _react["default"].createElement("i", {
        className: "pull-right fa fa-times dismiss-edit",
        onClick: this.props.manualEditModeOff
      })), this.props.element.hasOwnProperty('content') && _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("label", {
        className: "control-label"
      }, "Text to display:"), _react["default"].createElement(_reactDraftWysiwyg.Editor, {
        toolbar: toolbar_options,
        defaultEditorState: editorState,
        onBlur: this.updateElement.bind(this),
        onEditorStateChange: this.onEditorStateChange.bind(this, 0, 'content')
      })), this.props.element.hasOwnProperty('file_path') && _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "fileSelect"
      }, "Choose file:"), _react["default"].createElement("select", {
        id: "fileSelect",
        className: "form-control",
        defaultValue: this.props.element.file_path,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'file_path', 'value')
      }, this_files.map(function (file) {
        var this_key = "file_".concat(file.id);
        return _react["default"].createElement("option", {
          value: file.id,
          key: this_key
        }, file.file_name);
      }))), this_custom_attributes.length > 0 ? _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("label", {
        className: "control-label"
      }, "Select Attribute"), _react["default"].createElement("select", {
        className: "form-control",
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'selected_attribute', 'value')
      }, this_custom_attributes.map(function (attr) {
        return _react["default"].createElement("option", {
          value: attr.name,
          key: attr.name
        }, attr.name);
      }))) : _react["default"].createElement(_react["default"].Fragment, null), this.props.element.hasOwnProperty('href') && _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement(_reactTextareaAutosize["default"], {
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.href,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'href', 'value')
      })), this.props.element.hasOwnProperty('src') && _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "srcInput"
      }, "Link to:"), _react["default"].createElement("input", {
        id: "srcInput",
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.src,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'src', 'value')
      })), _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("div", {
        className: "checkbox"
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        checked: this_checked_center,
        value: true,
        onChange: this.editElementProp.bind(this, 'center', 'checked')
      }), "Center?"))), _react["default"].createElement("div", {
        className: "row"
      }, _react["default"].createElement("div", {
        className: "col-sm-3"
      }, _react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "elementWidth"
      }, "Width:"), _react["default"].createElement("input", {
        id: "elementWidth",
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.width,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'width', 'value')
      })), _react["default"].createElement("div", {
        className: "col-sm-3"
      }, _react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "elementHeight"
      }, "Height:"), _react["default"].createElement("input", {
        id: "elementHeight",
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.height,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'height', 'value')
      })))), this.props.element.hasOwnProperty('label') && _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("label", null, "Display Label"), _react["default"].createElement(_reactDraftWysiwyg.Editor, {
        toolbar: toolbar_options,
        defaultEditorState: editorState,
        onBlur: this.updateElement.bind(this),
        onEditorStateChange: this.onEditorStateChange.bind(this, 0, 'label')
      }), _react["default"].createElement("br", null), _react["default"].createElement("div", {
        className: "checkbox"
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        checked: this_checked,
        value: true,
        onChange: this.editElementProp.bind(this, 'required', 'checked')
      }), "Required")), this.props.element.hasOwnProperty('readOnly') && _react["default"].createElement("div", {
        className: "checkbox"
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        checked: this_read_only,
        value: true,
        onChange: this.editElementProp.bind(this, 'readOnly', 'checked')
      }), "Read only")), this.props.element.hasOwnProperty('defaultToday') && _react["default"].createElement("div", {
        className: "checkbox"
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        checked: this_default_today,
        value: true,
        onChange: this.editElementProp.bind(this, 'defaultToday', 'checked')
      }), "Default to Today?")), this.props.element.hasOwnProperty('showTimeSelect') && _react["default"].createElement("div", {
        className: "checkbox"
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        checked: this_show_time_select,
        value: true,
        onChange: this.editElementProp.bind(this, 'showTimeSelect', 'checked')
      }), "Show Time Select?")), this_show_time_select && this.props.element.hasOwnProperty('showTimeSelectOnly') && _react["default"].createElement("div", {
        className: "checkbox"
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        checked: this_show_time_select_only,
        value: true,
        onChange: this.editElementProp.bind(this, 'showTimeSelectOnly', 'checked')
      }), "Show Time Select Only?")), (this.state.element.element === 'RadioButtons' || this.state.element.element === 'Checkboxes') && canHaveDisplayHorizontal && _react["default"].createElement("div", {
        className: "checkbox"
      }, _react["default"].createElement("label", null, _react["default"].createElement("input", {
        type: "checkbox",
        checked: this_checked_inline,
        value: true,
        onChange: this.editElementProp.bind(this, 'inline', 'checked')
      }), "Display horizonal"))), this.state.element.element === 'Signature' && this.props.element.readOnly ? _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "variableKey"
      }, "Variable Key:"), _react["default"].createElement("input", {
        id: "variableKey",
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.variableKey,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'variableKey', 'value')
      }), _react["default"].createElement("p", {
        className: "help-block"
      }, "This will give the element a key that can be used to replace the content with a runtime value.")) : _react["default"].createElement("div", null), this.props.element.hasOwnProperty('step') && _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("div", {
        className: "form-group-range"
      }, _react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "rangeStep"
      }, "Step"), _react["default"].createElement("input", {
        id: "rangeStep",
        type: "number",
        className: "form-control",
        defaultValue: this.props.element.step,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'step', 'value')
      }))), this.props.element.hasOwnProperty('min_value') && _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("div", {
        className: "form-group-range"
      }, _react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "rangeMin"
      }, "Min"), _react["default"].createElement("input", {
        id: "rangeMin",
        type: "number",
        className: "form-control",
        defaultValue: this.props.element.min_value,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'min_value', 'value')
      }), _react["default"].createElement("input", {
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.min_label,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'min_label', 'value')
      }))), this.props.element.hasOwnProperty('max_value') && _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("div", {
        className: "form-group-range"
      }, _react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "rangeMax"
      }, "Max"), _react["default"].createElement("input", {
        id: "rangeMax",
        type: "number",
        className: "form-control",
        defaultValue: this.props.element.max_value,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'max_value', 'value')
      }), _react["default"].createElement("input", {
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.max_label,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'max_label', 'value')
      }))), this.props.element.hasOwnProperty('default_value') && _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("div", {
        className: "form-group-range"
      }, _react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "defaultSelected"
      }, "Default Selected"), _react["default"].createElement("input", {
        id: "defaultSelected",
        type: "number",
        className: "form-control",
        defaultValue: this.props.element.default_value,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'default_value', 'value')
      }))), this.props.showCorrectColumn && this.props.element.canHaveAnswer && !this.props.element.hasOwnProperty('options') && _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "correctAnswer"
      }, "Correct Answer"), _react["default"].createElement("input", {
        id: "correctAnswer",
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.correct,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'correct', 'value')
      })), this.props.element.hasOwnProperty('options') && _react["default"].createElement(_dynamicOptionList["default"], {
        showCorrectColumn: this.props.showCorrectColumn,
        canHaveOptionCorrect: canHaveOptionCorrect,
        canHaveOptionValue: canHaveOptionValue,
        data: this.props.preview.state.data,
        updateElement: this.props.updateElement,
        preview: this.props.preview,
        element: this.props.element,
        key: this.props.element.options.length
      }));
    }
  }]);

  return FormElementsEdit;
}(_react["default"].Component);

exports["default"] = FormElementsEdit;
FormElementsEdit.defaultProps = {
  className: 'edit-element-fields'
};