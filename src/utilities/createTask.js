
let id = 0;

function createTask(taskName){
    return {
        taskId:++id,
        taskName,
        complete:false
    };
}

export default createTask