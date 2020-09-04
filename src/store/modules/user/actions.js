export function AddToUser(user) {
  return {
    type: '@user/ADD',
    user,
  };
}

export function updateUser(id, user) {
  return {
    type: '@user/UPDATE',
    user,
    id,
  };
}

export function removeUser(id) {
  return {
    type: '@user/REMOVE',
    id,
  };
}
