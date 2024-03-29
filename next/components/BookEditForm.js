import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { myBooksActions } from '../store';

import { NavItem } from '../components';
const { editBook, updateBook } = myBooksActions;

export { BookEditForm };

function BookEditForm() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { book_id } = useParams();

  const { myBooks } = useSelector(x => x.myBooks);

  let book;

  myBooks.map(item => (item.id === book_id) ? book = item : null);

  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [content, setContent] = useState(book.content);


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
    dispatch(updateBook({ id: book.id, title, description, content }));
    title = '';
    description = '';
    content = '';
    navigate("/my-books");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <header>
        <h4>EDIT Book ID:</h4>
        <small>ID: {book.id}</small>
      </header>
      <section>
        <form_group>
          <label>Title</label>
          <input name="title" type="text" {...register('title')} className={`form-control ${errors.title ? 'is-invalid' : ''}`} value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="invalid-feedback">{errors.title?.message}</div>
        </form_group>
        <form_group>
          <label>Description</label>
          <input name="description" type="text" {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="invalid-feedback">{errors.description?.message}</div>
        </form_group>
        <form_group>
          <label>Content</label>
          <textarea name="content" type="text" {...register('content')} className={`form-control ${errors.content ? 'is-invalid' : ''}`} value={content} onChange={(e) => setContent(e.target.value)} />
          <div className="invalid-feedback">{errors.content?.message}</div>
        </form_group>
      </section>
      <footer>
        <button disabled={isSubmitting} className="success">{isSubmitting && <span className='info'>🚀 LOADING...</span>}✅ Update</button>
        <NavItem className="warning button" to='/my-books' icon="✖" text="Cancel" />
      </footer>
    </form>
  )
}
