import axios from 'axios';
import * as Config from './../constants/Config';


const connectapi = (api, method = "GET", body) => {
    return axios({
        method: method,
        url: `${Config.url}${api}`,
        data: body
    })
    .catch((error) => {
        console.log(error);
    });
}
export default connectapi;