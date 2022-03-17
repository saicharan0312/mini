import React from "react";
import LabelInput from "./LabelInput";

//this class is based on the WorkExp class. Refer to that for comments. Minor things are changed.
class Skills extends React.Component {
  constructor() {
    super();
    this.state = { formVisible: false, currentData: {}, savedData: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenForm = this.handleOpenForm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(event) {
    this.setState({
      currentData: {
        ...this.state.currentData,
        [event.target.name]: event.target.value,
      },
    });
  }

  handleSubmit(event) {
    this.setState({
      formVisible: false,
      savedData: [...this.state.savedData, this.state.currentData],
      currentData: {},
    });
    event.preventDefault();
  }

  handleCancel(event) {
    this.setState({
      formVisible: false,
    });
  }

  handleOpenForm(event) {
    this.setState({
      formVisible: true,
    });
  }

  handleDelete(event) {
    const array = [...this.state.savedData];
    const index = event.target.id;
    array.splice(index, 1);
    this.setState({ savedData: array });
  }

  handleEdit(event) {
    const index = event.target.id;
    this.setState({
      currentData: this.state.savedData[index],
    });
    this.handleDelete(event);
    this.handleOpenForm(event);
  }

  mapSavedData() {
    const output = this.state.savedData.map((arrayItem, index) => {
      const delButton =
        this.props.workMode === true ? (
          <button
            key={index + 1}
            className="delete-button"
            id={index}
            onClick={this.handleDelete}
          >
            X
          </button>
        ) : (
          ""
        );
      const editButton =
        this.props.workMode === true ? (
          <button
            key={index}
            className="edit-button"
            id={index}
            onClick={this.handleEdit}
          >
            Edit
          </button>
        ) : (
          ""
        );
      return (
        <div className="skills-output">
          {delButton}
          {editButton}
          <div class="one-skill-div" key={arrayItem.skills}>
            {arrayItem.skills}
          </div>
        </div>
      );
    });

    return output;
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <LabelInput
          label="Skill: "
          name="skills"
          type="text"
          value={this.state.currentData.skills}
          onChange={this.handleChange}
        />
        <input class="save-button" type="submit" value="Save" />
        <input
          class="cancel-button"
          type="button"
          value="Cancel"
          onClick={this.handleCancel}
        />
      </form>
    );
  }

  render() {
    let output = "";
    if (this.props.workMode === true) {
      output = this.state.formVisible ? (
        this.renderForm()
      ) : (
        <button class="button" onClick={this.handleOpenForm}>
          +Add
        </button>
      );
    }
    const savedData = this.mapSavedData();
    return (
      <div className="skills-area">
        <h2>Skills</h2>
        <div class="skills-container">{savedData}</div>
        {output}
      </div>
    );
  }
}

export default Skills;
