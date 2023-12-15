// import showToast from "../../utlis/showToast"

export default class UserAction {
    static async login(formObj) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + "/login", {
                method: "post",
                body: JSON.stringify(formObj),
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            if (!res.ok) {
                throw data
            }
            // console.log(data, '<<< dari action')
            // sets access_token to locale storage
            localStorage.setItem("access_token", data)
            // showToast("success", `Welcome ${data.user.username}!`)
            // sets user store state to be populated with user information
            return (dispatch) => {
                dispatch({ type: "login", payload: data.user })
            }
        } catch (err) {
            throw { message: err.message }
        }
    }

    static logout() {
        localStorage.removeItem("access_token")
        showToast("success", `Logout successful!`)
        return { type: "logout" }
    }
}

export function fetchUser() {
  return async function(dispatch) {
    try {
      const res = await fetch(import.meta.env.VITE_BASE_URL + `/account`, {
        headers: { access_token: localStorage.getItem("access_token") },
      });
      const user = await res.json();
      // console.log(user, '<<<<<<user')
      dispatch({ type: "setUser", payload: user });
    } catch (err) {
      console.log(err);
    }
  }
}
