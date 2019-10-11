/**
  * <Form />
  */

import React from 'react';
import ReactDOM from 'react-dom';
import { EventEmitter } from 'fbemitter';
import FormValidator from './form-validator';
import FormElements from './form-elements';
import moment from "moment"

const {
  Image, Checkboxes, Signature, Download, Camera, EmailInput
} = FormElements;

export default class ReactForm extends React.Component {
  form;

  inputs = {};

  answerData;

  constructor(props) {
    super(props);
    this.answerData = this._convert(props.answer_data);
    this.emitter = new EventEmitter();
  }

  _convert(answers) {
    if (Array.isArray(answers)) {
      const result = {};
      answers.forEach(x => {
        if (x.name.indexOf('tags_') > -1) {
          result[x.name] = x.value.map(y => y.value);
        } else {
          result[x.name] = x.value;
        }
      });
      return result;
    }
    return answers;
  }

  _getDefaultValue(item) {
    return this.answerData[item.field_name];
  }

  _optionsDefaultValue(item) {
    const defaultValue = this._getDefaultValue(item);
    if (defaultValue) {
      return defaultValue;
    }

    const defaultChecked = [];
    item.options.forEach(option => {
      if (this.answerData[`option_${option.key}`]) {
        defaultChecked.push(option.key);
      }
    });
    return defaultChecked;
  }

  _getItemValue(item, ref) {
    let $item = {
      element: item.element,
      value: '',
    };
    
    if (item.element === 'Rating') {
      $item.value = ref.inputField.current.state.rating;
    } else if (item.element === 'Tags') {
      $item.value = ref.inputField.current.state.value;
    } else if (item.element === 'DatePicker') {
      $item.value = ref.state.value;
    } else if (item.element === 'Camera') {
      $item.value = ref.state.img ? ref.state.img.replace('data:image/png;base64,', '') : '';
    } else if (item.element === 'Attributes') {
      
      if (item.configuration.type === "boolean") {
        const options = ref.options;

        const keys = Object.keys(options);
        let selectedIndex = -1;
        if (options[keys[0]]['checked']) {
          selectedIndex = 0;
        } else if (options[keys[1]]['checked']) {
          selectedIndex = 1;
        }

        $item.value = selectedIndex === -1 ? '' : item.options[selectedIndex]['value'];
        
      } else {
        $item = ReactDOM.findDOMNode(ref.inputField.current);
        //   $item.value = moment($item.value.trim()).format('MM/DD/YYYY');
        if (typeof $item.value === 'string') {
          $item.value = $item.value.trim();
        }
      }

    } else if (item.element === 'List') {
      
      const options = ref.options;
      const selected = []

      for (const opt in options) {
        if (options[opt]['checked']) {
          selected.push(options[opt]['value'])
        }
      }        

      $item.value = selected;

    } else if (ref && ref.inputField) {
      $item = ReactDOM.findDOMNode(ref.inputField.current);
      if (typeof $item.value === 'string') {
        $item.value = $item.value.trim();
      }
    }
    return $item;
  }

  _isIncorrect(item) {
    let incorrect = false;
    if (item.canHaveAnswer) {
      const ref = this.inputs[item.field_name];
      if (item.element === 'Checkboxes' || item.element === 'RadioButtons') {
        item.options.forEach(option => {
          const $option = ReactDOM.findDOMNode(ref.options[`child_ref_${option.key}`]);
          if ((option.hasOwnProperty('correct') && !$option.checked) || (!option.hasOwnProperty('correct') && $option.checked)) {
            incorrect = true;
          }
        });
      } else {
        const $item = this._getItemValue(item, ref);
        if (item.element === 'Rating') {
          if ($item.value.toString() !== item.correct) {
            incorrect = true;
          }
        } else if ($item.value.toLowerCase() !== item.correct.trim().toLowerCase()) {
          incorrect = true;
        }
      }
    }
    return incorrect;
  }

  _isInvalid(item) {
    let invalid = false;
    if (item.required === true) {
      
      const ref = this.inputs[item.field_name];
      if (item.element === 'Checkboxes' || item.element === 'RadioButtons') {
        let checked_options = 0;
        item.options.forEach(option => {
          const $option = ReactDOM.findDOMNode(ref.options[`child_ref_${option.key}`]);
          if ($option.checked) {
            checked_options += 1;
          }
        });
        if (checked_options < 1) {
          // errors.push(item.label + ' is required!');
          invalid = true;
        }
      } else {
        const $item = this._getItemValue(item, ref);
        if (item.element === 'Rating') {
          if ($item.value === 0) {
            invalid = true;
          }
        } else if ($item.type === 'email') {
          const rex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          
          if (!rex.test($item.value.toLowerCase())) {
            invalid = true;
          }
        } else if ($item.type === 'date') {
          const dash_format = moment($item.value, 'Y-M-D', true).isValid()
          if (!dash_format) {
            invalid = true;
          }
        } else if ($item.type === 'tel') {
          const rex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
          if (!rex.test($item.value.toLowerCase())) {
            invalid = true;
          }
        } else if ($item.value === undefined || $item.value.length < 1) {
          invalid = true;
        }
      }
    }
    return invalid;
  }

  _collect(item) {
    const itemData = { name: item.field_name };
    const ref = this.inputs[item.field_name];
    if (item.element === 'Checkboxes' || item.element === 'RadioButtons') {
      const checked_options = [];
      item.options.forEach(option => {
        const $option = ReactDOM.findDOMNode(ref.options[`child_ref_${option.key}`]);
        if ($option.checked) {
          checked_options.push(option.key);
        }
      });
      itemData.value = checked_options;
    } else {
      if (!ref) return null;
      itemData.value = this._getItemValue(item, ref).value;
    }
    return itemData;
  }

  _collectFormData(data) {
    const formData = [];
    data.forEach(item => {
      const item_data = this._collect(item);
      if (item_data) {
        formData.push(item_data);
      }
    });
    return formData;
  }

  _getSignatureImg(item) {
    const ref = this.inputs[item.field_name];
    const $canvas_sig = ref.canvas.current;
    if ($canvas_sig) {
      const base64 = $canvas_sig.toDataURL().replace('data:image/png;base64,', '');
      const isEmpty = $canvas_sig.isEmpty();
      const $input_sig = ReactDOM.findDOMNode(ref.inputField.current);
      if (isEmpty) {
        $input_sig.value = '';
      } else {
        $input_sig.value = base64;
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let errors = [];
    if (!this.props.skip_validations) {
      errors = this.validateForm();
      // Publish errors, if any.
      this.emitter.emit('formValidation', errors);
    }

    // Only submit if there are no errors.
    if (errors.length < 1) {
      const { onSubmit } = this.props;
      if (onSubmit) {
        const data = this._collectFormData(this.props.data);
        onSubmit(data);
      } else {
        const $form = ReactDOM.findDOMNode(this.form);
        $form.submit();
      }
    }
  }

  validateForm() {
    const errors = [];
    let data_items = this.props.data;
    
    if (this.props.display_short) {
      data_items = this.props.data.filter((i) => i.alternateForm === true);
    }

    data_items.forEach(item => {
      if (item.element === 'Signature') {
        this._getSignatureImg(item);
      }

      if (this._isInvalid(item)) {
        errors.push(`${item.label} is required!`);
      }

      if (this.props.validateForCorrectness && this._isIncorrect(item)) {
        errors.push(`${item.label} was answered incorrectly!`);
      }
    });

    return errors;
  }

  getInputElement(item, value) {
    const Input = FormElements[item.element];
    return (<Input
      handleChange={this.handleChange}
      ref={c => this.inputs[item.field_name] = c}
      mutable={true}
      key={`form_${item.id}`}
      data={item}
      read_only={this.props.read_only}
      // defaultValue={value ? value : this._getDefaultValue(item)}
    />);
  }

  getSimpleElement(item, type) {
    const Element = FormElements[type];
    if (item.element === "List") {
      return (<Element ref={c => this.inputs[item.field_name] = c} mutable={true} key={`form_${item.id}`} data={item} />);
    } else {
      return (<Element ref={c => this.inputs[item.field_name] = c} defaultValue={item.configuration.default_value} mutable={true} key={`form_${item.id}`} data={item} />);
    }
  }

  render() {
    console.log(this.props);

    // submit button style start

    const {color, background, borderRadius} = this.props.submitButton;
    
    const submitStyle = {
      color,
      background,
      borderRadius,
      fontSize: this.props.submitButton.size
    }

    if (this.props.submitButton.alignment === "left") {
      submitStyle.marginRight = 'auto';
    } else if (this.props.submitButton.alignment === "right") {
      submitStyle.marginLeft = 'auto';
    } else {
      submitStyle.margin = '0 auto';
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

    // submit button style end
    
    let data_items = this.props.data;

    if (this.props.display_short) {
      data_items = this.props.data.filter((i) => i.alternateForm === true);
    }

    data_items.forEach((item) => {
      if (item.readOnly && item.variableKey && this.props.variables[item.variableKey]) {
        this.answerData[item.field_name] = this.props.variables[item.variableKey];
      }
    });

    const items = data_items.map(item => {
      switch (item.element) {
        case 'TextInput':
        case 'NumberInput':
        case 'TextArea':
        case 'Dropdown':
        case 'DatePicker':
        // case 'RadioButtons':
        case 'Rating':
        case 'Tags':
        case 'Range':
          return this.getInputElement(item);
        case 'Signature':
          return <Signature ref={c => this.inputs[item.field_name] = c} read_only={this.props.read_only || item.readOnly} mutable={true} key={`form_${item.id}`} data={item} defaultValue={this._getDefaultValue(item)} />;
        case 'Checkboxes':
          return <Checkboxes ref={c => this.inputs[item.field_name] = c} read_only={this.props.read_only} handleChange={this.handleChange} mutable={true} key={`form_${item.id}`} data={item} defaultValue={this._optionsDefaultValue(item)} />;
        case 'Image':
          return <Image ref={c => this.inputs[item.field_name] = c} handleChange={this.handleChange} mutable={true} key={`form_${item.id}`} data={item} defaultValue={this._getDefaultValue(item)} />;
        case 'Download':
          return <Download download_path={this.props.download_path} mutable={true} key={`form_${item.id}`} data={item} />;
        case 'Camera':
          return <Camera ref={c => this.inputs[item.field_name] = c} read_only={this.props.read_only || item.readOnly} mutable={true} key={`form_${item.id}`} data={item} defaultValue={this._getDefaultValue(item)} />;
        case 'List':
          console.log("inide list");
          // return <Checkboxes ref={c => this.inputs[item.field_name] = c} read_only={this.props.read_only} handleChange={this.handleChange} mutable={true} key={`form_${item.id}`} data={item} defaultValue={this._optionsDefaultValue(item)} />;
          return this.getSimpleElement(item, 'Lists');
        case 'Attributes':
            // * text
            // * number
            // * date (mm-dd-yyyy | mm/dd/yyyy)
            // * boolean
            // * phone
            // * email
          if (item.configuration.type === 'text') {
            return this.getSimpleElement(item, 'TextInput');
          } else if (item.configuration.type === 'phone') {
            return this.getSimpleElement(item, 'PhoneInput');
          } else if (item.configuration.type === 'number') {
            return this.getSimpleElement(item, 'NumberInput');
          } else if (item.configuration.type === 'email') {
            return this.getSimpleElement(item, 'EmailInput');
          } else if (item.configuration.type === 'date') {
            return this.getSimpleElement(item, 'DateInput');
          } else if (item.configuration.type === 'boolean') {
            return this.getSimpleElement(item, 'RadioButtons');
          }
          
        // default:
        //   return this.getSimpleElement(item);
      }
    });

    const formTokenStyle = {
      display: 'none',
    };

    const actionName = (this.props.action_name) ? this.props.action_name : 'Submit';
    const backName = (this.props.back_name) ? this.props.back_name : 'Cancel';
    const toolbarStyle = {display: 'flex'};

    return (
      <React.Fragment>
        <FormValidator emitter={this.emitter} />
        <div className='react-form-builder-form'>
          <form encType='multipart/form-data' ref={c => this.form = c} action={this.props.form_action} onSubmit={this.handleSubmit.bind(this)} method={this.props.form_method}>
            { this.props.authenticity_token &&
              <div style={formTokenStyle}>
                <input name='utf8' type='hidden' value='&#x2713;' />
                <input name='authenticity_token' type='hidden' value={this.props.authenticity_token} />
                <input name='task_id' type='hidden' value={this.props.task_id} />
              </div>
            }
            {items}
            <div className='btn-toolbar' style={toolbarStyle}>
              { !this.props.hide_actions &&
                <input type='submit' style={submitStyle} className='btn btn-school btn-big btn-agree' value={actionName} />
              }
              { !this.props.hide_actions && this.props.back_action &&
                <a href={this.props.back_action} className='btn btn-default btn-cancel btn-big'>{backName}</a>
              }
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

ReactForm.defaultProps = { validateForCorrectness: false };
