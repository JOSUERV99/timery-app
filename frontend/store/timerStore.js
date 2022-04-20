import axios from "axios";

export const TimerStore = {
    get    : (context, params) => axios.get(`${context.baseUrl}/api/v1/timers/get`),
    create : (context, params) => axios.post(`${context.baseUrl}/api/v1/timers/create`,{data :  { timer: params }}),
    modify : (context, params) => axios.put(`${context.baseUrl}/api/v1/timers/modify`,  {data : { timer: params }}),
    delete : (context, params) => axios.delete(`${context.baseUrl}/api/v1/timers/delete`, {data : params}),
};
