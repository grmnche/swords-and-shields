import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { combinations } from 'mathjs';

interface Field {
  number: number;
  role: string;
}

export interface GameState {
  activeRole: 'cross' | 'zero';
  winner: {
    value: boolean;
    combination: number[];
  };
  gameRestarted: boolean;
  crossFields: number[];
  zeroFields: number[];
  activeRoleFields: number[];
}

const initialState: GameState = {
  activeRole: 'cross',
  winner: {
    value: false,
    combination: [],
  },
  gameRestarted: false,
  crossFields: [],
  zeroFields: [],
  activeRoleFields: [],
};

const winningCombinations = [
  [1, 2, 3], // Горизонтальные линии
  [4, 5, 6],
  [7, 8, 9],

  [1, 4, 7], // Вертикальные линии
  [2, 5, 8],
  [3, 6, 9],

  [1, 5, 9], // Диагонали
  [3, 5, 7],
];

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeRole: (state) => {
      if (state.winner.value) return;

      if (state.activeRole === 'cross') {
        state.activeRole = 'zero';
      } else {
        state.activeRole = 'cross';
      }
    },
    fillField: (state, action: PayloadAction<Field>) => {
      if (state.activeRole === 'cross') {
        state.crossFields.push(action.payload.number);
      } else {
        state.zeroFields.push(action.payload.number);
      }
    },
    checkWinner: (state) => {
      if (state.activeRole === 'cross') {
        state.activeRoleFields = state.crossFields.sort((a, b) => a - b);
      } else {
        state.activeRoleFields = state.zeroFields.sort((a, b) => a - b);
      }

      // Проверяем, есть ли у текущей роли выигрышная комбинация
      state.winner.value = winningCombinations.some((combination) => {
        const isWinningCombination = combination.every((el) =>
          state.activeRoleFields.includes(el),
        );

        if (isWinningCombination) {
          state.winner.combination = combination;
          return isWinningCombination;
        }
      });
    },
    restartGame: (state) => {
      // Сбрасываем стейт, но с флагом gameRestarted === true
      return { ...initialState, gameRestarted: true };
    },
    // Редюсер для сброса флага gameRestarted
    resetRestartFlag: (state) => {
      state.gameRestarted = false;
    },
  },
});

export const {
  changeRole,
  fillField,
  checkWinner,
  restartGame,
  resetRestartFlag,
} = gameSlice.actions;

export default gameSlice.reducer;
