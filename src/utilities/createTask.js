
let id = 0;

function createTask(taskName){
    return {
        taskId:++id+Math.random(),
        taskName,
        complete:false
    };
}

export default createTask