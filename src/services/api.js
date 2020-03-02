import axios from 'axios'


const api = axios.create({
    baseURL: 'https://otaku-list.herokuapp.com/'
})


export default api