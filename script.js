class Model {
	constructor(){
	this.tasks = [
	{id: 0, text: "be good", complete: "gg"},
	{id: 1, text: "be nice", complete: "no re"},
	{id: 2, text: "be humble", complete: "ff15"}
	]
	}
}
class View{
	constructor(){
	this.app = this.getElement("#root")
	this.title = this.setElement("H1")
	this.title.textContent = "tasks"
	this.TaskList = this.setElement("ul")
	this.app.append(this.title, this.TaskList)

	}
	displayTasks(tasks){
		tasks.forEach(tasks => {
			const li = this.setElement('li')
			li.id = task.id
			const checkbox = this.setElement("input")
			checkbox.type = "checkbox"
			checkbox.checked = task.complete
			const span = this.setElement("span")
			if(task.complete == true) {
				const strike = this.setElement("s")
				strike.textContent = task.text
				span.append(strike)
			} else {
				span.textContent = task.text
			}
			li.append(checkbox, span)
			this.TaskList.append(li)
		})
	}
	getElement(selector){
		const element = document.querySelector(selector)
		return element;
	}
	setElement(tag, Classname){
		const element = document.createElement(tag)
		if(Classname !== undefined) {
			element.classList.add(Classname)
		}
	
	return element
}
}
class Controller{
	constructor(model, view){
	this.model = model
	this.view = view
	}
}

const app = new Controller(new Model(),new View());