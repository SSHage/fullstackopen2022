import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const getData = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl,newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
} //places the newobject the id of the baseurl, the full address in the first term refers to the directory

const deletion = (id) => {
    // return console.log("deletion function is working")
    return axios.delete(`${baseUrl}/${id}`)
}

export default {getData, create, update, deletion}