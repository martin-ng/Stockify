import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div>
    <div id="nav-container">
      <h1 style={{color: '#4ab1ff'}}>Stockify</h1>
      {isLoggedIn ? (
        <nav id="nav-menu">
          <NavLink
            className="link-buttons glow-buttons"
            activeClassName="active-link-buttons"
            to="/news"
          >
            News
          </NavLink>

          <NavLink
            className="link-buttons glow-buttons"
            activeClassName="active-link-buttons"
            to="/transactions"
          >
            Transactions
          </NavLink>

          <NavLink
            className="link-buttons glow-buttons"
            activeClassName="active-link-buttons"
            to="/portfolio"
          >
            Portfolio
          </NavLink>
          <NavLink
            className="link-buttons glow-buttons"
            to="/portfolio"
            onClick={handleClick}
          >
            Logout
          </NavLink>
        </nav>
      ) : (
        <nav id="nav-menu">
          <NavLink
            className="link-buttons glow-buttons"
            activeClassName="active-link-buttons"
            to="/stocknews"
          >
            News
          </NavLink>
          <NavLink
            className="link-buttons glow-buttons"
            activeClassName="active-link-buttons"
            to="/login"
          >
            Login
          </NavLink>
          <NavLink
            className="link-buttons glow-buttons"
            activeClassName="active-link-buttons"
            to="/signup"
          >
            Sign Up
          </NavLink>
        </nav>
      )}
      <hr />
    </div>
    <div id="nav-divider" />
    {isLoggedIn ? (
      <div>
        <h2 id="welcome-message">Welcome back, {user.firstName}</h2>
      </div>
    ) : (
      <br />
    )}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
