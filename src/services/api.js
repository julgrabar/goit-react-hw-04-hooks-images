import axios from "axios";

export const  getImages = async (searchValue, page=1) => {
    const apiUrl = `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=25268338-c83be630200395a9374b8c8e0&image_type=photo&orientation=horizontal&per_page=12`
    const response = await axios.get(apiUrl);
    return response.data
}