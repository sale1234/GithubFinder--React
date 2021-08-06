import './App.css'
import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Users from './components/users/Users'
import axios from 'axios'
import Search from './components/users/Search'

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  }

  // async componentDidMount() {
  //   // start with true, and then ask if it has finished, if it is, stop spinner
  //   this.setState({ loading: true })
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   )

  //   this.setState({ users: res.data, loading: false })
  // }

  // Search github users
  searchUsers = async (text) => {
    this.setState({ loading: true })
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_user=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)
    // console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET)
    // console.log(res.data.items)
    this.setState({ users: res.data.items, loading: false })
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
    const { users, loading } = this.state

    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={this.state.users} />
        </div>
      </div>
    )
  }
}

export default App
