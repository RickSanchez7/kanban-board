import './App.scss';
import { Board } from './components/Board';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <main className='main-container'>
      <Sidebar />
      <div className='board-container'>
        <Header />
        <Board />
      </div>
    </main>
  );
}

export default App;
