import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { addProjectTask } from "./../../../actions/BacklogActions";
import PropTypes from "prop-types";

class AddProjectTask extends Component {
  constructor(props) {
    const { id } = props.match.params;
    super(props);
    this.state = {
      data: {
        summary: "",
        acceptanceArea: "",
        status: "",
        priority: "0",
        projectIdentifier: id,
        dueDate: ""
      },
      errors: {}
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addProjectTask(
      this.state.data.projectIdentifier,
      this.state.data,
      this.props.history
    );
  };

  componentWillReceiveProps = props => {
    if (props.errors && props.errors.backlog_error) {
      this.setState({ errors: props.errors.backlog_error });
    }
  };

  render() {
    const { id } = this.props.match.params;
    const { errors } = this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/projectBoard/${id}`} className="btn btn-light">
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Add Project Task</h4>
              <p className="lead text-center">Project Name + Project Code</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.summary
                    })}
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.data.summary}
                    onChange={this.handleChange}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.acceptanceArea
                    })}
                    placeholder="Acceptance Criteria"
                    name="acceptanceArea"
                    value={this.state.data.acceptanceArea}
                    onChange={this.handleChange}
                  ></textarea>
                  {errors.acceptanceArea && (
                    <div className="invalid-feedback">
                      {errors.acceptanceArea}
                    </div>
                  )}
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.data.dueDate}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.data.priority}
                    onChange={this.handleChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    onChange={this.handleChange}
                    value={this.state.data.status}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddProjectTask.propTypes = {
  addProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addProjectTask })(AddProjectTask);
