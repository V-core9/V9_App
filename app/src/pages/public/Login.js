
import { DemoAdminAccountAlert, FormLogin } from '../../components';

export { Login };

function Login() {
  return (
    <div className="content">
      <FormLogin />
      <DemoAdminAccountAlert email='slavko.vuletic92@gmail.com' password='0123456789' />
    </div>
  )
}
