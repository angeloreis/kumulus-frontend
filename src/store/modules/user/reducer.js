import produce from 'immer';

export default function user(state = [], action) {
  switch (action.type) {
    case '@user/ADD':
      return produce(state, (draft) => {
        draft.push({
          ...action.user,
          loading: action.loading,
        });
      });
    case '@user/UPDATE':
      return produce(state, (draft) => {
        const userIndex = draft.findIndex((u) => u.id === action.id);

        if (userIndex >= 0) {
          draft.push({
            ...action.user,
            loading: action.loading,
          });
        }
      });
    case '@user/REMOVE':
      return produce(state, (draft) => {
        const userIndex = draft.findIndex((u) => u.id === action.id);

        if (userIndex >= 0) {
          draft.splice(userIndex, 1);
        }
      });
    default:
      return state;
  }
}
