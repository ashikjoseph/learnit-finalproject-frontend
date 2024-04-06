import { commonAPI } from "./commonAPI";
import { BASE_URL } from "./baseurl";

// 1) register user
export const registerAPI = async (user) => {
    return await commonAPI("post", `${BASE_URL}/user/register`, user, "")
}


// 2) login user

export const loginAPI = async (reqBody) => {
    return await commonAPI("post", `${BASE_URL}/user/login`, reqBody, "")
}

// 3) add note

export const addNoteAPI = async (reqBody, reqHeader) => {
    return await commonAPI('post', `${BASE_URL}/note/add`, reqBody, reqHeader)
}

//4) get home notes (3 items)
export const homeNoteApi = async()=>{
    return await commonAPI("GET",`${BASE_URL}/note/home-note`,'','')
}

// 5) get all note
// searchKey is passed as query parameter
// path?key=value
export const allNoteApi = async (searchKey, reqHeader) => {
    return await commonAPI("GET", `${BASE_URL}/note/all-note?search=${searchKey}`, '', reqHeader)
}

// 6) get user project
export const userNoteApi = async (reqHeader) => {
    return await commonAPI("GET", `${BASE_URL}/note/user-note`, '', reqHeader)
}

// 7) update user project
export const editUserNoteApi = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${BASE_URL}/note/edit/${id}`, reqBody, reqHeader);
}


// 8) delete a note
export const deleteNoteApi = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/note/remove/${id}`,{},reqHeader)
}