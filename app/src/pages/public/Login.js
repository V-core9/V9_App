
import { DemoAdminAccountAlert, FormLogin } from '../../components';

export { Login };

function Login() {
  return (
    <div className="public-login-page">
      <FormLogin />
      <DemoAdminAccountAlert email='slavko.vuletic92@gmail.com' password='0123456789' />
    </div>
  )
}
