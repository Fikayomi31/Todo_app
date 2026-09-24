import api from "./api";

export const getTodos = async () => {
    const response = await api.get("/api/todos");
    return response.data;
}

export const createTodo = async (todoData) => {
    const response = await api.post("/api/todos", todoData);
    return response.data;
}

export const updateTodo = async (todoId, updatedData) => {
    const response = await api.put(`/api/todos/${todoId}`, updatedData);
    return response.data;
}

export const deleteTodo = async (todoId) => {
    const response = await api.delete(`/api/todos/${todoId}`);
    return response.data;
}