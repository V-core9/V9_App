import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Accordion, FormGroup } from '../../components';


export { AdminAppInfo };




function AdminAppInfo() {

  const user = useSelector(x => x.auth.user);

  console.log(React);

  let reactSIDNUOYWBF = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

  console.log(reactSIDNUOYWBF);

  Object.keys(reactSIDNUOYWBF).map(item => {
    if (typeof reactSIDNUOYWBF[item] === 'object') {
      Object.keys(reactSIDNUOYWBF[item]).map(yes => {
        console.log(`${item}.${yes}`, reactSIDNUOYWBF[item][yes]);
      })
    } else {
      console.log(item, reactSIDNUOYWBF[item]);
    }
  })

  return (
    <section>
      <header>
        <h2>Application Information</h2>
      </header>
      <section>

        <Accordion title='🔑 Authentication Info' content={
          <>
            <form_group>
              <label>User ID</label>
              <p>{JSON.stringify(user.userId)}</p>
            </form_group>

            <form_group>
              <label>isAdmin</label>
              <p>{JSON.stringify(user.isAdmin)}</p>
            </form_group>

            <form_group>
              <label>username</label>
              <p>{JSON.stringify(user.username)}</p>
            </form_group>

            <form_group>
              <label>jti</label>
              <p>{JSON.stringify(user.jti)}</p>
            </form_group>

            <form_group>
              <label>iat</label>
              <p>{JSON.stringify(user.iat)}</p>
            </form_group>

            <form_group>
              <label>exp</label>
              <p>{JSON.stringify(user.exp)}</p>
            </form_group>

            <form_group>
              <label>accessToken</label>
              <p>{JSON.stringify(user.accessToken)}</p>
            </form_group>

            <form_group>
              <label>refreshToken</label>
              <p>{JSON.stringify(user.refreshToken)}</p>
            </form_group>
          </>
        } />

        <Accordion title='🌌 Environment Variables' content={
          <>
            <div>
              {
                Object.keys(process.env).map((key) => {
                  return (
                    <form_group>
                      <label>{key}</label>
                      <p>{process.env[key]}</p>
                    </form_group>
                  )
                })
              }
            </div>
            <div className="warning">
              <icon>⚠</icon> <p>These only get loaded when server is in dev mode or when building. Restart your host or rebuild the application to get updated values.</p>
            </div>
          </>
        } />

        <Accordion
          title="React App Info"
          content={
            <>
              <h2>ReactDOM Object Keys</h2>
              {
                Object.keys(React).map((i) => {
                  return (
                    <FormGroup
                      label={i + ' ' + typeof React[i]}
                      elements={
                        <>
                          {typeof React[i] === 'function' && <p>{React[i].toString()}</p>}
                          {typeof React[i] === 'object' && <p>{Object.keys(React[i])}</p>}
                          {typeof React[i] !== 'function' && typeof React[i] !== 'object' && <p>{React[i]}</p>}
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
    </section>
  )
}
