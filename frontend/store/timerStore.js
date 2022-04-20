import axios from "axios";

export const TimerStore = {
    get    : (context, params) => axios.get(`${context.baseUrl}/api/v1/timers/get`),
    create : (context, params) => axios.post(`${context.baseUrl}/api/v1/timers/create`, params),
    modify : (context, params) => axios.put(`${context.baseUrl}/api/v1/timers/modify`, params),
    delete : (context, params) => axios.delete(`${context.baseUrl}/api/v1/timers/delete`, params),
};
