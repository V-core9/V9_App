
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { NavItem } from './Nav/NavItem'
import { myBooksActions } from '../store';


const { toggleNewModal, newBook } = myBooksActions;

export { BookNewForm };

function BookNewForm() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Email is required'),
    content: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ title, description, content }) {
    dispatch(newBook({ title, description, content }));
    title = '';
    description = '';
    content = '';
    navigate("/my-books");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <header>
        <h4>New Book Form</h4>
      </header>
      <section>
        <form_group>
          <label>Title</label>
          <input name="title" type="text" {...register('title')} className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.title?.message}</div>
        </form_group>
        <form_group>
          <label>Description</label>
          <input name="description" type="text" {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.description?.message}</div>
        </form_group>
        <form_group>
          <label>Content</label>
          <textarea name="content" type="text" {...register('content')} className={`form-control ${errors.content ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.content?.message}</div>
        </form_group>
      </section>
      <footer>
        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
          Create
        </button>
        <NavItem to="/my-books" text="Cancel" icon="❌" className="button warning" />
      </footer>
    </form>
  )
}
