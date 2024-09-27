import React from 'react';

const DeleteTaskModal = ({ isOpen, taskName, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="delete-task-modal">
            <div className="delete-task-modal-content">
                <div className="delete-task-modal-header">
                    <h2>Delete</h2>
                    <span className="delete-task-modal-close" onClick={onClose}>&times;</span>
                </div>
                <div className="delete-task-modal-body">
                    <p>Do you want to delete the task "{taskName}"?</p>
                </div>
                <div className="delete-task-modal-footer">
                    <button className="delete-task-no-btn" onClick={onClose}>No</button>
                    <button className="delete-task-yes-btn" onClick={onConfirm}>Yes</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteTaskModal;
