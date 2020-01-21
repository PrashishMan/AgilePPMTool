import React, { Component } from "react";
import PropTypes from "prop-types";
import ProjectTask from "./ProjectTask/ProjectTask";

class Backlog extends Component {
  getProjectTasks = filterValue => {
    const { project_tasks } = this.props;
    const filteredTask = project_tasks.filter(
      task => task.status === filterValue
    );
    const taskList = filteredTask.map(project_task => (
      <ProjectTask
        key={project_task.id}
        project_task={project_task}
      ></ProjectTask>
    ));
    return taskList;
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {this.getProjectTasks("TO_DO")}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {this.getProjectTasks("IN_PROGRESS")}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {this.getProjectTasks("DONE")}
          </div>
        </div>
      </div>
    );
  }
}

Backlog.propType = {
  project_tasks: PropTypes.object.isRequired
};

export default Backlog;
