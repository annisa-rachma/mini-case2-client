export function fetchPositions() {
  return async function (dispatch) {
    try {
      let url = import.meta.env.VITE_BASE_URL + "/positions";

      const res = await fetch(url, {
        headers: { access_token: localStorage.getItem("access_token") },
      });
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      dispatch({ type: "setPositions", payload: data });
    } catch (error) {
      throw error;
    }
  };
}

export function handleAddPosition(payload) {
  return async function (dispatch) {
    try {
      const res = await fetch(import.meta.env.VITE_BASE_URL + "/positions", {
        method: "post",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      dispatch(fetchPositions());
    } catch (error) {
      throw error;
    }
  };
}