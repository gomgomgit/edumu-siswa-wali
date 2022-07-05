const CurrentUser = "current_user" as string;

/**
 * @description get token form localStorage
 */
export const getUser = (): object | null => {
  var user = {
    user_id: window.localStorage.removeItem('user_id'),
    user_level: window.localStorage.removeItem('user_level'),
    user_nama: window.localStorage.removeItem('user_nama'),
    user_username: window.localStorage.removeItem('user_username'),
  };
  return user;
};

/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveUser = (user): void => {
  window.localStorage.setItem('user_id', user.user_id);
  window.localStorage.setItem('user_level', user.user_level);
  window.localStorage.setItem('user_nama', user.user_nama);
  window.localStorage.setItem('user_username', user.user_username);
};

/**
 * @description remove token form localStorage
 */
export const destroyUser = (): void => {
  window.localStorage.removeItem('user_id');
  window.localStorage.removeItem('user_level');
  window.localStorage.removeItem('user_nama');
  window.localStorage.removeItem('user_username');
};

export default { getUser, saveUser, destroyUser };
