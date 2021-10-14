import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { BrowserRouter } from "react-router-dom";
import { Routing } from "./Routing/Routing";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routing />
    </BrowserRouter>
  );
}

export default App;
