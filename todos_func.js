//  todo={title:ccnmds, completed:true}
//////////////////////////////////////////// DDDDDDDOOOOOOOOOONNNNNNNNNNNEEEEEEEE /////////////////////////////
const getSavedNotes=()=>{
    let todoJSON=localStorage.getItem('todos')
    
    if(todoJSON!==null){                ///why null?
        return JSON.parse(todoJSON)
    }
    return []       // this is what we need to handle initial case
}

const saveTasks=(todo)=>{
    localStorage.setItem('todos',JSON.stringify(todo))
}

// Toggle completed 
const toggleCompleted=(id)=>{
    const toChange=todos.find((todo)=>{
        return todo.id===id
    })
    if(toChange!==undefined){
        toChange.completed=!toChange.completed
    }
}
// remove element
const removeElement=(id)=>{
    const inde=todos.findIndex((todo)=>{
        return todo.id===id
    })
    if(inde>-1){
        todos.splice(inde,1)
    }
}


const generateMsgEl=(toRender)=>{
    const para=document.createElement('p')
    const toDoInRender=toRender.filter((todo)=>{
        return todo.completed===false
    })

    para.textContent=`You have ${toDoInRender.length} todos`
    return para
}

const generateEl=(todo)=>{
    const cb=document.createElement('input')
    const para=document.createElement('span')
    const button=document.createElement('button')
    const divR=document.createElement('div')

    cb.setAttribute('type','checkbox')
    // event Listener for cb
    cb.addEventListener('change',()=>{
        toggleCompleted(todo.id)
        saveTasks(todos)
        renderTodos(todos,filters)
        // console.log('Running')

        // console.log(todo.completed)
    })
    cb.checked=todo.completed
    para.textContent=todo.title
    button.textContent='X'
    // add event listener to the button
    button.addEventListener('click',()=>{
        removeElement(todo.id)
        saveTasks(todos)
        renderTodos(todos,filters)
    })

    divR.appendChild(cb)
    divR.appendChild(para)
    divR.appendChild(button)
    return divR
}

const renderTodos=(todos,filters)=>{
    const toRender=todos.filter((todo)=>{
        const searchMatch=todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideMatch=!filters.hideCompleted || !todo.completed       // nice logic
        
        return searchMatch && hideMatch
    })
    // target div
    const renderingDiv=document.querySelector('#renderingDiv')
    renderingDiv.innerHTML=''
    // render msg
    const msgEl=generateMsgEl(toRender)
    renderingDiv.appendChild(msgEl)
    // render todos
    toRender.forEach((todo)=>{
        const rendEl=generateEl(todo)
        renderingDiv.appendChild(rendEl)
    })
}

