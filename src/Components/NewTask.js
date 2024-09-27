// NewTask.js
import React, { useState, useEffect } from "react";
import { saveTaskToAPI } from "../Services/TaskService"; // Import the service function

const NewTask = ({ initialValues, onClose, onSave }) => {
    const [task, setTask] = useState({
        user: "",
        status: "Not Started",
        dueDate: "",
        priority: "Low",
        comment: "",
    });

    useEffect(() => {
        if (initialValues) {
            setTask({
                user: initialValues.user,
                status: initialValues.status,
                dueDate: initialValues.dueDate ? initialValues.dueDate.split('T')[0] : "",
                priority: initialValues.priority,
                comment: initialValues.comment,
            });
        }
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await saveTaskToAPI(task); // Save task to the API
            onSave(task); // Call the onSave function passed as a prop
            onClose(); // Close the modal
        } catch (error) {
            console.error("Failed to save task:", error);
        }
    };

    return (
        <div className="new-task-modal">
            <div className="new-task-modal-content">
                <div className="new-task-modal-header">
                    <h2>{initialValues ? "Edit Task" : "New Task"}</h2>
                    <i className="fas fa-times new-task-modal-close" onClick={onClose}></i>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="new-task-form-row">
                        <label>
                            Assigned To: <span className="new-task-required">*</span>
                            <input 
                                type="text" 
                                name="user" 
                                value={task.user} 
                                onChange={handleChange} 
                                required 
                            />
                        </label>
                        <label>
                            Status: <span className="new-task-required">*</span>
                            <select 
                                name="status" 
                                value={task.status} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </label>
                    </div>
                    <div className="new-task-form-row">
                        <label>
                            Due Date: <span className="new-task-required">*</span>
                            <input 
                                type="date" 
                                name="dueDate" 
                                value={task.dueDate} 
                                onChange={handleChange} 
                                required 
                            />
                        </label>
                        <label>
                            Priority: <span className="new-task-required">*</span>
                            <select 
                                name="priority" 
                                value={task.priority} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="Low">Low</option>
                                <option value="Normal">Normal</option>
                                <option value="High">High</option>
                            </select>
                        </label>
                    </div>
                    <div className="new-task-comment-main">
                        <label>
                            Comments:
                            <textarea
                                className="new-task-comment"
                                name="comment"
                                value={task.comment}
                                onChange={handleChange}
                                rows="4"
                            />
                        </label>
                    </div>
                    <div className="new-task-modal-footer">
                        <button type="button" className="new-task-cancel-btn" onClick={onClose}>Cancel</button>
                        <button className="new-task-save-btn" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewTask;
