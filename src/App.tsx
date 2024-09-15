import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import './App.scss';

function App() {
  return (
    <main className='main-container'>
      <Sidebar />
      <div className='board-container'>
        <Header />
        <Outlet />
      </div>
    </main>
  );
}

export default App;
