import React from 'react';
import PropTypes from 'prop-types';

class FileInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      styles: {
        parent: {
          position: 'relative'
        },
        file: {
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0,
          width: '100%',
          zIndex: 1
        },
        text: {
          position: 'relative',
          zIndex: -1
        }
      }
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value.split(/(\\|\/)/g).pop()
    });
    if (this.props.onChange) this.props.onChange(e);
  }

  render() {
    return React.createElement('div', {
      style: this.state.styles.parent
    },
    React.createElement('input', {
      type: 'file',
      name: this.props.name,
      className: this.props.className,
      onChange: this.handleChange,
      disabled: this.props.disabled,
      accept: this.props.accept,
      style: this.state.styles.file
    }),
    React.createElement('input', {
      type: 'text',
      tabIndex: -1,
      name: this.props.name + '_filename',
      value: this.state.value,
      className: this.props.className,
      onChange: function() {},
      placeholder: this.props.placeholder,
      disabled: this.props.disabled,
      style: this.state.styles.text
    }));
  }
}

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  accept: PropTypes.string,
  onChange: PropTypes.func
};

export default FileInput;