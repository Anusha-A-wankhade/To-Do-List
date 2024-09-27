import React, { useEffect, useState } from "react";
import { getTasksFromAPI, deleteTaskFromAPI, saveTaskToAPI } from "../Services/TaskService"; 
import NewTask from "./NewTask"; 
import DeleteTaskModal from "./DeleteTask"; 

const TaskTable = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [initialValues, setInitialValues] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(20);

    useEffect(() => {
        const fetchTasks = async () => {
            const tasksFromAPI = await getTasksFromAPI(); 
            setTasks(tasksFromAPI);
        };
        fetchTasks();
    }, []);

    const handleAddTask = () => {
        setInitialValues(null); 
        setShowModal(true);
    };

    const handleSaveTask = async (newTask) => {
        if (initialValues) {
            // Update existing task
            const updatedTask = await saveTaskToAPI(newTask);
            setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
        } else {
            // Add new task
            const savedTask = await saveTaskToAPI(newTask); 
            setTasks((prevTasks) => [...prevTasks, savedTask]); 
        }
        setShowModal(false); 
    };

    const handleDeleteTask = (index) => {
        setTaskToDelete(index);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (tasks[taskToDelete]) {
            await deleteTaskFromAPI(tasks[taskToDelete].id); // Use id for deletion
            const newTasks = tasks.filter((_, index) => index !== taskToDelete);
            setTasks(newTasks);
        }
        setShowDeleteModal(false);
        setTaskToDelete(null);
    };

    const handleRefresh = async () => {
       await window.location.reload();
    };

    // Pagination logic
    const indexOfLastTask = currentPage * recordsPerPage;
    const indexOfFirstTask = indexOfLastTask - recordsPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(tasks.length / recordsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="task-table-container">
            <div className="table-header-main">
                <div className="table-header">
                    <div className="table-header-heading">
                        <div className="list-icon">
                            <i className="fas fa-list"></i>
                        </div>
                        <div className="title">
                            <h2><b>Tasks</b></h2>
                            <h3><b>All Tasks</b></h3>
                        </div>
                    </div>
                    <div className="task-btn">
                        <button className="new-task-btn" onClick={handleAddTask}>New Task</button>
                        <button className="refresh-btn" onClick={handleRefresh}>Refresh</button>
                    </div>
                </div>
                <div className="table-header-search">
                    <p>{tasks.length} records</p>
                    <input
                        type="text"
                        placeholder="Search by Assigned To"
                        className="search-input"
                    />
                </div>
            </div>

            <div className="content">
                <table className="task-table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Assigned To</th>
                            <th>Status</th>
                            <th>Due Date</th>
                            <th>Priority</th>
                            <th>Comments</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTasks.length > 0 ? (
                            currentTasks.map((task, index) => (
                                <tr key={task.id}> 
                                    <td><input type="checkbox" /></td>
                                    <td>{task.user}</td>
                                    <td>{task.status}</td>
                                    <td>{task.dueDate}</td>
                                    <td>{task.priority}</td>
                                    <td>{task.comment}</td>
                                    <td>
                                        <button onClick={() => {
                                            setInitialValues(task); 
                                            setShowModal(true);
                                        }}>Edit</button>
                                        <button onClick={() => handleDeleteTask(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center" }}>
                                    No tasks found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <div>
                    <select value={recordsPerPage} onChange={(e) => setRecordsPerPage(e.target.value)}>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div>
                    <button disabled={currentPage === 1} onClick={() => handlePageChange(1)}>
                        <i className="fas fa-angle-up"></i> First
                    </button>
                    <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                        <i className="fas fa-chevron-left"></i> Prev
                    </button>
                    <span> &nbsp;{currentPage} / {totalPages} &nbsp;</span>
                    <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                        Next <i className="fas fa-chevron-right"></i>
                    </button>
                    <button disabled={currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>
                        <i className="fas fa-angle-down"></i> Last
                    </button>
                </div>
            </div>

            {showModal && (
                <NewTask
                    initialValues={initialValues}
                    onClose={() => setShowModal(false)}
                    onSave={handleSaveTask}
                    existingTasks={tasks}
                />
            )}
            <DeleteTaskModal
                isOpen={showDeleteModal}
                taskName={taskToDelete}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default TaskTable;
