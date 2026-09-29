import api from "./api";

export const getTodos = async () => {
    const response = await api.get("/todos/");
    return response.data;
}

export const createTodo = async (todoData) => {
    const response = await api.post("/todos/", todoData);
    return response.data;
}

export const updateTodo = async (todoId, updatedData) => {
    const response = await api.put(`/todos/${todoId}`, updatedData);
    return response.data;
}

export const deleteTodo = async (todoId) => {
    const response = await api.delete(`/todos/${todoId}`);
    return response.data;
}

export const getSettings = async () => {
    const response = await api.get("/settings/");
    return response.data;
}

export const updateSettings = async (settingsData) => {
    const response = await api.put("/settings/", settingsData);
    return response.data;
}