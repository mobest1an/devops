import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
    headers: {"Content-Type": "application/json"},
});

export const fetchEvents = () => api.get("/events");
export const fetchEvent = (id) => api.get(`/events/${id}`);
export const createEvent = (event) => api.post("/events", event);
export const updateEvent = (id, event) => api.put(`/events/${id}`, event);
export const deleteEvent = (id) => api.delete(`/events/${id}`);

export const fetchTickets = () => api.get("/tickets");
export const purchaseTicket = (payload) => api.post("/tickets/purchase", payload);
export const updateTicket = (id, ticket) => api.put(`/tickets/${id}`, ticket);
export const deleteTicket = (id) => api.delete(`/tickets/${id}`);
