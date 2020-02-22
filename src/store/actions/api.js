export const API_REQUEST = "API_REQUEST"

// Example usage:
// apiRequest({ url: "phoenix_api/list-toppins", onSuccess, onError });

// NOTE: Response from api subject to change...
// const onSuccess = apiResponse => {
//   const { data: { toppings } } = apiResponse;
//   listToppingsAction(toppings);
// };

// const onError = apiResponse => {
//   const { data: { message } } = apiResponse;
//   showToppingsError(message);
// };

export const apiRequest = ({
  method = "GET",
  url,
  parentResource,
  payload = {},
  loadingResource,
  onSuccess,
  onError,
}) => ({
  type: API_REQUEST,
  payload,
  loadingResource,
  meta: { method, url, parentResource, onSuccess, onError },
})
