import './App.css'
import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import axios from 'axios'

class App extends Component {
  state = {
    users: [],
    loading: false,
  }

  async componentDidMount() {
    // start with true, and then ask if it has finished, if it is, stop spinner
    this.setState({ loading: true })
    const res = await axios.get(
      `https://api.github.com/users?client_id={process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret={REACT_APP_GITHUB_CLIENT_SECRET}`
    )

    this.setState({ users: res.data, loading: false })
  }

  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    )
  }
}

export default App
