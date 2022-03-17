import React from "react";

class LabelInput extends React.Component {
  render() {
    return (
      <label>
        {this.props.label}
        <input
          class={this.props.name}
          type={this.props.type}
          value={this.props.value}
          name={this.props.name}
          onChange={this.props.onChange}
        />
      </label>
    );
  }
}

export default LabelInput;
