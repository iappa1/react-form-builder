import React from 'react';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';

export default class extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '255',
      g: '255',
      b: '255',
      a: '1',
    },
  }

  componentDidMount() {
    // console.log(this.props);
    
    if (this.props.default) {
      this.setState({
        r: this.props.default[0],
        g: this.props.default[1],
        b: this.props.default[2],
        a: this.props.default[3],
      });
    }
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  }

  handleChange = color => {
    const { onChange } = this.props;
    onChange(color.rgb);
    this.setState({ color: color.rgb });
  }

  render() {

    const { r, g, b, a } = this.props.default || this.state.color;

    const styles = reactCSS({
      default: {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${r}, ${g}, ${b}, ${a})`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker
              color={this.state.color}
              onChangeComplete={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
