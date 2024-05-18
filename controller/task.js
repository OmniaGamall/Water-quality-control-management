const path = require('path');
const connection = require(path.join(path.resolve(), 'config/db.js'));

let addTask = async (req, res) => {  
    const ID = req.params.EmpID;
    const {Description_, Status_ } = req.body;

    connection.execute(
        `INSERT INTO task (Description_, Status_) VALUES (?, ?)`,
        [Description_, Status_],
        (err, taskResult) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Failed', err });
            }

            const taskId = taskResult.insertId;

            connection.execute(
                `INSERT INTO create_task (EmpID, TaskID) VALUES (?, ?)`,
                [ID, taskId],
                (err, createTaskResult) => {
                    if (err) {
                        console.error('Database error:', err);
                        return res.status(500).json({ message: 'Failed', err });
                    }

                    res.status(200).json({ message: "Success", taskId });
                }
            );
        }
    );
}

let getTaskByID = async(req, res) =>{
    const taskID = req.params.TaskID;
    connection.execute(`select * from task where TaskID = ?`, [taskID], (err, data) =>{
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Error fetching task', error: err });
        }
        if (data && data.length > 0) {
            res.status(200).json({ message : "Success", data: data[0] });
        } else {
            res.status(404).json({ message : "Task not found" });
        }
    });
}

let getAllTasks = async(req, res) =>{
    connection.execute(`select *  from task`, (err, data) =>{
        if(data)
            res.json(200, {message : "Success", data})
        else
        res.json(500, {message : "Failed", err})
    })
    
}

let deleteTaskByID = async (req, res) => {
    const ID = req.params.EmpID;
    const taskId = req.params.TaskID;

    connection.execute(`SELECT * FROM create_task WHERE EmpID = ? AND TaskID = ?`, [ID, taskId], (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed to verify task creator', error: err });
        }

        if (data.length > 0) {
            connection.execute(`DELETE FROM task WHERE TaskID = ?`, [taskId], (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ message: 'Failed to delete task', error: err });
                }

                if (result.affectedRows > 0) {
                    res.status(200).json({ message: 'Task deleted successfully' });
                } else {
                    res.status(404).json({ message: 'Task not found' });
                }
            });
        } else {
            res.status(403).json({ message: 'You are not authorized to delete this task' });
        }
    });
};

let updateTaskByID = async (req, res) => {
    const taskId = req.params.TaskID;
    const { Status_ } = req.body;

    connection.execute(`UPDATE task SET Status_ = ? WHERE TaskID = ?`, [Status_,  taskId], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Failed to update task', error: err });
            }

            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Task updated successfully' });
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        });
};

module.exports = {
    addTask,
    getTaskByID,
    getAllTasks,
    deleteTaskByID,
    updateTaskByID
}