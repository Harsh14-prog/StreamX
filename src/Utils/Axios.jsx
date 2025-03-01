import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWZmYWEwZjliNTE3YjQ3MmVmYTI5MTEzZjE3MTNkYiIsIm5iZiI6MTczNjkwODU5NS44MSwic3ViIjoiNjc4NzFmMzNmZTI5NGEwYjQ3NGU5MTNmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.7v7hn0TxPnzbnx4G7LCEUhbsiQnbOZpn_Zos4isg4gw'
      }  
});

export default instance;
