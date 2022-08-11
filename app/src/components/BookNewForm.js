
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { NavItem } from './Nav/NavItem'
import { myBooksActions } from '../store';


const { toggleNewModal, newBook } = myBooksActions;

export { BookNewForm };

function BookNewForm() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [content, setContent] = useState({});
  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Email is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ title, description }) {
    dispatch(newBook({ title, description, content }));
    title = '';
    description = '';
    setContent('');
    navigate("/my-books");
  }

  return (
    <form className='new-book-form' onSubmit={handleSubmit(onSubmit)}>
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
        <form_group style={{ flex: 1 }}>
          <label>Content</label>
          <ReactQuill theme="snow" value={content} onChange={setContent} />
          <textarea value={content} />
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
