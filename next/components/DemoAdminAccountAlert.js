
export function DemoAdminAccountAlert(props) {
  return (
    <div className="alert error">
      <header>
        <h3>Demo Admin Account:</h3>
      </header>
      <div className='content'>
        <p>Email: {props.email}</p>
        <p>Password: {props.password}</p>
      </div>
    </div>
  )
}
