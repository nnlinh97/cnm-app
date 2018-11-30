import axios from 'axios';
import * as Config from './../constants/Config';


const connectAPI = (api, method = "GET", body) => {
    return axios({
        method: method,
        url: `${Config.URL}${api}`,
        data: body
    })
    .catch((error) => {
        console.log(error);
    });
}

export default connectAPI;