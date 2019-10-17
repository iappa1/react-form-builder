import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DemoBar from './demobar';
import FormBuilder from './src/index';
import * as variables from './variables';
import ColorPicker from './src/ColorPicker';
import RenderPreview from './RenderPreview';

require('./scss/application.scss');


const url = '/api/formdata';
const saveUrl = '/api/formdata';

const display_data = {
  "form": {
    "borderStyle": "dotted",
    "borderColor": "#f00",
    "borderWidth": 10,
    "form-color": "#ff0",
    "backgroundColor": "#0f0",
    "width": 500
  },
  "submitStyle": {
	color: 'teal',
	background: 'purple',
	size: 30,
	alignment: 'right',
	borderRadius: 50,
	bold: true,
	italic: true,
	underline: true
  },
	/*"task_data": [{
		"id": "445E3CBB-54A5-4690-8591-BB106506D70D",
		"element": "Header",
		"text": "Heading",
		"static": true,
		"required": false,
		"bold": false,
		"italic": false,
		"content": "<p style=\"text-align:center;\"><span style=\"color: #ff6b00;font-size: 60px;font-family: Tahoma;\">Signup</span></u></em></strong>",
		"canHavePageBreakBefore": true,
		"canHaveAlternateForm": true,
		"canHaveDisplayHorizontal": true,
		"canHaveOptionCorrect": true,
		"canHaveOptionValue": true,
		"dirty": false
	}, {
		"id": "BFF95D18-EAC1-43FD-8B3D-62E639A0C922",
		"element": "LineBreak",
		"text": "Line Break",
		"static": true,
		"required": false,
		"bold": false,
		"italic": false,
		"canHavePageBreakBefore": true,
		"canHaveAlternateForm": true,
		"canHaveDisplayHorizontal": true,
		"canHaveOptionCorrect": true,
		"canHaveOptionValue": true
	}, {
		"id": "855EDB09-79C8-4AC8-8F4A-3B5D9AC243B7",
		"element": "Attributes",
		"text": "Attribute",
		"required": true,
		"canHaveAnswer": true,
		"canHavePageBreakBefore": true,
		"canHaveAlternateForm": true,
		"canHaveDisplayHorizontal": true,
		"canHaveOptionCorrect": true,
		"canHaveOptionValue": true,
		"field_name": "attribute_input_42F447BC-8A29-412A-9EA7-7E3FF1340AEB",
		"label": "First Name ",
		"dirty": false,
		"selected_attribute": "First Name",
		"configuration": {
			"type": "text",
			"name": "First Name",
			"default_value": "",
			"tag": "fname",
			"null_supported": false
		}
	}, {
		"id": "E157B61D-F5B9-4300-A679-D5C5F4727097",
		"element": "Attributes",
		"text": "Attribute",
		"required": true,
		"canHaveAnswer": true,
		"canHavePageBreakBefore": true,
		"canHaveAlternateForm": true,
		"canHaveDisplayHorizontal": true,
		"canHaveOptionCorrect": true,
		"canHaveOptionValue": true,
		"field_name": "attribute_input_2694A645-79FC-4D84-8487-67FF1EA2A791",
		"label": "Last Name ",
		"selected_attribute": "Last Name",
		"configuration": {
			"type": "text",
			"name": "Last Name",
			"default_value": "",
			"tag": "lname",
			"null_supported": true
		},
		"dirty": false
	}, {
		"id": "F922A666-120D-41F6-A6BA-6134FDC195A0",
		"element": "Attributes",
		"text": "Attribute",
		"required": true,
		"canHaveAnswer": true,
		"canHavePageBreakBefore": true,
		"canHaveAlternateForm": true,
		"canHaveDisplayHorizontal": true,
		"canHaveOptionCorrect": true,
		"canHaveOptionValue": true,
		"field_name": "attribute_input_3920FBFA-07BD-43EF-BBE4-80F749B91774",
		"label": "Age ",
		"selected_attribute": "Age",
		"configuration": {
			"type": "number",
			"name": "Age",
			"default_value": "",
			"tag": "age",
			"null_supported": true
		},
		"dirty": false
	},
	{
		"id": "D03BE33A-570E-4166-8185-D7734D9564C4",
		"element": "Attributes",
		"text": "Attribute",
		"required": true,
		"canHaveAnswer": true,
		"canHavePageBreakBefore": true,
		"canHaveAlternateForm": true,
		"canHaveDisplayHorizontal": true,
		"canHaveOptionCorrect": true,
		"canHaveOptionValue": true,
		"field_name": "attribute_input_527A24EF-B573-4881-8DAF-D8F6C081F321",
		"label": "Date of birth ",
		"selected_attribute": "DOB",
		"configuration": {
			"type": "date",
			"name": "DOB",
			"default_value": "",
			"tag": "dob",
			"null_supported": true
		},
		"dirty": false
	},
	{
		"id": "1D9C7D45-8C4B-4BCD-A3B8-7B69E5E54994",
		"element": "Attributes",
		"text": "Attribute",
		"required": true,
		"canHaveAnswer": true,
		"canHavePageBreakBefore": true,
		"canHaveAlternateForm": true,
		"canHaveDisplayHorizontal": true,
		"canHaveOptionCorrect": true,
		"canHaveOptionValue": true,
		"field_name": "attribute_input_75DCA71E-F0F9-4186-8C8C-CB6CEA7D63A3",
		"label": "Email ",
		"selected_attribute": "Email",
		"configuration": {
			"type": "email",
			"name": "Email",
			"default_value": "",
			"tag": "email",
			"null_supported": false
		},
		"dirty": false
	}, {
		"id": "699E7E1E-9FB1-4044-BC6A-DA816CEB5AD2",
		"element": "Attributes",
		"text": "Attribute",
		"required": true,
		"canHaveAnswer": true,
		"canHavePageBreakBefore": true,
		"canHaveAlternateForm": true,
		"canHaveDisplayHorizontal": true,
		"canHaveOptionCorrect": true,
		"canHaveOptionValue": true,
		"field_name": "attribute_input_46419EB9-82FA-435E-BE71-092BD607D203",
		"label": "Phone number ",
		"selected_attribute": "Phone",
		"configuration": {
			"type": "phone",
			"name": "Phone",
			"default_value": "1234567890",
			"tag": "phone",
			"null_supported": true
		},
		"dirty": false
	}, {
		"id": "B75B865C-340B-4E03-95C6-64C266B38B10",
		"element": "Attributes",
		"text": "Attributes",
		"required": true,
		"canHaveAnswer": true,
		"canHaveAlternateForm": true,
		"canHaveDisplayHorizontal": true,
		"canHaveOptionCorrect": true,
		"canHaveOptionValue": true,
		"field_name": "radiobuttons_48189D48-681E-4C91-9702-92AC99A70196",
		"label": "SElect ",
		"options": [{
			"value": true,
			"text": "yes",
			"key": "radiobuttons_option_BDC484F8-48A3-4CFE-AE5D-10C6624E119E"
		}, {
			"value": false,
			"text": "no",
			"key": "radiobuttons_option_C734D19A-C24C-4B70-AB25-EB4B9C0661FA"
		}],
		"selected_attribute": "Eligible",
		"configuration": {
			"type": "boolean",
			"name": "Eligible",
			"default_value": false,
			"tag": "el",
			"null_supported": true
		},
		"dirty": false
	}, {
		"id": "CE5D5EDD-D358-426F-A3AC-6CEF61386A62",
		"element": "List",
		"text": "list",
		"required": true,
		"canHaveAnswer": true,
		"canHaveAlternateForm": true,
		"canHaveDisplayHorizontal": true,
		"canHaveOptionCorrect": true,
		"canHaveOptionValue": true,
		"lists": [{
			"list_id": 11,
			"list_name": "first list"
		}, {
			"list_id": 21,
			"list_name": "second list"
		}, {
			"list_id": 31,
			"list_name": "third list"
		}],
		"selected_lists": ["11", "21", "31"],
		"options": [{
			"value": "11",
			"text": "first list",
			"key": "radiobuttons_option_1"
		}, {
			"value": "21",
			"text": "second list",
			"key": "radiobuttons_option_2"
		}, {
			"value": "31",
			"text": "third list",
			"key": "radiobuttons_option_3"
		}],
		"field_name": "list_input_4A31E042-5273-43A6-940B-CEC6F6CCE242",
		"label": "<strong><span style=\"color: #ff8228;font-size: 36px;font-family: Times New Roman;\">Select the list</span></strong> ",
		"dirty": false
	}]*/
	task_data: [
		{
			canHaveAlternateForm: true,
			canHaveAnswer: true,
			canHaveDisplayHorizontal: true,
			canHaveOptionCorrect: true,
			canHaveOptionValue: true,
			configuration: {
				default_value: "",
				name: "First Name",
				null_supported: false,
				tag: "fname",
				type: "text"
			},
			dirty: false,
			element: "Attributes",
			field_name: "attribute_input_4F19AFF5-F29C-4858-A241-E9F4615E3EBC",
			id: "D63B6BB1-5357-4B23-8458-483E83EDE7EE",
			label: "First name ",
			required: true,
			selected_attribute: "First Name",
			static: undefined,
			text: "Attribute",
		},
		{
			canHaveAlternateForm: true,
			canHaveAnswer: true,
			canHaveDisplayHorizontal: true,
			canHaveOptionCorrect: true,
			canHaveOptionValue: true,
			configuration: {
				default_value: "",
				name: "First Name",
				null_supported: false,
				tag: "fname",
				type: "text"
			},
			dirty: false,
			element: "Attributes",
			field_name: "attribute_input_4F19AFF5-F29C-4858-A241-E9F4615E3EBC",
			id: "D63B6BB1-5357-4B23-8458-483E83EDE7EE",
			label: "First name ",
			required: true,
			selected_attribute: "First Name",
			static: undefined,
			text: "Attribute",
		},
		{
			bold: false,
			canHaveAlternateForm: true,
			canHaveDisplayHorizontal: true,
			canHaveOptionCorrect: true,
			canHaveOptionValue: true,
			content: `<strong><span style="font-size: 60px;font-family: Times New Roman;">Sign up form</span></strong>`,
			dirty: false,
			element: "Header",
			id: "2A4F75B4-3188-4642-BFE8-E2B23A9341A4",
			italic: false,
			required: false,
			static: true,
			text: "Heading"
		},
	{
		bold: false,
		canHaveAlternateForm: true,
		canHaveDisplayHorizontal: true,
		canHaveOptionCorrect: true,
		canHaveOptionValue: true,
		content: `<span style="color: #000000;font-size: 72px;">Hi!</span> `,
		dirty: false,
		element: "Label",
		id: "9B5851A8-E9E0-4D14-89EE-3B6A44849051",
		italic: false,
		required: false,
		static: true,
		text: "Text"
	},
	{
		canHaveAlternateForm: true,
		canHaveAnswer: true,
		canHaveDisplayHorizontal: true,
		canHaveOptionCorrect: true,
		canHaveOptionValue: true,
		configuration: {
			default_value: "",
			name: "Email",
			null_supported: false,
			tag: "email",
			type: "email",
		},
		dirty: false,
		element: "Attributes",
		field_name: "attribute_input_33F53488-969B-45C3-8182-F526A7035A8C",
		id: "F0764368-16CE-4AC3-8225-EC68368896F2",
		label: "Email ",
		required: true,
		selected_attribute: "Email",
		static: undefined,
		text: "Attribute"
	},
	{
		canHaveAlternateForm: true,
		canHaveAnswer: true,
		canHaveDisplayHorizontal: true,
		canHaveOptionCorrect: true,
		canHaveOptionValue: true,
		configuration: {type: "number", name: "Age", default_value: "", tag: "age", null_supported: true},
		dirty: false,
		element: "Attributes",
		field_name: "attribute_input_586AE63E-B89B-4F52-8AD9-4C16E6E61D52",
		id: "CB2CAF92-D111-4FE9-8E90-480A6B25395E",
		label: "Age ",
		required: false,
		selected_attribute: "Age",
		static: undefined,
		text: "Attribute"
	},
	{
		canHaveAlternateForm: true,
		canHaveAnswer: true,
		canHaveDisplayHorizontal: true,
		canHaveOptionCorrect: true,
		canHaveOptionValue: true,
		configuration: {
			default_value: "",
			name: "DOB",
			null_supported: true,
			tag: "dob",
			type: "date"
		},
		dirty: false,
		element: "Attributes",
		field_name: "attribute_input_A261A81F-B83C-413A-8C68-798C249F31E0",
		id: "09467C64-B2A6-4638-8F30-9C8F4D5AE49A",
		label: "Date of Birth ",
		required: false,
		selected_attribute: "DOB",
		static: undefined,
		text: "Attribute",
	},
	{
		canHaveAlternateForm: true,
		canHaveAnswer: true,
		canHaveDisplayHorizontal: true,
		canHaveOptionCorrect: true,
		canHaveOptionValue: true,
		configuration: {
			default_value: "",
			name: "Phone",
			null_supported: true,
			tag: "phone",
			type: "phone"
		},
		dirty: false,
		element: "Attributes",
		field_name: "attribute_input_B278C797-E46E-4F6A-8720-08C4A7433F58",
		id: "B320C87B-0176-49C1-B291-EA3FD703D350",
		label: "Phone",
		required: true,
		static: undefined,
		text: "Attribute"
	},
	{
		canHaveAlternateForm: true,
		canHaveAnswer: true,
		canHaveDisplayHorizontal: true,
		canHaveOptionCorrect: true,
		canHaveOptionValue: true,
		configuration: {
			default_value: false,
			name: "Eligible",
			null_supported: true,
			tag: "elg",
			type: "boolean",
		},
		dirty: false,
		element: "Attributes",
		field_name: "attribute_input_CD3296A0-BC36-4BBB-9CBC-23F0F674B821",
		id: "62B3EB0A-2E7A-4DCD-B5A9-B65DCD04C1F5",
		label: "Eligibility ",
		options: [
			{
				key: "radiobuttons_option_1",
				text: "yes",
				value: true,
			},
			{
				key: "radiobuttons_option_2",
				text: "no",
				value: false,
			}
		],
		required: false,
		selected_attribute: "Eligible",
		static: undefined,
		text: "Attribute"
	},
	{
		canHaveAlternateForm: true,
		canHaveAnswer: true,
		canHaveDisplayHorizontal: true,
		canHaveOptionCorrect: true,
		canHaveOptionValue: true,
		dirty: false,
		element: "List",
		field_name: "list_input_708D8E47-588B-4201-9EA7-863FAE047282",
		id: "5A3E27BA-630F-4961-A6ED-4E2C594059D8",
		label: "Select the list ",
		lists: [
			{
				list_id: 1,
				list_name: "first list",
			},
			{
				list_id: 2,
				list_name: "second list",
			},
			{
				list_id: 3,
				list_name: "third list",
			},
		],
		options: [
			{
				key: "radiobuttons_option_1",
				text: "first list",
				value: "1",
			},
			{
				key: "radiobuttons_option_2",
				text: "second list",
				value: "2",
			},
		],
		required: false,
		selected_lists: ["1","2"],
		static: undefined,
		text: "list"
	}
]
}


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
	  background_image_url: '',
	  submitStyle: {
		color: 'teal',
		background: 'purple',
		size: 30,
		alignment: 'right',
		borderRadius: 50,
		bold: true,
		italic: true,
		underline: true
	  }
    };
  }

  onPost = (data) => {
    console.log('onPost', saveUrl, data);
    console.log(JSON.stringify(data));
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
          <h1>Preview</h1>
          {/* <FormBuilder.ReactFormGenerator
            form_action="/path/to/form/submit"
            form_method="POST"
            data={display_data.task_data}
          /> */}
          <RenderPreview
            data={display_data}
          />
          <div className="spacee" />
          <iframe className="fframe" width="540" height="500" src="https://sibforms.com/serve/MUIEALx_TJv03EqqO8jBu2utszFpcqvbijfefZSdC7qEpQ-yFt--Wu7qFJzuujYVoicjpizQLNos5NnfqI_yRcBv6rup8Ae1XWbdgrPLgYeXFkjED4CMDRD4uTgWgmjcC1XWuOrVgrzgA1bWlTOlMBtFKQPlaagdosnIGOrftGUsRgjYhPEgpe2e9i-J7N-ghWwow92E87PldY5O" frameborder="0" scrolling="auto" allowfullscreen></iframe>
          <div className="spacee" />
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
			// variables={variables}
			data={display_data.task_data}
			submitButton={this.state.submitStyle}
            formColor={this.state.backgroundColor}
            borderColor={this.state.borderColor}
            borderWidth={this.state.borderWidth}
            borderType={this.state.borderType}
			background_image_url={this.state.background_image_url}
			lists={[
				{list_id: 1, list_name: "first list"},
				{list_id: 2, list_name: "second list"},
				{list_id: 3, list_name: "third list"}
			]}
            customAttributes={[
              { type: 'text', name: 'First Name', default_value: '', tag: 'fname', null_supported: false },
              { type: 'text', name: 'Last Name', default_value: '', tag: 'lname', null_supported: true },
              { type: 'number', name: 'Age', default_value: '', tag: 'age', null_supported: true },
              { type: 'date', name: 'DOB', default_value: '', tag: 'dob', null_supported: true },
              { type: 'email', name: 'Email', default_value: '', tag: 'email', null_supported: false },
              { type: 'phone', name: 'Phone', default_value: '', tag: 'phone', null_supported: true },
              { type: 'boolean', name: 'Eligible', default_value: false, tag: 'elg', null_supported: true },
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
