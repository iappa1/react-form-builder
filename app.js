import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DemoBar from './demobar';
import FormBuilder from './src/index';
import * as variables from './variables';
import ColorPicker from './src/ColorPicker';

require('./scss/application.scss');


const url = '/api/formdata';
const saveUrl = '/api/formdata';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: { r: 245, g: 249, b: 250, a: 1 },
      pageColor: { r: 108, g: 92, b: 231, a: 1 },
      borderColor: { r: 0, g: 0, b: 0, a: 1 },
      previewData: [],
      borderWidth: 1,
      borderType: 'solid',
      background_image_url: ''
    };
  }

  onPost = (data) => {
    console.log('onPost', saveUrl, data);
    this.setState({ previewData: data.task_data });
  };

  render() {
    console.log('state change: ', this.state);
    let { r, g, b, a } = this.state.pageColor;
    let bgColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    const style = {width: '100%', display: 'flex', justifyContent: 'center', background: bgColor, margin: 0, padding: 0, paddingBottom: 100};
    return (
      <div className="form-builder-container" style={style}>
        <div className="form-builder">
          {/* <h1>Preview</h1>
          <FormBuilder.ReactFormGenerator
            form_action="/path/to/form/submit"
            form_method="POST"
            data={this.state.previewData}
          /> */}
          <h1 style={{'color': 'white'}}>Change form color</h1>
          <ColorPicker default={this.state.backgroundColor} onChange={color => this.setState({ backgroundColor: color })} />
          <ColorPicker default={this.state.borderColor} onChange={color => this.setState({ borderColor: color })} />
          <input type="number" value={this.state.borderWidth} onChange={e => this.setState({borderWidth: e.target.value})} />
          <input type="url" value={this.state.background_image_url} onChange={e => this.setState({background_image_url: e.target.value})} />
          <select selected={this.state.borderType} onChange={e => this.setState({borderType: e.target.value})} >
            <option value="solid">Solid</option>
            <option value="dotted">Dotted</option>
            <option value="dashed">Dashed</option>
          </select>
          <h1 style={{'color': 'white'}}>Change background color</h1>
          <ColorPicker default={this.state.pageColor} onChange={color => this.setState({ pageColor: color })} />
          <hr />
          <br />
          <FormBuilder.ReactFormBuilder
            variables={variables}
            formColor={this.state.backgroundColor}
            borderColor={this.state.borderColor}
            borderWidth={this.state.borderWidth}
            borderType={this.state.borderType}
            background_image_url={this.state.background_image_url}
            customAttributes={[
              { type: 'string', name: 'first_name' },
              { type: 'string', name: 'last_name' },
            ]}
            url={url}
            saveUrl={saveUrl}
            onPost={this.onPost}
          />
        </div>
      </div>
    )
  }
}




ReactDOM.render(
  <App />,
  document.getElementById('abhi'),
);



// ReactDOM.render(
//   <DemoBar variables={variables} />,
//   document.getElementById('demo-bar'),
// );


































// ReactDOM.render(
//   <FormBuilder.ReactFormBuilder variables={variables}
//     onLoad={onLoad}
//     onPost={onPost}
//   />,
//   document.getElementById('form-builder')
// )

// ReactDOM.render(
//   ,
//   document.getElementById('preview'),
// );


// const content = [
//   {
//     id: '3A06600E-D7E1-44FD-AA0C-BFB8AB61B9F1',
//     element: 'Dropdown',
//     text: 'Dropdown',
//     required: false,
//     canHaveAnswer: true,
//     field_name: 'dropdown_38716F53-51AA-4A53-9A9B-367603D82548',
//     label: '<div>Dropdown</div>\n',
//     options: [
//       {
//         value: 'd1',
//         text: '1',
//         key: 'dropdown_option_39F17D90-322B-4E23-8CD6-4D7AD58C4DD0',
//       },
//       {
//         value: 'd2',
//         text: '2',
//         key: 'dropdown_option_C3BB35B7-6335-4704-BD03-1228D7C33EAE',
//       },
//       {
//         value: 'd3',
//         text: '3',
//         key: 'dropdown_option_31C5C3A9-59B3-4CD5-B997-3754C6B05353',
//       },
//     ],
//   },
//   {
//     id: '7C8F465D-C09C-42CF-8563-EEF26635382F',
//     element: 'Checkboxes',
//     text: 'Checkboxes',
//     required: false,
//     canHaveAnswer: true,
//     field_name: 'checkboxes_8D6BDC45-76A3-4157-9D62-94B6B24BB833',
//     label: '<div>check box</div>\n',
//     options: [
//       {
//         value: 'c1',
//         text: '1',
//         key: 'checkboxes_option_8657F4A6-AA5A-41E2-A44A-3E4F43BFC4A6',
//       },
//       {
//         value: 'c2',
//         text: '2',
//         key: 'checkboxes_option_1D674F07-9E9F-4143-9D9C-D002B29BA9E4',
//       },
//       {
//         value: 'c3',
//         text: '3',
//         key: 'checkboxes_option_6D097591-E445-4BB4-8474-03BFDAA06BFC',
//       },
//     ],
//   },
//   {
//     id: '850B1CE9-E8D8-47CA-A770-25496EECC000',
//     element: 'RadioButtons',
//     text: 'Multiple Choice',
//     required: false,
//     canHaveAnswer: true,
//     field_name: 'radio_buttons_F79ACC6B-7EBA-429E-870C-124F4F0DA90B',
//     label: '<div>radio</div>\n',
//     options: [
//       {
//         value: 'r1',
//         text: '1',
//         key: 'radiobuttons_option_D3277CC8-FDB2-4CEB-AE83-C126492062B6',
//       },
//       {
//         value: 'r2',
//         text: '2',
//         key: 'radiobuttons_option_553B2710-AD7C-46B4-9F47-B2BD5942E0C7',
//       },
//       {
//         value: 'r3',
//         text: '3',
//         key: 'radiobuttons_option_08175D04-FF32-4FFB-9210-630AA155573E',
//       },
//     ],
//   },
//   {
//     id: '34611241-27CF-4D0A-9B8D-6F84024D6876',
//     element: 'Rating',
//     text: 'Rating',
//     required: false,
//     canHaveAnswer: true,
//     field_name: 'rating_3B3491B3-71AC-4A68-AB8C-A2B5009346CB',
//     label: '<div>star</div>\n',
//   },
// ];

// const onLoad = function() {
//   console.log('onLoad');
//   return get(url);
// }

// const onPost = function(data) {
//   console.log('onPost', data);
//   post(saveUrl, data);
// }

// const items = [
//   {
//     key: 'TextInput',
//     canHaveAnswer: true,
//     canHaveAlternateForm: false,
//     name: 'Text Input',
//     label: 'Placeholder Label',
//     icon: 'fa fa-font',
//     field_name: 'text_input_',
//   },
//   {
//     key: 'Dropdown',
//     canHaveAnswer: true,
//     name: 'Dropdown',
//     icon: 'fa fa-caret-square-o-down',
//     label: 'Placeholder Label',
//     field_name: 'dropdown_',
//     options: [],
//   },
//   {
//     key: 'RadioButtons',
//     canHaveOptionValue: false,
//     name: 'Multiple Choice',
//     icon: 'fa fa-dot-circle-o',
//     label: 'Placeholder Label',
//     field_name: 'radiobuttons_',
//     options: [],
//   },
// ];

let previewData = [
  { bold: false,
    canHaveAlternateForm: true,
    canHaveDisplayHorizontal: true,
    canHaveOptionCorrect: true,
    canHaveOptionValue: true,
    canHavePageBreakBefore: true,
    content: "Hello World ",
    dirty: false,
    element: "Header",
    id: "6CE8CAC0-AF86-4CE6-ABC3-A7AD6EA4FDA0",
    italic: false,
    required: false,
    static: true,
    text: "Header Text"
  },
  // {
  //   canHaveAlternateForm: true,
  //   canHaveAnswer: true,
  //   canHaveDisplayHorizontal: true,
  //   canHaveOptionCorrect: true,
  //   canHaveOptionValue: true,
  //   canHavePageBreakBefore: true,
  //   dirty: false,
  //   element: "Dropdown",
  //   field_name: "dropdown_B8E939E0-A25B-43E9-8EBF-6FD72A0EA348",
  //   id: "E532D5A7-7C5E-4950-B652-558C37021655",
  //   label: "Placeholder Labela ",
  //   options: [
  //     {key: "dropdown_option_572CFCAF-7ED2-4990-96D1-7EEE50E20FBB",
  //     text: "Place holder option 1",
  //     value: "place_holder_option_1"}
  //   ],
  //   required: false,
  //   static: undefined,
  //   text: "Dropdown"
  // }
];
