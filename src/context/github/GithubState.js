// all of actions, fetch data etc.

import { useReducer } from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './GithubReducer'
import {
  SET_LOADING,
  SEARCH_USER,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types'

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: [],
    repos: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  // Get users

  // Get repos

  // Search user

  // Set loading

  // Clear users

  // now they are available globally to our app
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubState
