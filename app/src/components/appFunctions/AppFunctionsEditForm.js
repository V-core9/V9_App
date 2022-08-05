import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';
import Editor from "@monaco-editor/react";
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

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting } = formState;

  function onSubmit() {
    dispatch(updateFunction({ id: func_id, name, content, description }));
    resetInputs();
    return dispatch(endEditFunction());
  }

  return (
    <div >
      <form onSubmit={handleSubmit(onSubmit)}>
        <header>
          <h2>Edit AppFunction Form</h2>
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

          <header>
            <h4>Script Code</h4>
          </header>
          <Editor
            height="90vh"
            defaultLanguage="javascript"
            theme="vs-dark"
            defaultValue={content}
            onChange={setContent}
          />
          <div className="invalid-feedback">{errors.content?.message}</div>

        </section>
        <footer>
          <button disabled={isSubmitting} className="success">
            {isSubmitting && <span className>SAVING...</span>}
            🚀 Save
          </button>
          <button type="button" className="error" onClick={() => dispatch(endEditFunction())}>❌ Cancel</button>
        </footer>
      </form>
    </div>
  )
}
