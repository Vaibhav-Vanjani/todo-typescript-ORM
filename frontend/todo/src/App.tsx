import { useTodo } from "./CustomHook/UseTodo";

type Todo = {
  id:string,
  title?:string,
  edit?:boolean,
}

enum InputSearch{
  ADD_TODO = "addTodo", 
  EDIT_TODO = "editTodo",
}

function App() {
   
  const {
        handleTodoFormSearch,updateTodoHandler,
        editTodoHandler,deleteTodoHandler,
        addTodoHandler,
        todo,todoFormData,loading,
        editTodoFormData,setEditTodoFormData,
      }  = useTodo();
  return (
   <>
  {/* Input + Add button */}
  <section className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100'>
  {loading && <>Loading....</>}
 
  <div className="flex mb-4 w-1/3 gap-2 justify-center">
    <input
      type="text"
      name={InputSearch.ADD_TODO}
      value={todoFormData[InputSearch.ADD_TODO]}
      onChange={handleTodoFormSearch}
      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Add a todo..."
    />
    <button
      onClick={addTodoHandler}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    >
      Add
    </button>
  </div>

  {/* Todo list */}
  <div className="flex flex-col mb-4 w-1/3 gap-2 justify-center">
    {todo.map((item: Todo, index: number) => (
      <div
        key={item.id}
        className="flex w-full items-center justify-between p-3 border border-gray-200 rounded shadow-sm"
      >
        {/* Editable or normal view */}
        <div className="flex-1">
          {item.edit ? (
            <input
              type="text"
              value={editTodoFormData.get(item.id!) ?? ""}
              onChange={(e) =>
                setEditTodoFormData((prev) => {
                  const newMap = new Map(prev);
                  newMap.set(item.id!, e.target.value);
                  return newMap;
                })
              }
              className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <span className="text-gray-800">{item.title}</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2 ml-4">
          {item.edit ? (
            <button
              onClick={() => updateTodoHandler(index, item.id!)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Update
            </button>
          ) : (
            <button
              onClick={() => {
                editTodoHandler(index);
                setEditTodoFormData((prev) => {
                  const newMap = new Map(prev);
                  newMap.set(item.id!, item.title!);
                  return newMap;
                });
              }}
              className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => item.id && deleteTodoHandler(item.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
  </section>
</>
  )
}

export default App;
