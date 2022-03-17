import React from "react";
import LabelInput from "./LabelInput";

//this class is based on the WorkExp class. Refer to that for comments. Minor things are changed.
class Education extends React.Component {
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
        <div className="form-output">
          {delButton}
          {editButton}
          <div class="info-output" key={arrayItem.degree}>
            <b>{arrayItem.degree}</b>, <i>{arrayItem.school}</i>,{" "}
            {arrayItem.gpa}/4.0 gpa, {arrayItem.from} to {arrayItem.to}
          </div>
          <div class="description-output" key={arrayItem.description}>
            {arrayItem.description}
          </div>
        </div>
        /* <div className={index}>
          {delButton}
          {editButton}
          <div key={}>{arrayItem.school}</div>
          <div key={arrayItem.from}>{arrayItem.from}</div>
          <div key={arrayItem.to}>{arrayItem.to}</div>
          <div key={}>{arrayItem.degree}</div>
          <div key={}>{arrayItem.gpa}</div>
          <div key={arrayItem.description}>{arrayItem.description}</div>
        </div> */
      );
    });

    return output;
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <LabelInput
          label="University or School: "
          name="school"
          type="text"
          value={this.state.currentData.school}
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
          label="Degree: "
          name="degree"
          type="text"
          value={this.state.currentData.degree}
          onChange={this.handleChange}
        />
        <LabelInput
          label="GPA: "
          name="gpa"
          type="text"
          value={this.state.currentData.gpa}
          onChange={this.handleChange}
        />
        <label>
          Description:
          <textarea
            type="text"
            class="description"
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
      <div className="education">
        <h2>Education</h2>
        {savedData}
        {output}
      </div>
    );
  }
}

export default Education;
