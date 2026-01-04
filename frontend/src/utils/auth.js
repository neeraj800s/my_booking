export const saveToken = (token, name) => {
  localStorage.setItem("token", token);
  localStorage.setItem("name", name);
};

export const getToken = () => localStorage.getItem("token");

export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
};

export const getUserName = () => localStorage.getItem("name") || "";
