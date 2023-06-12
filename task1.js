const http = require('http');

const tasks = [];

function validateTask(task) {
  if (!task.name || typeof task.name !== 'string') {
    throw new Error('the name is required or please check the type of name');
  }
  if (task.priority < 1 || task.priority > 5) {
    throw new Error('Priority must be between 1 and 5');
  }
  if (!task.id || typeof task.id !== 'number') {
    throw new Error('the id is required or please check the type of id');
  }
}

function addTask(task) {
  validateTask(task);
  tasks.push(task);
}

function getTasks() {
  return tasks;
}

function deleteTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    tasks.delete(task);
  }
}

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'POST':
      addTask(JSON.parse(req.body));
      res.sendStatus(201);
      break;
    case 'GET':
      res.send(JSON.stringify(getTasks()));
      break;
    case 'PUT':
      deleteTask(req.params.id);
      addTask(JSON.parse(req.body));
      res.sendStatus(200);
      break;
    case 'DELETE':
      deleteTask(req.params.id);
      res.sendStatus(200);
      break;
    default:
      res.sendStatus(405);
  }
});

server.listen(3000);