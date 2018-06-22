import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import { FaEdit } from 'react-icons/lib/fa';
import * as KeyPress from '../../utils/keyPress';

export default class EditLabel extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleTextboxClick = this.handleTextboxClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.state = {
      editing: false,
      enableSave: false,
      editValue: props.value,
      originalValue: props.value,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      const { value } = nextProps;

      if (this.state.originalValue !== value) {
        this.setState({
          editValue: value,
          originalValue: value,
        });
      }
    }
  }
  resetState(event) {
    this.setState({
      editing: false,
      enableSave: false,
      editValue: this.state.originalValue,
    });

    event.stopPropagation();
  }
  handleSave() {
    const { updateFunction } = this.props;
    if (this.state.enableSave) {
      updateFunction(this.state.editValue);
    }

    this.setState({
      editing: false,
      enableSave: false,
    });
  }
  handleKeyPress(e) {
    switch (e.keyCode) {
      case KeyPress.ENTER:
        this.handleSave();
        break;
      case KeyPress.ESC:
        this.resetState();
        break;
      default: break;
    }
  }
  handleFocus(e) {
    const { onTextboxFocus } = this.props;
    const target = _.get(e, 'target', null);
    if (!_.isNil(target)) { // isNil returns true if it is null or undefined
      if (_.isFunction(target.select)) {
        target.select();
      }
    }
    if (_.isFunction(onTextboxFocus)) {
      onTextboxFocus();
    }
  }
  handleDoubleClick(event) {
    this.setState({
      editing: true,
    });

    event.stopPropagation();
  }
  handleChange(event) {
    const stateValue = event.target.value;

    if (_.trim(stateValue) !== '' && _.trim(stateValue) !== _.trim(this.state.editValue)) {
      this.setState({ enableSave: true });
    } else {
      this.setState({ enableSave: false });
    }

    this.setState({ editValue: stateValue });
  }
  handleTextboxClick(event) {
    event.stopPropagation();
  }
  render() {
    const { saveButtonShouldNotBePrimary, onTextboxBlur } = this.props;
    let displayBlock = null;

    const saveButtonClassName = saveButtonShouldNotBePrimary ? 'button md' : 'button md primary';

    if (this.state.editing) {
      const canSave = this.state.enableSave ? 'has-success' : '';
      const fullClass = `edit-label edit-label-editing ${canSave}`;
      displayBlock = (
        <div className={fullClass}>
          <input
            type="text"
            label="Display Name"
            name="displayName"
            value={this.state.editValue}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyPress}
            onClick={this.handleTextboxClick}
            onFocus={this.handleFocus}
            onBlur={onTextboxBlur}
          />
          <span>
            <button className={saveButtonClassName} title="Saves Edits" type="button" onClick={this.handleSave}>
              <span>Save</span>
            </button>
          </span>
          <span>
            <button className="button md" title="Cancel Edits" type="button" onClick={this.resetState}>
              <span>Cancel</span>
            </button>
          </span>
        </div>
      );
    } else {
      displayBlock = (
        <div className="edit-label">
          <div
            onDoubleClick={this.handleDoubleClick}
            title={`${this.state.editValue} (Double click to edit)`}
            className="edit-label_value"
          >
            {this.state.editValue} <FaEdit onClick={this.handleDoubleClick} color="green" />
          </div>
        </div>
      );
    }

    return displayBlock;
  }
}

EditLabel.propTypes = {
  value: PropTypes.string.isRequired,
  updateFunction: PropTypes.func.isRequired,
  onTextboxFocus: PropTypes.func,
  onTextboxBlur: PropTypes.func,
  saveButtonShouldNotBePrimary: PropTypes.bool,
};
