import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "./../../actions/BacklogActions";

class ProjectBoard extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props.getBacklog(id);
  };

  static getDerivedStateFromProps = (nextState, prevState) => {
    if (nextState.errors !== prevState.errors) {
      return { errors: nextState.errors };
    }
  };

  boardAlgo = (errors, project_tasks) => {
    const backlogError = errors.backlog_error;
    if (project_tasks.length < 1) {
      if (backlogError && backlogError.projectNotFound) {
        return (
          <div className="alert alert-danger text-center" role="alert">
            {backlogError.projectNotFound}
          </div>
        );
      } else {
        return (
          <div className="alert alert-info text-center" role="alert">
            No Project Task on this board
          </div>
        );
      }
    } else {
      return <Backlog project_tasks={project_tasks} />;
    }
  };

  render() {
    const { id } = this.props.match.params;
    const { project_tasks } = this.props.backlogs;
    const { errors } = this.state;

    return (
      <div className="container">
        <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        {this.boardAlgo(errors, project_tasks)}
      </div>
    );
  }
}

ProjectBoard.propType = {
  getBacklog: PropTypes.func.isRequired,
  backlog: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  backlogs: state.backlogs,
  errors: state.errors
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
