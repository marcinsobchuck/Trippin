import { BrowserRouter } from 'react-router-dom';

import { Routing } from './routing/Routing';
import GlobalStyle from './styles/GlobalStyle';

import 'react-dates/lib/css/_datepicker.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-dates/initialize';

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Routing />
  </BrowserRouter>
);

export default App;
