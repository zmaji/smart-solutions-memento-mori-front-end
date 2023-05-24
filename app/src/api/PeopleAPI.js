class PeopleAPI {
  static async all(params) {
    const { searchText, count, categories } = params;
    let url = 'http://localhost:3000/getPeople';

    if (searchText) {
      const queryParams = [`count=${count}`, `search=${searchText}`];
      if (categories && categories.length >= 1) {
        const categoryParams = categories.map(category => `category=${category}`);
        queryParams.push(...categoryParams);
      }
      url += `?${queryParams.join('&')}`;
    } else if (categories && categories.length >= 1) {
      const categoryParams = categories.map(category => `category=${category}`);
      url += `?${categoryParams.join('&')}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('An error occurred while fetching people: ' + error.message);
    }
  }
}

export default PeopleAPI;