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
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ email, password }) {
    return dispatch(authActions.login({ email, password }));
  }
  return (

    <div className="card">
      <h4 className="card-header">Login</h4>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <form_group>
            <label>Email</label>
            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </form_group>
          <form_group>
            <label>Password</label>
            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </form_group>
          <button disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
            Login
          </button>
          {authError && <div className="alert alert-danger mt-3 mb-0">{authError.message}</div>}
        </form>
      </div>
    </div>
  )
}
