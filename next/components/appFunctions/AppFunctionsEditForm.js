import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';
import Editor from "@monaco-editor/react";

import { fetchWrapper } from '../../helpers';
import { appFunctionsActions } from '../../store';

import { NavItem, Accordion } from '../../components';

const { updateFunction } = appFunctionsActions;

export { AppFunctionsEditForm };

function AppFunctionsEditForm() {
  const dispatch = useDispatch();

  const { func_id } = useParams();

  const [defFunc, setDefFunc] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchWrapper.get(`http://localhost/api/functions/${func_id}`).then(val => {
      setName(val?.name);
      setDescription(val?.description);
      setContent(val?.content);
      setDefFunc(val);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting } = formState;

  async function onSubmit() {
    let resp = await dispatch(updateFunction({ id: func_id, name, content, description }));

    setName(resp?.name);
    setDescription(resp?.description);
    setContent(resp?.content);
    setDefFunc(resp);
  }

  const isChanged = () => {
    return (defFunc.name !== name || defFunc.content !== content || defFunc.description !== description);
  }

  return (
    <div >
      <form onSubmit={handleSubmit(onSubmit)}>

        <header>
          <h2>Edit AppFunction Form</h2>
          <div className='flex-inline'>
            <button disabled={isSubmitting || !isChanged()} className="success">
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

          <Accordion
            title="👨‍💻 Script Code"
            content={
              <>
                <Editor
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  defaultValue={content}
                  onChange={setContent}
                />
                <div className="invalid-feedback">{errors.content?.message}</div>
              </>
            }
          />

          <Accordion
            title="✅ Tests Listing:"
            content={
              <>
                {
                  defFunc?.FunctionTest?.map(item => {
                    console.log(item);
                    return (
                      <Accordion
                        title={item.description}
                        content={
                          <>
                            Function Test Editor Spaceholder!
                          </>
                        }
                      />
                    )
                  })
                }
              </>
            }
          />

        </section>

      </form>
    </div>
  )
}
