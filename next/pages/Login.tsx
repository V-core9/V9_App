import { isDev } from '../helpers';
import { DemoAdminAccountAlert, FormLogin } from '../components';


export default function Login(props = {}): JSX.Element {
  return (
    <div className="public-login-page">
      <FormLogin />
      {isDev && <DemoAdminAccountAlert email='slavko.vuletic92@gmail.com' password='0123456789' />}
    </div>
  )
}
