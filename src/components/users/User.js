import React, { Fragment, Component } from 'react'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import Repos from '../repos/Repos'
import { Link } from 'react-router-dom'

export class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login)
    this.props.getUserRepos(this.props.match.params.login)
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
  }
  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hirable,
    } = this.props.user

    const { loading, repos } = this.props
    // Spinner for single user search
    if (loading) return <Spinner />

    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>
          Get back
        </Link>
        Hirable:{' '}
        {hirable ? (
          <i className='fas fa-check text-success' />
        ) : (
          <i className='fas fa-times-circle text-danger' />
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              className='round-img'
              alt=''
              style={{ width: '150px' }}
            />
            <h1>{name}</h1>
            <p>{location}</p>
          </div>

          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className='btn btn-dark my-1'>
              Visit GitHub Profile
            </a>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Repos: {public_repos}</div>
          <div className='badge badge-secondary'>Gists: {public_gists}</div>
          <div className='badge badge-success'>Followers: {followers}</div>
          <div className='badge badge-dark'>Following: {following}</div>
        </div>
        <Repos repos={repos} />
      </Fragment>
    )
  }
}

export default User
