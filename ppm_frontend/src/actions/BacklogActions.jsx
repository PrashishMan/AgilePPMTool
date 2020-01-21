import axion from "axios";
import { GET_BACKLOG_ERRORS, GET_BACKLOG } from "./types";
export const addProjectTask = (
  backlog_id,
  projectTask,
  history
) => async dispatch => {
  try {
    await axion.post(`/api/backlog/${backlog_id}`, projectTask);
    history.push(`/projectBoard/${backlog_id}`);
    dispatch({
      type: GET_BACKLOG_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_BACKLOG_ERRORS,
      payload: err.response.data
    });
  }
};

export const getBacklog = project_id => async dispatch => {
  try {
    let res = await axion.get(`/api/backlog/${project_id}`);
    dispatch({
      type: GET_BACKLOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_BACKLOG_ERRORS,
      payload: err.response.data
    });
  }
};
