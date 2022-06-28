import React, { useState } from 'react'
import axios from "axios"

const Rest = () => {
  const [text, setText] = useState([]);

  const postHandle = () => {
    axios.post("http://likelion-todo.kro.kr:8000/review/", {
      title: "제목",
      content: "내용",
    }).then(res => {
      console.log(res);
    }).catch(res => {
      console.log(res);
    });
  };

  const getHandle = () => {
    axios.get("http://likelion-todo.kro.kr:8000/review/")
    .then(res => {
      setText([...res.data]);
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    });
  }

  const deleteHandle = (id) => {
    axios.delete(`http://likelion-todo.kro.kr:8000/review/${id}`);
    setText(text.filter(text => text.id !== id));
  }

  return (
    <div>
      <h1>axios 연습</h1>
      <button onClick={() => {postHandle()}}>POST</button>
      <button onClick={() => {getHandle()}}>GET</button>
      {text.map((e) => (
        <div>
          <span>
            {e.id}번, {e.title}, {e.content}, {e.update_at}
          </span>
          <button onClick={() => {deleteHandle(e.id)}}>DELETE</button>
        </div>
      ))}
    </div>
  )
}

export default Rest