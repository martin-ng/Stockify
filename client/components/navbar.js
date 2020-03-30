import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Login, Signup} from './index'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="nav-container">
    <h1>Stockify</h1>
    {/* <div id="nav-divider" /> */}
    {isLoggedIn ? (
      <nav id="nav-menu">
        {/* The navbar will show these links after you log in */}
        <Link to="/transactions">Transactions</Link>
        <Link to="/portfolio">Portfolio</Link>
        <a href="#" onClick={handleClick}>
          Logout
          {/* <Route path="/login" component={Login} /> */}
          {/* <Route path="/signup" component={Signup} /> */}
        </a>
      </nav>
    ) : (
      <nav id="nav-menu">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    )}

    <hr />
  </div>
  // <div id="nav-container">
  //   <h1>Stockify</h1>
  //   {/* <div id="nav-divider" /> */}
  //   <nav id="nav-menu">
  //     {isLoggedIn ? (
  //       <div>
  //         {/* The navbar will show these links after you log in */}
  //         <Link to="/transactions">Transactions</Link>
  //         <Link to="/portfolio">Portfolio</Link>
  //         <a href="#" onClick={handleClick}>
  //           Logout
  //         </a>
  //       </div>
  //     ) : null}
  //   </nav>
  //   <hr />
  // </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
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
