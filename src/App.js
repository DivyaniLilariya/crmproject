import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './components/Users';
import View from './components/View';
import Edit from './components/Edit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/view' element={<View />} />
          <Route path='edit/:id' element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
