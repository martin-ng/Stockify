import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  const [count, setCount] = useState(0)
  const [data, setData] = useState({hits: {}})

  // console.log("props: ", props)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios('https://sandbox.iexapis.com/stable/stock/IBM/quote?token=Tsk_79e6ff26a6b14f3fb1eb9f92b2a8bb1f',)
  //     setData(result.data)
  //   }
  //   fetchData();
  // }, {})

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
