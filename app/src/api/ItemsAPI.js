// class ItemsAPI {
//   static async all(state) {
//     const url = 'http://localhost:3000/getPeople';

//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('An error occurred while awaiting the response:', error);
//       return null;
//     }
//   }
// }

//   static getUrl(params) {
//     const { count, after, currentCategories, searchText } = params;

//     const encodedCategories = currentCategories.length > 0 ? encodeURIComponent(currentCategories) : '';
//     const filterTypes = currentCategories.length > 0 ? `&category__in=${encodedCategories}` : '';

//     const search = searchText ? `&name__icontains=${searchText}` : '';
//     const afterParam = after !== '' ? `&after=${after}` : '';

//     return `https://api.hubapi.com/cms/v3/hubdb/tables/${tableId}/rows?portalId=${portalId}&limit=${count}${afterParam}${filterTypes}${search}`;
//   }

class ItemsAPI {
  static async all(params) {
    const { searchText, count } = params;
    let url = 'http://localhost:3000/getPeople';

    if (searchText) {
      url += `?count=${count}&search=${searchText}`;
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

export default ItemsAPI;


