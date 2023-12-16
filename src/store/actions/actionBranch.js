export function fetchBranches() {
  return async function (dispatch) {
    try {
      let url = import.meta.env.VITE_BASE_URL + "/branches";

      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      dispatch({ type: "setBranches", payload: data });
    } catch (error) {
      throw error;
    }
  };
}
