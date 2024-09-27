import axios from "axios";

const API_URL = "http://localhost:3000/tasks"; 

export const saveTaskToAPI = async (task) => {
    try {
        if (task.id) {
            // Update existing task
            const response = await axios.put(`${API_URL}/${task.id}`, task);
            return response.data; 
        } else {
            // Create a new task
            const response = await axios.post(API_URL, task);
            return response.data; 
        }
    } catch (error) {
        console.error("Error saving task to API:", error);
        throw error;
    }
};

// Fetch all tasks from the API
export const getTasksFromAPI = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; 
    } catch (error) {
        console.error("Error fetching tasks from API:", error);
        throw error;
    }
};

// Delete a task from the API
export const deleteTaskFromAPI = async (taskId) => { 
    try {
        const response = await axios.delete(`${API_URL}/${taskId}`); 
        return response.data; 
    } catch (error) {
        console.error("Error deleting task from API:", error);
        throw error;
    }
};
