import React from "react";
import LabelInput from "./LabelInput";

class WorkExp extends React.Component {
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
      //Need to use spread operator so that we do not overwrite the existing elements in current data
      currentData: {
        ...this.state.currentData,
        [event.target.name]: event.target.value,
      },
    });
  }

  handleSubmit(event) {
    this.setState({
      formVisible: false,
      //spread operator maintains elements in savedData and pushes the currentData object to the end of the array
      savedData: [...this.state.savedData, this.state.currentData],
      currentData: {}, //clears current data so the form is ready to input again cleanly
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
    //uses map function to go through every object in the saved data and create the buttons and div to display it
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
        <div className="form-output">
          {delButton}
          {editButton}
          <div class="info-output" key={arrayItem.role}>
            <b>{arrayItem.role}</b>, <i>{arrayItem.company}</i>,{" "}
            {arrayItem.city}, {arrayItem.from} to {arrayItem.to}
          </div>
          <div class="description-output" key={arrayItem.description}>
            {arrayItem.description}
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
          label="Company Name: "
          name="company"
          type="text"
          value={this.state.currentData.company}
          onChange={this.handleChange}
        />
        <LabelInput
          label="City: "
          name="city"
          type="text"
          value={this.state.currentData.city}
          onChange={this.handleChange}
        />
        <LabelInput
          label="From: "
          name="from"
          type="date"
          value={this.state.currentData.from}
          onChange={this.handleChange}
        />
        <LabelInput
          label="To: "
          name="to"
          type="text"
          value={this.state.currentData.to}
          onChange={this.handleChange}
        />
        <LabelInput
          label="Role: "
          name="role"
          type="text"
          value={this.state.currentData.role}
          onChange={this.handleChange}
        />
        <label>
          Description:
          <textarea
            class="description"
            type="text"
            value={this.state.currentData.description}
            name="description"
            onChange={this.handleChange}
          ></textarea>
        </label>
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
    //only displays the add butto or form if the workmode prop is true.
    if (this.props.workMode === true) {
      //either makes the output the add button or shows the form
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
      <div className="work-exp">
        <h2>Work Experience</h2>
        {savedData}
        {output}
      </div>
    );
  }
}

export default WorkExp;
