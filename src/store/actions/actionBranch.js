export function fetchBranches() {
  return async function (dispatch) {
    try {
      let url = import.meta.env.VITE_BASE_URL + "/branches";

      const res = await fetch(url, {
        headers: { access_token: localStorage.getItem("access_token") },
      });
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

export function fetchBranchDetail(id) {
  return async function (dispatch) {
    try {
      const res = await fetch(
        import.meta.env.VITE_BASE_URL + `/branches/${id}`,
        {
          headers: { access_token: localStorage.getItem("access_token") },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      dispatch({ type: "setBranchDetail", payload: data });
    } catch (error) {
      throw error;
    }
  };
}

export function handleAddBranch(payload) {
  return async function (dispatch) {
    try {
      const res = await fetch(import.meta.env.VITE_BASE_URL + "/branches", {
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
      dispatch(fetchBranches());
    } catch (error) {
      throw error;
    }
  };
}

export function handleEditBranch(payload, id) {
  return async function (dispatch) {
    try {
      const res = await fetch(
        import.meta.env.VITE_BASE_URL + `/branches/${id}`,
        {
          method: "put",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      dispatch(fetchBranches());
    } catch (error) {
      throw error;
    }
  };
}