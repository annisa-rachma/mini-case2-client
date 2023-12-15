export function doTransfer(input, inputTransfer) {
  return async function (dispatch) {
    try {
      // console.log(input,inputTransfer, "<<<  dari action")
      const form = {
        PIN : input.PIN,
        amount : inputTransfer.amount,
        toAccountNo : inputTransfer.toAccountNo
      }
      const res = await fetch(
        import.meta.env.VITE_BASE_URL + "/transaction/transfer",
        {
          method: "post",
          body: JSON.stringify(form),
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

      dispatch({ type: "setTransfer", payload: data });
    } catch (err) {
      throw { message: err.message };
    }
  };
}
