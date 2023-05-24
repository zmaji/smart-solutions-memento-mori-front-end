class CategoriesAPI {
  static async all() {
    const url = 'http://localhost:3000/getPeople';

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('An error occurred while fetching categories: ' + error.message);
    }
  }
}

export default CategoriesAPI;
