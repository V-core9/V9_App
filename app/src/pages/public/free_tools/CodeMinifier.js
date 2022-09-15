import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { useForm } from "react-hook-form";

import { fetchWrapper } from '../../../helpers';
import { FormGroup, Accordion } from '../../../components';
export { CodeMinifier };

function CodeMinifier() {

  const [language, setLanguage] = useState('JS');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [execTime, setExecTime] = useState('');
  const [minifiedSize, setMinifiedSize] = useState('');
  const [originalSize, setOriginalSize] = useState('');
  const [outputError, setOutputError] = useState('');

  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting } = formState;

  async function onSubmit() {
    let response = await fetchWrapper.post('http://localhost/api/developers/code-minify', { language, code });
    setOutput(response.output);
    setEfficiency(response.efficiency);
    setExecTime(response.execTime);
    setMinifiedSize(response.minifiedSize);
    setOriginalSize(response.originalSize);
    setOutputError(response.error);
    console.log("output", output);
    console.log("efficiency", efficiency);
    console.log("execTime", execTime);
    console.log("originalSize", originalSize);
    console.log("minifiedSize", minifiedSize);
  }


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='codeMinifier'>
        <header>
          <h2>Online JavaScript Minifier Tool and Compressor, with Fast and Simple API Access</h2>
          <div className='flex-inline'>
            <button disabled={isSubmitting} className="success">
              {isSubmitting && <span className>MINIFING...</span>}
              🚀 Minify
            </button>
          </div>
        </header>

        <div className='flex-inline'>
          <Accordion
            title={'Code To Minify'}
            content={
              <>
                <FormGroup
                  id='language'
                  label={'Code Language'}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setLanguage(e.target.value);
                  }}
                  value={language}
                  resetClick={false}
                  elements={
                    <select onChange={(e) => setLanguage(e.target.value)}>
                      {language === 'JS' ? <option value='JS' selected>JavaScript</option> : <option value='JS'>JavaScript</option>}
                      {language === 'CSS' ? <option value='CSS' selected>CSS</option> : <option value='CSS'>CSS</option>}
                      {language === 'JSON' ? <option value='JSON' selected>JSON</option> : <option value='JSON'>JSON</option>}
                      {language === 'HTML' ? <option value='HTML' selected>HTML</option> : <option value='HTML'>HTML</option>}
                      {language === 'XML' ? <option value='XML' selected>XML</option> : <option value='XML'>XML</option>}
                    </select>
                  }
                />

                {language === 'JS' && <Editor defaultLanguage="javascript" language="javascript" theme="vs-dark" defaultValue={code} onChange={setCode} />}
                {language === 'JSON' && <Editor defaultLanguage="json" language="json" theme="vs-dark" defaultValue={code} onChange={setCode} />}
                {language === 'CSS' && <Editor defaultLanguage="css" language="css" theme="vs-dark" defaultValue={code} onChange={setCode} />}
                {language === 'HTML' && <Editor defaultLanguage="html" language="html" theme="vs-dark" defaultValue={code} onChange={setCode} />}
                {language === 'XML' && <Editor defaultLanguage="xml" language="xml" theme="vs-dark" defaultValue={code} onChange={setCode} />}
              </>
            }
            startOpen={true}
            className={''}
            disableToggleIcon={null}
            onlyToggleIcon={null}
          />

          <Accordion
            title={'Minified Result:'}
            content={
              <>
                <Editor
                  defaultLanguage="javascript"
                  language={language}
                  theme="vs-dark"
                  defaultValue={output}
                  value={output}

                />

                <div>
                  <h2>Minification Stats:</h2>
                  <p>Efficiency: {Math.trunc(efficiency * 100)}%</p>
                  <p>Execution Time: {execTime}ms</p>
                  <p>Original Size: {originalSize} characters</p>
                  <p>Minified Size: {minifiedSize} characters</p>
                  <p>Error: {outputError}</p>
                </div>
              </>
            }
            startOpen={true}
            className={''}
            disableToggleIcon={null}
            onlyToggleIcon={null}
          />

          <Accordion
            title={'Minified Result:'}
            content={
              <>
                <h2>JavaScript Minifier Tool Documentation</h2>
                <p>To minify/compress your JavaScript, perform a POST request to</p>
                <pre>API https://v-core9.com/api/developers/code-minify/</pre>
                <p>with the input parameter set to the JavaScript you want to minify.</p>
                <a role="button" href="/#">See the documentation</a>
              </>
            }
            startOpen={true}
            className={''}
            disableToggleIcon={null}
            onlyToggleIcon={null}
          />
        </div>
      </form>
    </div>
  );
}
