
export function DemoAdminAccountAlert(props) {
    return (
        <div className="alert alert-info mt-5">
            <h3>Demo Admin Account:</h3>
            <p>Email: {props.email}<br />
                Password: {props.password}</p>
        </div>
    )
}