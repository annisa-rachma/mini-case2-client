export function fetchEmployees() {
  return async function (dispatch) {
    try {
      let url = import.meta.env.VITE_BASE_URL + "/employees";

      const res = await fetch(url, {
        headers: { access_token: localStorage.getItem("access_token") },
      });
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      dispatch({ type: "setEmployee", payload: data });
    } catch (error) {
      throw error;
    }
  };
}

export function fetchEmployeeDetail(id) {
  return async function (dispatch) {
    try {
      const res = await fetch(
        import.meta.env.VITE_BASE_URL + `/employees/${id}`,
        {
          headers: { access_token: localStorage.getItem("access_token") },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      dispatch({ type: "setEmployeeDetail", payload: data });
    } catch (error) {
      throw error;
    }
  };
}

export function handleAddEmployee(payload) {
  return async function (dispatch) {
    try {
      const res = await fetch(import.meta.env.VITE_BASE_URL + "/employees", {
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
      dispatch(fetchEmployees());
    } catch (error) {
      throw error;
    }
  };
}

export function handleEditEmployee(payload, id) {
  return async function (dispatch) {
    try {
      const res = await fetch(
        import.meta.env.VITE_BASE_URL + `/employees/${id}`,
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
      dispatch(fetchEmployees());
    } catch (error) {
      throw error;
    }
  };
}

export function handleDeleteEmployee(id) {
  return async function (dispatch) {
    try {
      const res = await fetch(
        import.meta.env.VITE_BASE_URL + `/employees/${id}`,
        {
          method: "delete",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      const data = await res.json();
      if (!res.ok) throw data;
      dispatch(fetchEmployees());
      return data;
    } catch (error) {
      throw error;
    }
  };
}
