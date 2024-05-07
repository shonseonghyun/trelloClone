import ReactDOM from 'react-dom/client';
import Root from './Root';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <RecoilRoot>
    <Root />
  </RecoilRoot>
);

