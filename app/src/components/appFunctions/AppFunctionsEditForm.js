import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';

import { appFunctionsActions } from '../../store';

const { endEditFunction, updateFunction } = appFunctionsActions;

export { AppFunctionsEditForm };

function AppFunctionsEditForm() {
  const dispatch = useDispatch();


  const { func_id } = useParams();

  const { appFunctions } = useSelector(x => x.appFunctions);

  let func;

  appFunctions.map(item => (item.id === func_id) ? func = item : null);

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
    dispatch(updateFunction({ id: func_id, name, content, description }));
    resetInputs();
    return dispatch(endEditFunction());
  }

  return (
    <div >
      <form onSubmit={handleSubmit(onSubmit)}>
        <header>
          <h4 className="card-header">Edit AppFunction Form</h4>
        </header>
        <section >
          <form_group>
            <label>Name</label>
            <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={name} onChange={(e) => setName(e.target.value)} />
            <div className="invalid-feedback">{errors.name?.message}</div>
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
          <button disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
            🚀 Save
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => dispatch(endEditFunction())}>❌ Cancel</button>
        </footer>
      </form>
    </div>
  )
}
