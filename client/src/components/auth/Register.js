import React, { Fragment, useState } from 'react';
import { Link, Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formData
    
    const changeHandler = (event) => {
        console.log(event.target.name, event.target.value)
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if(password !== password2){
            setAlert('Password doesnot match', 'danger', 3000);
        } else{
            register({ name, email, password });
        }
    }

    if(isAuthenticated) {
      return <Navigate to="/dashboard" />
    }

    return (
     <Fragment>
      <section className="container"> 
      <h1 className="large text-primary">Sign Up</h1>
       <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
       <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange ={(e) => changeHandler(e)} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange ={(e) => changeHandler(e)}  />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} onChange ={(e) => changeHandler(e)}
         
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2} onChange ={(e) => changeHandler(e)}
            
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
      </section>
    </Fragment>
    );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

Register.propTypes = {
 setAlert: PropTypes.func.isRequired,
 register: PropTypes.func.isRequired,
 isAuthenticated: PropTypes.bool
}

export default connect(mapStateToProps, { setAlert, register })(Register);