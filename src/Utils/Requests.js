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

  // For MainPage
  static async lazyFetchObjects(itemType) {
    const url = itemType ? 
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/plant-parts/query?itemType=${itemType}` :
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/plant-parts/query`;

    const response = await fetch(url, {
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

  static async fetchAllInfoPlantPart(id){
    const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/object-data/plant-part/${id}`, {
      headers: {
        Accept: "application/json; charset=utf-8"
      },
      method: "GET"
    });

    return response;
  }

  static async fetchDetailedInfoAboutPlantPart(id){
    const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/plant-parts/id/${id}`, {
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