export default class Requests {

  // For MainPage
  static async lazyFetchDates() {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/dates`, {
      headers: {
        Accept: "application/json; charset=utf-8"
      },
      method: "GET"
    });

    return response;
  }
}