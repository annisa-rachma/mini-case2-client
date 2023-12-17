export function handleLogin(payload) {
  return async function (dispatch) {
    try {
      const res = await fetch(import.meta.env.VITE_BASE_URL + "/login", {
        method: "post",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      // console.log(data)
      return localStorage.setItem("access_token", data.access_token);
    } catch (error) {
      throw error;
    }
  };
}

export function handleRegister(payload) {
  return async function (dispatch) {
    try {
      const res = await fetch(import.meta.env.VITE_BASE_URL + "/register", {
        method: "post",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      return data;
    } catch (error) {
      throw error;
    }
  };
}