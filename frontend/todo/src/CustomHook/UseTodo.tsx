import { useState } from 'react'


type Todo = {
  id:string,
  title?:string,
  edit?:boolean,
}

type EditTodoFormData = Map<string,string>;

type TodoFormData = {
  addTodo?:string,
}

enum InputSearch{
  ADD_TODO = "addTodo", 
  EDIT_TODO = "editTodo",
}


export function useTodo(){
    const [todo,setTodo] = useState<Todo[]>([]);
  const [todoFormData,setTodoFormData] = useState<TodoFormData>({});
  const [editTodoFormData,setEditTodoFormData] = useState<EditTodoFormData>(new Map());
  const [loading,setLoading] = useState(false);
  const url = 'http://localhost:3000/'

  async function fetchApiHandler(input:string,id:string,title:string) {
      const response = await fetch(url+input,{method:"POST",headers: {
          "Content-Type": "application/json", 
          "Accept": "application/json"        
        },
        body: JSON.stringify({ id:id,title:title })
      });
      console.log(response);
  }


  async function addTodoHandler(){
      if(todoFormData[InputSearch.ADD_TODO]){
        const id = Date.now().toString();
        setLoading(true);
        try {
          await fetchApiHandler('insert',id,todoFormData[InputSearch.ADD_TODO]);
                  setTodo(prev=>[...prev,{
                  title:todoFormData[InputSearch.ADD_TODO],
                  id:id,
                  edit:false,
                }]);
          setTodoFormData(prev=>({...prev,[InputSearch.ADD_TODO]:""}));
          setLoading(false);   
          alert("Success");
        } catch (error) {
          setLoading(false);  
          console.log(error);
          alert("Failure");
        }
      }
  }

  async function deleteTodoHandler(id:string){
      
        setLoading(true);
        try {
          await fetchApiHandler('delete',id,"");
          setTodo(prev=>{
            const newPrev = prev.filter(item=>item.id!==id);
            return newPrev;
          })

          setLoading(false);   
          alert("Success");
        } catch (error) {
          setLoading(false);  
          console.log(error);
          alert("Failure");
        }
  }

  function editTodoHandler(index:number){
     setTodo(prev=>{
        const newPrev = [...prev];
        newPrev[index] = {...newPrev[index],edit:true};
        return newPrev;
      })
  }

  async function updateTodoHandler(index:number,id:string){
     

        setLoading(true);
        try {
          await fetchApiHandler('update',id,editTodoFormData.get(id)!);
          setTodo(prev=>{
            const newPrev = [...prev];
            newPrev[index] = {...newPrev[index],edit:false,title:editTodoFormData.get(id)};
            return newPrev;
          })
          setLoading(false);   
          alert("Success");
        } catch (error) {
          setLoading(false);  
          console.log(error);
          alert("Failure");
        }
  }

  function handleTodoFormSearch(e:any){
    const {name,value} = e.target;

   if(!name?.trim()?.length){
      return ;
   }

    setTodoFormData(prev=>{
      return {...prev,[name]:value}
    })
  }



  return {
        handleTodoFormSearch,updateTodoHandler,
        editTodoHandler,deleteTodoHandler,
        addTodoHandler,fetchApiHandler,
        todo,setTodo,
        todoFormData,setTodoFormData,
        editTodoFormData,setEditTodoFormData,
        loading,setLoading,url
    }
}