import React, { Fragment, useState } from 'react';
import { Link, Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth'

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData
    
    const changeHandler = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const submitHandler = async (event) => {
        event.preventDefault();
       login(email, password);
    }

    //redirect if logged in 
    if(isAuthenticated){
      return <Navigate to="/dashboard" />
    }

    return (
     <Fragment>
      <section className="container"> 
      <h1 className="large text-primary">Sign In</h1>
       <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
       <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange ={(e) => changeHandler(e)} required />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} onChange ={(e) => changeHandler(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account <Link to="/register">Sign Up</Link>
      </p>
      </section>
    </Fragment>
    );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

export default connect(mapStateToProps, { login })(Login);