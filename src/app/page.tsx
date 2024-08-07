"use client";

import { useState } from "react";

export default function Home() {

  const [text, setText] = useState<string>("");


  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const [todos, setTodos] = useState<string[]>([]);


  const addTodos =()=>{
    const newTodos =[...todos];
    newTodos.push(text);
    setTodos(newTodos)
    setText("");
  }

  const editTodo =()=>{
    console.log("");

  }


  const deleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <main className="p-4">
      <h1 className="text-3xl text-center text-blue-400 mb-8">
        -SampleTODOリスト
      </h1>

      <div>
        <input type="text"  placeholder="todoを入力" className="border p-2 my-2" onChange={changeText}/>

        <button onClick={addTodos}>追加</button>
      </div>

      <div>
      <ul>
          {todos.map((todo, index) => (
            <li key={index} className="flex">
              <p>{todo}</p>
              <button className="border-solid border-2 border-sky-500 p-2" onClick={() => deleteTodo(index)}>完了</button>
              <button className="border-solid border-2 border-sky-500 p-2" onClick={()=> editTodo(index)}>編集</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
