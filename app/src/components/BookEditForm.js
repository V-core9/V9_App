import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { myBooksActions } from '../store';

const { editBook, updateBook } = myBooksActions;

export { BookEditForm };

function BookEditForm() {
    const dispatch = useDispatch();

    const { editing, myBooks } = useSelector(x => x.myBooks);

    let book;

    myBooks.map(item => (item.id === editing) ? book = item : null);

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
        return dispatch(editBook({ id: null }));
    }

    return (
        <div className="card">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-header">
                    <h4>EDIT Book ID:</h4>
                    <small>ID: {book.id}</small>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label>Title</label>
                        <input name="title" type="text" {...register('title')} className={`form-control ${errors.title ? 'is-invalid' : ''}`} value={title} onChange={(e) => setTitle(e.target.value)} />
                        <div className="invalid-feedback">{errors.title?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input name="description" type="text" {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} value={description} onChange={(e) => setDescription(e.target.value)} />
                        <div className="invalid-feedback">{errors.description?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <textarea name="content" type="text" {...register('content')} className={`form-control ${errors.content ? 'is-invalid' : ''}`} value={content} onChange={(e) => setContent(e.target.value)} />
                        <div className="invalid-feedback">{errors.content?.message}</div>
                    </div>
                </div>
                <div className="card-footer">
                    <button disabled={isSubmitting} className="btn btn-primary">{isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}✅ Update</button>
                    <button type="button" className="btn btn-secondary" onClick={() => dispatch(editBook({ id: null }))}>✖ Close</button>
                </div>
            </form>
        </div>
    )
}