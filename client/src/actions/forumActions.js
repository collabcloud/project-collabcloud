import axios from "axios";
import {
  RESOURCE_NOT_FOUND,
  ATTEMPT,
  POST_SUCCESSFUL,
  GET_SUBFORUM,
  GET_SUBFORUMS,
  GET_THREAD,
  GET_THREADS,
  GET_POSTS,
} from "./types";

//Returns a list of subforum objects
//{sid: XXXXX, name: XXXXX, desc: XXXXX}
export const get_subforums = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = "/api/forum/subforum";

  axios
    .get(url, config)
    .then((response) => {
      dispatch({
        type: GET_SUBFORUMS,
        payload: response.data,
      });
    })
    .catch((err) => {
      if (err.response.status === 404) {
        dispatch({
          type: RESOURCE_NOT_FOUND,
        });
      } else {
        dispatch({
          type: ATTEMPT,
        });
      }
    });
};

//Returns a list of subforum objects
//{sid: XXXXX, name: XXXXX, desc: XXXXX}
export const get_subforum = (subforumName) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = "/api/forum/subforum/" + subforumName;

  axios
    .get(url, config)
    .then((response) => {
      dispatch({
        type: GET_SUBFORUM,
        payload: response.data,
      });
    })
    .catch((err) => {
      if (err.response.status === 404) {
        dispatch({
          type: RESOURCE_NOT_FOUND,
        });
      } else {
        dispatch({
          type: ATTEMPT,
        });
      }
    });
};

//Returns a list of subforum objects
//{sid: XXXXX, name: XXXXX, desc: XXXXX}
export const get_all_threads = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = "/api/forum/getAllThreads";
  axios
    .get(url, config)
    .then((response) => {
      dispatch({
        type: GET_THREADS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ATTEMPT,
      });
    });
};

//Returns a list of subforum objects
//{sid: XXXXX, name: XXXXX, desc: XXXXX}
export const get_thread = (subforum, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = "/api/forum/thread/" + subforum + "/" + id;
  axios
    .get(url, config)
    .then((response) => {
      dispatch({
        type: GET_THREAD,
        payload: response.data,
      });
    })
    .catch((err) => {
      if (err.response.status === 404) {
        dispatch({
          type: RESOURCE_NOT_FOUND,
        });
      } else {
        dispatch({
          type: ATTEMPT,
        });
      }
    });
};

//Returns a list of thread objects
//{tid: XXXXX, sid: XXXX, topic: XXXXX, content: XXXXX, submitter: XXXXX, dateCreated: XXXXXX}
export const get_threads = (sid) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = "/api/forum/thread";
  axios
    .get(url, { params: { sid: sid } }, config)
    .then((response) => {
      dispatch({
        type: GET_THREADS,
        payload: response.data,
      });
    })
    .catch((err) => {
      if (err.response.status === 404) {
        dispatch({
          type: RESOURCE_NOT_FOUND,
        });
      } else {
        dispatch({
          type: ATTEMPT,
        });
      }
    });
};

//Returns a list of post objects in the specified thread
//{tid: XXXXX, sid: XXXX, topic: XXXXX, content: XXXXX, submitter: XXXXX, dateCreated: XXXXXX}
export const get_posts = (tid) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = "/api/forum/post";

  axios
    .get(url, { params: { tid: tid } }, config)
    .then((response) => {
      dispatch({
        type: GET_POSTS,
        payload: response.data,
      });
    })
    .catch((err) => {
      if (err.response.status === 404) {
        dispatch({
          type: RESOURCE_NOT_FOUND,
        });
      } else {
        dispatch({
          type: ATTEMPT,
        });
      }
    });
};

//{}
export const post_subforum = (title, description) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = "/api/forum/subforum";
  const body = JSON.stringify({ title: title, description: description });
  const res = await axios.post(url, body, config);

  // If success, dispatch action
  if (res) {
    dispatch({
      type: POST_SUCCESSFUL,
      payload: res.data,
    });
  } else {
    dispatch({
      type: ATTEMPT,
    });
  }
};

export const post_thread = (sid, submitter, subforum, topic, content) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = "/api/forum/thread";
  const body = JSON.stringify({
    sid: sid,
    submitter: submitter,
    subforum: subforum,
    topic: topic,
    content: content,
  });

  axios
    .post(url, body, config)
    .then((response) => {
      dispatch({
        type: POST_SUCCESSFUL,
        payload: response.data,
      });
    })
    .catch((err) => {
      if (err.response.status === 404) {
        dispatch({
          type: RESOURCE_NOT_FOUND,
        });
      } else {
        dispatch({
          type: ATTEMPT,
        });
      }
    });
};

export const make_post = (tid, sid, submitter, submitterUid, content) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = "/api/forum/post";
  const body = JSON.stringify({
    tid: tid,
    sid: sid,
    submitter: submitter,
    submitterUid: submitterUid,
    content: content,
  });

  axios
    .post(url, body, config)
    .then((response) => {
      dispatch({
        type: POST_SUCCESSFUL,
        payload: response.data,
      });
    })
    .catch((err) => {
      if (err.response.status === 404) {
        dispatch({
          type: RESOURCE_NOT_FOUND,
        });
      } else {
        dispatch({
          type: ATTEMPT,
        });
      }
    });
};
