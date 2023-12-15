
export function fetchReport(params) {
  return async function(dispatch) {
      try {
          let url = import.meta.env.VITE_BASE_URL + "/report"

          if(params) {
            url += params
          }

          // console.log(url, '<<< url dari action')

          const res = await fetch(url , {
            headers: { access_token: localStorage.getItem("access_token") },
          });
          const data = await res.json();
          if (!res.ok) {
            throw data;
          }
          dispatch({ type: "setReport", payload: data })
        } catch (error) {
          throw error;
        }
  }
}