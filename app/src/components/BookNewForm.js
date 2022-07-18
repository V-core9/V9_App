
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { myBooksActions } from '../store';

const { toggleNewModal, newBook } = myBooksActions;

export { BookNewForm };

function BookNewForm() {
    const dispatch = useDispatch();

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
        return dispatch(toggleNewModal());
    }

    return (
        <div className="card">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h4 className="card-header">New Book Form</h4>
                <div className="card-body">
                    <div className="form-group">
                        <label>Title</label>
                        <input name="title" type="text" {...register('title')} className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.title?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input name="description" type="text" {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.description?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <textarea name="content" type="text" {...register('content')} className={`form-control ${errors.content ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.content?.message}</div>
                    </div>
                </div>
                <div className="card-footer">
                    <button disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Create
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => dispatch(toggleNewModal())}>Close</button>
                </div>
            </form>
        </div>
    )
}