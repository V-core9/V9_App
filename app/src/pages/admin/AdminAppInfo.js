import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Accordion } from '../../components';


export { AdminAppInfo };




function AdminAppInfo() {

  const user = useSelector(x => x.auth.user);



  return (
    <section>
      <header>
        <h2>Application Information</h2>
      </header>
      <section>

        <Accordion title='Authentication' content={
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

        <Accordion title='Authentication' content={
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

      </section>
    </section>
  )
}
