import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeRole,
  checkWinner,
  fillField,
  GameState,
} from '../store/gameSlice';

interface IField {
  number: number;
}

const Field = ({ number }: IField) => {
  const [localRole, setLocalRole] = useState('');
  const [hasWinner, setHasWinner] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state: { game: GameState }) => state.game);

  useEffect(() => {
    if (state.winner.value) {
      setHasWinner(true);
    }
  }, [state.winner.value]);

  useEffect(() => {
    if (state.gameRestarted) {
      setLocalRole('');
      setHasWinner(false);
    }
  }, [state.gameRestarted]);

  const handleClick = () => {
    // Заполняем поля (активная роль)
    setLocalRole(state.activeRole);
    // Отправляем значение поля в стор
    dispatch(fillField({ number: number, role: state.activeRole }));
    // Проверяем, победила ли активная роль
    dispatch(checkWinner());
    // Меняем роль
    dispatch(changeRole());
  };

  return (
    <button
      className={`field ${localRole ? `--active-${localRole}` : ''} ${
        state.winner.combination.some((item) => item === number)
          ? 'winning-cell'
          : ''
      }`}
      onClick={handleClick}
      disabled={localRole !== '' || hasWinner}
    ></button>
  );
};

export default Field;
