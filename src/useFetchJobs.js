import { useReducer, useEffect } from 'react';
import axios from 'axios';

const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error'
}

const BASE_URL = 'http://localhost:3001/https://jobs.github.com/positions.json';

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] }
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs }
    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload.error, jobs: [] }
    default:
      return state;
  }
}

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true })

  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST })
  axios.get(BASE_URL, { Accept: '*/*' }, {
      params: { markdown: true, page: page, ...params }
    }).then(res => {
      dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } })
    }).catch(err => {
      dispatch({ type: ACTIONS.ERROR, payload: { jobs: err.data } })
    })
  }, [params, page])
  return state
}