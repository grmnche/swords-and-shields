import { useSelector } from 'react-redux';
import Field from './Field';
import { GameState } from '../store/gameSlice';

function Chart() {
  const fields = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const state = useSelector((state: { game: GameState }) => state.game);

  return (
    <div className="chart">
      {fields.map((item, idx) => (
        <Field number={idx + 1} key={`${idx}-${state.gameRestarted}`} />
      ))}
    </div>
  );
}

export default Chart;
