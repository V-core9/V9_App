import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { appFunctionsActions } from '../../store';

const { endEditFunction, updateFunction } = appFunctionsActions;

export { AppFunctionsEditForm };

function AppFunctionsEditForm() {
    const dispatch = useDispatch();

    const { appFunctions, newFormShow, editing } = useSelector(x => x.appFunctions);

    let func;

    appFunctions.map(item => (item.id === editing) ? func = item : null);

    const [isEditing, setIsEditing] = useState(editing != null);

    const [name, setName] = useState(func?.name);
    const [description, setDescription] = useState(func?.description);
    const [content, setContent] = useState(func?.content);

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
        dispatch(updateFunction({ id: editing, name, content, description }));
        resetInputs();
        return dispatch(endEditFunction());
    }

    return (
        <div className="card">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h4 className="card-header">Edit AppFunction Form</h4>
                <div className="card-body">
                    <div className="form-group">
                        <label>Name</label>
                        <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={name} onChange={(e) => setName(e.target.value)} />
                        <div className="invalid-feedback">{errors.name?.message}</div>
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
                    <button disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        🚀 Save
                    </button>
                    {isEditing && <button type="button" className="btn btn-secondary" onClick={() => dispatch(endEditFunction())}>❌ Cancel</button>}
                </div>
            </form>
        </div>
    )
}