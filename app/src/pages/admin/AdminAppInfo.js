import React from 'react';

import { useSelector, useDispatch } from 'react-redux';


export { AdminAppInfo };


const EnvContainer = (
  <div className='env' >
    <header>
      <h3>Environment</h3>
    </header>
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
  </div >
)


function AdminAppInfo() {

  const user = useSelector(x => x.auth.user);



  return (
    <section>
      <header>
        <h2>Application Information</h2>
      </header>
      <section>

        <div className='authContainer' >
          <header>
            <h3>Authentication</h3>
          </header>
          <div>
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
          </div>
        </div >

        {EnvContainer}

      </section>
    </section>
  )
}
