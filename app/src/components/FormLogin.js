import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { isEmptySync } from 'v_is_empty_value';

import { history } from '../helpers';
import { authActions } from '../store';

export function FormLogin() {
  const dispatch = useDispatch();
  const authUser = useSelector(x => x.auth.user);
  const authError = useSelector(x => x.auth.error);

  useEffect(() => {
    // redirect to home if already logged in
    if (authUser) history.navigate('/');
    console.log('test', isEmptySync(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // form validation rules
  const loginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formOptions = { resolver: yupResolver(loginSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ email, password }) {
    return dispatch(authActions.login({ email, password }));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <header>Login</header>

      <form_group>
        <label for='login_email'>📧</label>
        <input id='login_email' name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Email" />
      </form_group>
      <div className="invalid-feedback">{errors.email?.message}</div>

      <form_group>
        <label for='login_password'>🔑</label>
        <input id='login_password' name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Password" />
      </form_group>
      <div className="invalid-feedback">{errors.password?.message}</div>

      <button disabled={isSubmitting} className="success">
        {isSubmitting && <span>LOADING...</span>}
        Login 📤
      </button>

      {authError && <div className="error">{authError.message}</div>}
    </form>
  )
}
