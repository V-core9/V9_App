
import { DemoAdminAccountAlert, FormLogin } from '../../components';

export { Login };

function Login() {

    return (
        <div className="col-md-6 offset-md-3 mt-5 ">
            <FormLogin />
            <DemoAdminAccountAlert email='slavko.vuletic92@gmail.com' password='0123456789' />
        </div>
    )
}