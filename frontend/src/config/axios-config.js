import axios from "axios";

let axiosInstance = null;
function getAxiosInstance(){
  if(!axiosInstance){
    return axios.create({
      baseURL:"https://social-network-6.onrender.com/routes/",
      // baseURL:"http://localhost:8080/routes/",
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
  }else{
    return axiosInstance;
  }
}

export default getAxiosInstance;