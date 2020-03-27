import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {auth, signup, login} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {
    name,
    displayName,
    handleSubmitSignUp,
    handleSubmitLogin,
    error
  } = props

  return (
    <div id="auth-container">
      <h1>Welcome to Stockify</h1>
      {name === 'signup' ? (
        <form id="auth-form" onSubmit={handleSubmitSignUp} name={name}>
          <div id="auth-type">{displayName}</div>

          <small>First Name</small>
          <input className="auth-input" name="firstName" type="text" />

          <small>Last Name</small>
          <input className="auth-input" name="lastName" type="text" />

          <small>Email</small>
          <input className="auth-input" name="signUpEmail" type="email" />

          <small>Password</small>
          <input className="auth-input" name="firstPassword" type="password" />

          <button id="auth-button-container" type="submit">
            Create your account
          </button>

          <h4 id="link-p">
            Already have an account?
            <Link className="link-question" to="/login">
              Login
            </Link>
          </h4>

          {error && error.response && <div> {error.response.data} </div>}
        </form>
      ) : (
        <div id="auth-container">
          <form id="auth-form" onSubmit={handleSubmitLogin} name={name}>
            <div id="auth-type">{displayName}</div>

            <small>Email</small>
            <input className="auth-input" name="loginEmail" type="email" />

            <small>Password</small>
            <input
              className="auth-input"
              name="loginPassword"
              type="password"
            />

            <button id="auth-button-container" type="submit">
              Continue
            </button>

            <h4 id="link-p">
              Don't have an account?
              <Link className="link-question" to="/signup">
                Signup
              </Link>
            </h4>
          </form>
        </div>
      )}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' and mapDispatch functions -
 *   one for Login, and one for Signup.
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatchSignup = dispatch => {
  return {
    handleSubmitSignUp(evt) {
      evt.preventDefault()
      const email = evt.target.signUpEmail.value
      const firstPassword = evt.target.firstPassword.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      dispatch(signup(email, firstName, lastName, firstPassword))
    }
  }
}

const mapDispatchLogin = dispatch => {
  return {
    handleSubmitLogin(evt) {
      evt.preventDefault()
      const loginEmail = evt.target.loginEmail.value
      const loginPassword = evt.target.loginPassword.value

      dispatch(login(loginEmail, loginPassword))
    }
  }
}

export const Login = connect(mapLogin, mapDispatchLogin)(AuthForm)
export const Signup = connect(mapSignup, mapDispatchSignup)(AuthForm)
