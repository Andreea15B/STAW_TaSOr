"user strict";
var sql = require("../config/db");

class TaskUsers {
    constructor(taskUser) {
        this.id_task = taskUser.id_task;
        this.username = taskUser.username;
    }
};

TaskUsers.create_taskUser = (newTaskUser, result) => {
    sql.query("INSERT INTO task_assignments set ?", newTaskUser, (error, res) => {
        if (error) result(error, null);
        else result(null, res.insertId);
    });
};

TaskUsers.get_all_users_for_task = (id_task, result) => {
    sql.query("SELECT username FROM task_assignments WHERE id_task = ? ", id_task, (error, res) => {
        if (error) result(error, null);
        else result(null, res);
    });
};

TaskUsers.get_all_tasks_for_user = (username, result) => {
    sql.query("SELECT id_task FROM task_assignments WHERE  username = ? ", username, (error, res) => {
        if (error) result(error, null);
        else result(null, res);
    });
};

TaskUsers.get_task_assign = (result) => {
    sql.query("SELECT * FROM task_assignments ", (error, res) => {
        if (error) result(error, null);
        else result(null, res);
    });
};

module.exports = TaskUsers;