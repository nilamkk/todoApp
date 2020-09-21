//////////////////////////////////////////// DDDDDDDOOOOOOOOOONNNNNNNNNNNEEEEEEEE /////////////////////////////

let todos=getSavedNotes()      
console.log(todos)
const filters={             /// why this is const
    searchText:'',
    hideCompleted:false
}

renderTodos(todos,filters)

document.querySelector('#addTodoForm').addEventListener('submit',(e)=>{
    e.preventDefault()
    const newTaskTitle=e.target.elements.textip.value
    const newTask={
        title:newTaskTitle,
        completed:false,
        id:uuidv4()             ///////////////////uuidv4 added
    }
    todos.push(newTask)
    saveTasks(todos)
    renderTodos(todos,filters)
    e.target.elements.textip.value=''
})

document.querySelector('#searchTaskIP').addEventListener('input',(e)=>{
    filters.searchText=e.target.value
    renderTodos(todos,filters)
})

document.querySelector('#check-Box1').addEventListener('change',(e)=>{
    filters.hideCompleted=e.target.checked
    renderTodos(todos,filters)
})

window.addEventListener('storage',(e)=>{
    if(e.key==='todos'){
        todos=JSON.parse(e.newValue)
        renderTodos(todos,filters)
    }
})



