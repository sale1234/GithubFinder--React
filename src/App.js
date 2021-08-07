import './App.css'
import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import About from './components/pages/About'
import GithubState from './context/github/GithubState'

const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  // Search github users
  const searchUsers = async (text) => {
    // start with true, and then ask if it has finished, if it is, stop spinner

    setLoading(true)
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_user=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)
    // console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET)
    // console.log(res.data.items)
    setLoading(false)
    setUsers(res.data.items)
  }

  // Get single user
  const getUser = async (username) => {
    setLoading(true)

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_user=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    setLoading(false)
    setUser(res.data)
  }

  // Get repos from user
  const getUserRepos = async (username) => {
    setLoading(true)
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_user=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    setLoading(false)
    setRepos(res.data)
  }

  // Clear users
  const clearUsers = () => {
    setLoading(false)
    setUsers([])
  }

  // Fire alert if input is empty
  const showAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => {
      setAlert(null)
    }, 5000)
  }

  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <>
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </>
                )}
              />
              <Route exact path='/about' component={About}></Route>
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              ></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  )
}

export default App
