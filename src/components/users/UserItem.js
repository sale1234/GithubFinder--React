import PropTypes from 'prop-types'

const UserItem = ({ user: { avatar_url, login, html_url } }) => {
  // Destructuring, pulling data from values I sent

  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        alt=''
        className='round-img'
        style={{ width: '60px' }}
      />
      <h3>{login}</h3>
      <div>
        <a href={html_url} className='btn btn-dark btn-sm my-1'>
          More
        </a>
      </div>
    </div>
  )
}

UserItem.Prototype = {
  user: PropTypes.object.isRequired,
}

export default UserItem
