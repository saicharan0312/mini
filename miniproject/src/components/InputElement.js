import React from "react";

class InputElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      text: this.props.text,
      class: this.props.class,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClick() {
    this.setState({
      editable: true,
      text: this.state.text,
    });
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleBlur(event) {
    this.setState({
      editable: false,
      text: event.target.value === "" ? this.props.text : event.target.value,
    });
  }

  render() {
    const output = this.state.editable ? (
      <input
        type="text"
        value={this.state.text}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        autoFocus="true"
      />
    ) : (
      <p className={this.props.class} onClick={this.handleClick}>
        {this.state.text}
      </p>
    );
    return output;
  }
}

export default InputElement;
