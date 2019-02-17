import { useEffect, useReducer } from 'react';

const ACTION_REQUESTED = 'ACTION_REQUESTED';
const ACTION_FETCHED = 'ACTION_FETCHED';

export function fetchReducer(state, action) {
  switch (action.type) {
    case ACTION_REQUESTED: {
      return { ...state, url: action.url, response: null };
    }
    case ACTION_FETCHED: {
      console.log(action.url, action.response)
      return { ...state, url: action.url, response: action.response };
    }
    default:
      return state;
  }
}

const INITIAL_FETCH_STATE = {
  response: null,
  url: null,
};


export function useFetchJson(requestedUrl, ready = true) {
  const [{ response, url }, dispatch] = useReducer(fetchReducer, INITIAL_FETCH_STATE)

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (requestedUrl !== url) {
      dispatch({ type: ACTION_REQUESTED, url: requestedUrl });

      fetchUrl(requestedUrl, (data) => {
        dispatch({ type: ACTION_FETCHED, url: requestedUrl, response: data });
      });
    }
  });

  return response;
}

function fetchUrl(url, successCallback) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      successCallback(jsonData);
    }).catch((error) => {
      throw new Error(error);
    });
}