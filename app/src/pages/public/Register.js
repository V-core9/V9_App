import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '../../helpers';
import { authActions } from '../../store';

export { Register };

function Register() {
  const dispatch = useDispatch();
  const authUser = useSelector(x => x.auth.user);
  const authError = useSelector(x => x.auth.error);

  useEffect(() => {
    // redirect to home if already logged in
    if (authUser) history.navigate('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ username, email, password }) {
    return dispatch(authActions.register({ username, email, password }));
  }

  return (
    <form className='public-register' onSubmit={handleSubmit(onSubmit)}>
      <header>Register</header>
      <form_group>
        <label>Username</label>
        <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
        <div className="invalid-feedback">{errors.username?.message}</div>
      </form_group>
      <form_group>
        <label>Email</label>
        <input name="email" type="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
        <div className="invalid-feedback">{errors.email?.message}</div>
      </form_group>
      <form_group>
        <label>Password</label>
        <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
        <div className="invalid-feedback">{errors.password?.message}</div>
      </form_group>
      <button disabled={isSubmitting} className="success">
        {isSubmitting && <span>LOADING...</span>}
        Register
      </button>
      {authError &&
        <div className="error">{authError.message}</div>
      }
    </form>
  )
}
