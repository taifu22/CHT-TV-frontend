//appel à notre bdd donc vers son port 4000
import axios from "axios";

const Axios = axios.create({
    baseURL: 'http://localhost:4000'
})

export default Axios