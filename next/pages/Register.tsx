
import type { AppDispatch } from '../store'

import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '../helpers';
import { authActions } from '../store';
import type { NewUser } from '..';

export default function Register(props = {}): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  //const authUser = useSelector(x => x.auth.user);
  //const authError = useSelector(x => x.auth.error);

  const { user: authUser, error: authError } = useSelector((x: any) => x.auth);

  useEffect(() => {
    // redirect to home if already logged in
    //if (authUser) history.navigate('/');
    if (typeof window !== 'undefined' && authUser) history.navigate.push('/');

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

  const onSubmit: any = ({ username, email, password }: NewUser) => {
    return dispatch(authActions.register({ username, email, password }));
  }

  return (
    <form className='public-register' onSubmit={handleSubmit(onSubmit)}>
      <header>Register</header>
      <div>
        <label>Username</label>
        <input type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
        <div className="invalid-feedback">{errors.username?.message as string}</div>
      </div>
      <div>
        <label>Email</label>
        <input type="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
        <div className="invalid-feedback">{errors.email?.message as string}</div>
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
        <div className="invalid-feedback">{errors.password?.message as string}</div>
      </div>
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
