"use client";

import { useState } from "react";
import styles from "./css/home.module.css";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const addTodos = () => {
    const newTodos = [...todos];
    newTodos.push(text);
    setTodos(newTodos);
    setText("");
  };

  const editTodo = (index: number) => {
    setIsEditing(index);
    setEditText(todos[index]);
  };

  const saveEditTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index] = editText;
    setTodos(newTodos);
    setIsEditing(null);
  };

  const deleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <main className="p-4">
      <h1 className="text-3xl text-center text-blue-400 mb-8">
        -Next.js TODOリスト-
      </h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="todoを入力"
          className="border p-2"
          value={text}
          onChange={changeText}
        />
        <button
          onClick={addTodos}
          className="border-solid border-sky-400 border-2 p-2"
        >
          追加
        </button>
      </div>

      <div>
        <ul className="py-4">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex mb-2 gap-4 justify-start align-middle items-center"
            >
              {isEditing === index ? (
                <>
                  <input
                    type="text"
                    className="border p-2"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    className="border-solid border-2 border-sky-500 p-2"
                    onClick={() => saveEditTodo(index)}
                  >
                    保存
                  </button>
                </>
              ) : (
                <>
                  <p>{todo}</p>
                  <button
                    className="border-solid border-2 border-sky-500 p-2"
                    onClick={() => deleteTodo(index)}
                  >
                    完了
                  </button>
                  <button
                    className="border-solid border-2 border-sky-500 p-2"
                    onClick={() => editTodo(index)}
                  >
                    編集
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
