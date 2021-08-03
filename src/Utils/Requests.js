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

  static async fetchDate(id) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/dates/${id}`, {
      headers: {
        Accept: "application/json; charset=utf-8"
      },
      method: "GET"
    });

    return response;
  }

  static async eagerFetchImageInfo(id) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/imageinfo/allinfo/${id}`, {
      headers: {
        Accept: "application/json; charset=utf-8"
      },
      method: "GET"
    });

    return response;
  }

  static imageURLBuild(rel_path) {
    return `${process.env.REACT_APP_BACKEND_BASE_URL}/api/images/${rel_path}`;
  }
}