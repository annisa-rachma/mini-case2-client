export function doPayment(PIN) {
  return async function (dispatch) {
    try {
      // console.log(PIN, "<<< pin dari action")
      const res = await fetch(
        import.meta.env.VITE_BASE_URL + "/transaction/payment",
        {
          method: "post",
          body: JSON.stringify(PIN),
          headers: {
            'Content-Type': 'application/json',
            access_token: localStorage.access_token,
          },
        }
      );
      const data = await res.json();
      // console.log(data, '<< dari action')
      if (!res.ok) {
        throw data;
      }

      dispatch({ type: "setPayment", payload: data });
    } catch (err) {
      throw { message: err.message };
    }
  };
}
