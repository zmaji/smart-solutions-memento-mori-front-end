class PeopleAPI {
  static async all(params) {
    const { searchText, count, categories } = params;
    let url = 'http://localhost:3000/getPeople';

    console.log(`CATEGORIES:`)
    console.log(categories)

    if (searchText) {
      url += `?count=${count}&search=${searchText}`;
      if (categories && categories.length >= 1) {
        url += `&category=${categories[0]}`;
        if (categories.length > 1) {
          for (let i = 1; i < categories.length; i++) {
            url += `&category=${categories[i]}`;
          }
        }
      }
    } else if (categories && categories.length >= 1) {
      url += `?category=${categories[0]}`;
      if (categories.length > 1) {
        for (let i = 1; i < categories.length; i++) {
          url += `&category=${categories[i]}`;
        }
      }
    }

    console.log(`URL:`);
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

export default PeopleAPI;


