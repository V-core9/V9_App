import { Counter } from '../../components';

import logo from '../../logo.svg';

export { ReduxCounter };

function ReduxCounter() {
  return (
    <div className="content">
      <img src={logo} className="App-logo" alt="logo" />
      <Counter />
    </div>
  );
}
