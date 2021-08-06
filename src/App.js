import './App.css'
import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import axios from 'axios'
import Search from './components/users/Search'

class App extends Component {
  state = {
    users: [],
    loading: false,
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

  render() {
    const { users, loading } = this.state

    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
          />
          <Users loading={loading} users={this.state.users} />
        </div>
      </div>
    )
  }
}

export default App
