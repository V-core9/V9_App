import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { appFunctionsActions } from '../../store';

const { toggleNewForm, createNew, endEditFunction, updateFunction } = appFunctionsActions;

export { AppFunctionsForm };

function AppFunctionsForm() {
    const dispatch = useDispatch();

    const { appFunctions, newFormShow, editing } = useSelector(x => x.appFunctions);

    const isEditing = (editing !== null);

    let func;

    appFunctions.map(item => (item.id === editing) ? func = item : null);


    const [name, setName] = useState(func?.name || '');
    const [description, setDescription] = useState(func?.description || '');
    const [content, setContent] = useState(func?.content || '');

    const resetInputs = () => {
        setName('');
        setDescription('');
        setContent('');
    }

    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Function Name is required'),
        content: Yup.string().required('Function Content is required')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ }) {
        if (isEditing) {
            dispatch(updateFunction({ id: editing, name, content, description }));
            resetInputs();
            return dispatch(endEditFunction());
        } else {
            dispatch(createNew({ name, content, description }));
            resetInputs();
            return dispatch(toggleNewForm());
        }
    }

    return (
        <div className="card">
            <form onSubmit={handleSubmit(onSubmit)}>
                {!isEditing && <h4 className="card-header">New AppFunction Form</h4>}
                {isEditing && <h4 className="card-header">Edit AppFunction Form</h4>}
                <div className="card-body">
                    <div className="form-group">
                        <label>Name</label>
                        {!isEditing && <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />}
                        {isEditing && <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={name} onChange={(e) => setName(e.target.value)} />}
                        <div className="invalid-feedback">{errors.name?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        {!isEditing && <input name="description" type="text" {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />}
                        {isEditing && <input name="description" type="text" {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} value={description} onChange={(e) => setDescription(e.target.value)} />}
                        <div className="invalid-feedback">{errors.description?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        {!isEditing && <textarea name="content" type="text" {...register('content')} className={`form-control ${errors.content ? 'is-invalid' : ''}`} />}
                        {isEditing && <textarea name="content" type="text" {...register('content')} className={`form-control ${errors.content ? 'is-invalid' : ''}`} value={content} onChange={(e) => setContent(e.target.value)} />}

                        <div className="invalid-feedback">{errors.content?.message}</div>
                    </div>
                </div>
                <div className="card-footer">
                    <button disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        {!isEditing && '🚀 Create'}
                        {isEditing && '🚀 Save'}
                    </button>
                    {!isEditing && <button type="button" className="btn btn-secondary" onClick={() => dispatch(toggleNewForm())}>❌ Close</button>}
                    {isEditing && <button type="button" className="btn btn-secondary" onClick={() => dispatch(endEditFunction())}>❌ Close</button>}
                </div>
            </form>
        </div>
    )
}