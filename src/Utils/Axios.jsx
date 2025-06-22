import axios from "axios";

const instance = axios.create({
  baseURL: "https://streamx-proxy-production.up.railway.app/api", 
  
  headers: {
    accept: "application/json",
  },
});

export default instance;
