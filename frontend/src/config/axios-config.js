import axios from "axios";

let axiosInstance = null;
function getAxiosInstance(){
  if(!axiosInstance){
    return axios.create({
      baseURL:"https://social-network-6.onrender.com/routes/",
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
  }else{
    return axiosInstance;
  }
}

export default getAxiosInstance;