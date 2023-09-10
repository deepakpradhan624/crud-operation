 import {BrowserRouter, Route, Routes} from "react-router-dom"
import User from './Component/User';
import store from "./Redux/Store";
import { Provider } from "react-redux";
import {ToastContainer} from "react-toastify"

function App() {
  return (
    <div>
      <Provider store={store}>

     <BrowserRouter>
     <Routes>
      <Route path='/' element={<User/>}></Route>
     </Routes>
     </BrowserRouter>
     <ToastContainer position="top-right"></ToastContainer>
      </Provider>
    
    </div>
  );
}

export default App;
