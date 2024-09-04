"use client";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../libs/firebaseConfig";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<{ id: string; tasks: string }[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  // テキストボックスの値を変更
  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // Firebaseからデータを取得
  useEffect(() => {
    const fetchTodos = async () => {
      const postData = collection(db, "posts");
      const snapshot = await getDocs(postData);
      const fetchedTodos = snapshot.docs.map(doc => ({
        id: doc.id,
        tasks: (doc.data() as { tasks: string }).tasks
      }));
      setTodos(fetchedTodos);
    };

    fetchTodos();
  }, []);

  // 新しいTODOを追加
  const addTodos = async () => {
    if (text.trim() === "") return;

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        tasks: text,
      });
      const newTodo = { id: docRef.id, tasks: text };
      setTodos([...todos, newTodo]);
      setText("");
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  // TODOの編集
  const editTodo = (id: string) => {
    setIsEditing(id);
    const todo = todos.find(todo => todo.id === id);
    if (todo) setEditText(todo.tasks);
  };

  // 編集内容を保存
  const saveEditTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, tasks: editText } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(null);
    setEditText("");
  };

  // TODOを削除
  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
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
        >追加
        </button>
      </div>
      <div>
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-4 mb-2">
            {isEditing === todo.id ? (
              <>
                <input
                  type="text"
                  className="border p-2"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  onClick={() => saveEditTodo(todo.id)}
                  className="border-solid border-2 border-sky-500 p-2"
                >保存
                </button>
              </>
            ) : (
              <>
                <p>{todo.tasks}</p>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="border-solid border-2 border-sky-500 p-2"
                >完了
                </button>
                <button
                  onClick={() => editTodo(todo.id)}
                  className="border-solid border-2 border-sky-500 p-2"
                >編集
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
