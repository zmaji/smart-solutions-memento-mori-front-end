class CategoriesAPI {
  static async all() {
    let url = 'http://localhost:3000/getPeople';
    console.log(`URL CategoriesAPI:`);
    console.log(url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred while awaiting the response:', error);
      return null;
    }
  }
}

export default CategoriesAPI;