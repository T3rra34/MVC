class Model {
  constructor(){
    this.tasks = [
      {id:1, text: 'gg no re', complete: false},
      {id:2, text: 'ff15', complete: false}
    ]
  }
  addTask(taskList){
  	let id
  	if(this.tasks.length > 0){
  		id = this.tasks[this.tasks.length - 1].id + 1
  	} else {
  		id = 1
  	}
  	const task = {
  		id: id,
  		text: tasktext,
  		complete: false
  	}
  	this.tasks.push(task)
  	this.onTaskListChanged(this.tasks)
  }
  tasklistchanged(callback){
  	this.onTaskListChanged = callback
  }
}

class View {
  constructor(){

    this.app = this.getElement('#root')
    this.title = this.setElement('h1')
    this.title.textContent = 'Tasks'

    this.form = this.setElement('h1')
    this.input = this.setElement('input')
    this.input.type = "text"
    this.input.name = "task"
    this.input.placeholder = "Add new task"
    this.submitbutton = this.setElement('button')
    this.submitbutton.textContent = "Add task"
    this.form.append(this.input, this.submitbutton) 
    this.taskList = this.setElement('ul')
    this.app.append(this.title, this.form, this.taskList)
  }

  displayTasks(tasks){
    if(tasks.length === 0){
      const p = this.setElement('p')
      p.textContent = 'Add a task if is nothing to do'
      this.taskList.append(p)
    } else {
      tasks.forEach(task => {
      const li = this.setElement('li')
      li.id = task.id
      const checkbox = this.setElement('input')
      checkbox.type = 'checkbox'
      checkbox.cheked = task.complete
      const span = this.setElement('span')
      if(task.complete === true){
        const strike = this.setElement('s')
        strike.textContent = task.text
        span.append(strike)
      } else {
        span.textContent = task.text
      }
      const deleteButton = this.setElement('button', 'delete')
      deleteButton.textContent = 'Delete'
      li.append(checkbox, span, deleteButton)
      this.taskList.append(li)
    })
    }
  }
  addTask(handler){
  	this.form.addEventlistener('submit', event => {
  		event.preventDefault()
  		if(this._tasktext){
  			console.log(this._tasktext)
  			handler(this._tasktext)
  		}
  	})
  }

  getElement(selector){
    const element = document.querySelector(selector)
    return element
  }

  get _tasktext(){
  	return this.input.value
  }

  setElement(tag, classname){
    const element = document.createElement(tag)
    if(classname !== undefined){
      element.classList.add(classname)
    }
    return element
  }
}

class Controller {
  constructor(model, view){
    this.model = model
    this.view = view

    this.model.tasklistchanged(this.displayTasks)
    this.view.addTask(this.handleraddTask)

    this.displayTasks(this.model.tasks)
  }

  displayTasks = tasks => {
    this.view.displayTasks(tasks)
  }
  handleraddTask = tasktext => {
  	this.model.addTask(tasktext)
  }
}

const app = new Controller(new Model(), new View())