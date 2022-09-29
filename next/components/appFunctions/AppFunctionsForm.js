import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';
import Editor from "@monaco-editor/react";
import { useNavigate } from 'react-router-dom';

import { fetchWrapper } from '../../helpers';
import { appFunctionsActions } from '../../store';

import { NavItem } from '../../components';

const { createNew } = appFunctionsActions;

export { AppFunctionsForm };

function AppFunctionsForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting } = formState;

  async function onSubmit() {
    let newFunc = await dispatch(createNew({ name, content, description }));

    console.log(newFunc);
    if (newFunc.id !== undefined) {
      navigate("/functions/" + newFunc.id);
    }
  }

  return (
    <div >
      <form onSubmit={handleSubmit(onSubmit)}>

        <header>
          <h2>New AppFunction Form</h2>
          <div className='flex-inline'>
            <button disabled={isSubmitting} className="success">
              {isSubmitting && <span className>SAVING...</span>}
              🚀 Save
            </button>
            <NavItem className="error button" to='/functions' icon="✖" text="Cancel" />
          </div>
        </header>

        <section >

          <form_group>
            <div>
              <label>Name</label>
              <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="invalid-feedback">{errors.name?.message}</div>
          </form_group>

          <form_group>
            <div>
              <label>Description</label>
              <input name="description" type="text" {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
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

      </form>
    </div>
  )
}
