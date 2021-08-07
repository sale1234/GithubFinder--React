import './App.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import About from './components/pages/About'

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  }

  // Search github users
  searchUsers = async (text) => {
    // start with true, and then ask if it has finished, if it is, stop spinner

    this.setState({ loading: true })
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_user=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)
    // console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET)
    // console.log(res.data.items)
    this.setState({ users: res.data.items, loading: false })
  }

  // Get single user
  getUser = async (username) => {
    this.setState({ loading: true })
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_user=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    this.setState({ user: res.data, loading: false })
  }

  // Get repos from user
  getUserRepos = async (username) => {
    this.setState({ loading: true })
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_user=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    this.setState({ repos: res.data, loading: false })
  }

  // Clear users
  clearUsers = () => this.setState({ users: [], loading: false })

  // Fire alert if input is empty
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } })
    setTimeout(() => {
      this.setState({ alert: null })
    }, 3000)
  }

  render() {
    const { users, user, loading, repos } = this.state

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={this.state.users} />
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
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
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
    )
  }
}

export default App
