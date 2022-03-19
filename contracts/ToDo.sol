// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;
pragma experimental ABIEncoderV2;

contract ToDo {
    // To do struct
    struct TaskData {
        string title;
        string dueIn;
        bool completed;
    }

    // map strcut arrays to address
    mapping(address => TaskData[]) tasks;

    event newTaskAlert(address indexed user, string title);

    // insert new task
    function addTask(string memory _title, string memory _dueIn) public {
        TaskData memory newTask = TaskData(_title, _dueIn, false);
        tasks[msg.sender].push(newTask);
        emit newTaskAlert(msg.sender, _title);
    }

    // toggle completed status
    function toggleCompleted(uint256 _index) public {
        tasks[msg.sender][_index].completed = !tasks[msg.sender][_index]
            .completed;
    }

    // get users tasks
    function getMyTasks() public view returns (TaskData[] memory) {
        return tasks[msg.sender];
    }
}
