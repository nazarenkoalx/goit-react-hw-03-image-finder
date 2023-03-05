import axios from 'axios';

export async function goSearch(query, pageNumber) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '32613318-c4586bdc29b7e1cabb37e9d30',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: pageNumber,
        per_page: 12,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}
