import './App.css';
import { resetRestartFlag, restartGame } from './store/gameSlice';
import { useDispatch } from 'react-redux';
import Chart from './components/Chart';
import { useSelector } from 'react-redux';
import { GameState } from './store/gameSlice';

function App() {
  const state = useSelector((state: { game: GameState }) => state.game);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>Мечи и Щиты</h1>

      <h2>Ходят: {state.activeRole === 'cross' ? 'Мечи' : 'Щиты'}</h2>

      <Chart />

      {state.winner.value ? (
        <h2>Победили: {state.activeRole === 'cross' ? 'Мечи' : 'Щиты'}</h2>
      ) : null}

      <button
        type="button"
        className="restart-btn"
        onClick={() => {
          dispatch(restartGame());
          // Сбрасываем флаг рестарта
          setTimeout(() => dispatch(resetRestartFlag()), 0);
        }}
      >
        Начать заново
      </button>
    </div>
  );
}

export default App;
