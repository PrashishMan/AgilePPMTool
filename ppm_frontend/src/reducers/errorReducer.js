import { GET_PROJECT_ERRORS, GET_BACKLOG_ERRORS } from "./../actions/types";

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT_ERRORS:
      return { project_error: action.payload };
    case GET_BACKLOG_ERRORS:
      return { backlog_error: action.payload };
    default:
      return initialState;
  }
}
