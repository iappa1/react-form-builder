import React, { Component } from 'react';
import FormBuilder from './src/index';

export default class RenderPreview extends Component {
	onSubmit = data => {
		console.log(data);
	}
	render() {
		const {
width, borderStyle, borderColor, borderWidth, backgroundColor,
} = this.props.data.form;
		const style = {
			paddingTop: 10,
			paddingBottom: 10,
			paddingLeft: 30,
			paddingRight: 30,
			width,
			maxWidth: width,
			borderWidth,
			borderColor,
			borderStyle,
			backgroundColor,
		};
		// style['borderWidth'] = borderWidth;
		// style['borderColor'] = borderColor;
		// style['borderStyle'] = borderStyle;
		console.log(this.props);		
		return (
			<div className="top" style={style}>
				<FormBuilder.ReactFormGenerator
					action_name={this.props.data.submitButtonName}
					submitButton={this.props.data.submitStyle}
					onSubmit={this.onSubmit}
					form_action="/path/to/form/submit"
					form_method="POST"
					data={this.props.data.task_data}
				/>
			</div>
		)
	}
}
