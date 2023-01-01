import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './component/Index';
import GlobalStyles from './styles/GlobalStyles';
import Create from './component/Create';
import Complete from './component/Complete';
import Modify from './component/Modify';

export type WrapperProps = {
  children?: React.ReactNode;
  props?: React.ReactNode;
  type?: "submit";
  onClick?: () => void;
  placeholder?: string;
  value?: string;
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GlobalStyles />
        <Routes>
          <Route path='/' element={<Index />}></Route>
          <Route path='/create' element={<Create />}></Route>
          <Route path='/complete/:DiaryId' element={<Complete />}></Route>
          <Route path='/modify/:DiaryId' element={<Modify />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
