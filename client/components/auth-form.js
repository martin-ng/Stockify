import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  console.log('props: ', props)

  return (
    <div id="auth-container">
      <h1>Welcome to Three Epsilon</h1>
      {name === 'signup' ? (
        <form id="auth-form" onSubmit={handleSubmit} name={name}>
          <div id="auth-type">{displayName}</div>

          {/* <div className="auth-input-container"> */}
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input className="auth-input" name="firstName" type="text" />
          {/* </div> */}

          {/* <div className="auth-input-container"> */}
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input className="auth-input" name="lastName" type="text" />
          {/* </div> */}

          {/* <div className="auth-input-container"> */}
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input className="auth-input" name="email" type="email" />
          {/* </div> */}

          {/* <div className="auth-input-container"> */}
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input
            className="auth-input"
            placeholder="At least 8 characters"
            name="password"
            type="password"
          />
          {/* </div> */}

          {/* <div className="auth-input-container"> */}
          <label htmlFor="password">
            <small>Re-enter password</small>
          </label>
          <input className="auth-input" name="password" type="password" />
          {/* </div> */}

          <button id="auth-button-container" type="submit">
            Create your account
          </button>

          <p id="link-p">
            Already have an account?
            <Link className="link-question" to="/login">
              Login
            </Link>
          </p>

          {error && error.response && <div> {error.response.data} </div>}
        </form>
      ) : (
        <div id="auth-container">
          <form id="auth-form" onSubmit={handleSubmit} name={name}>
            <div id="auth-type">{displayName}</div>

            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input className="auth-input" name="email" type="email" />

            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input className="auth-input" name="password" type="password" />

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
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
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

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
