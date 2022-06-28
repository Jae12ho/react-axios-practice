import React, { useState } from 'react'
import axios from "axios"

const Rest = () => {
  const [text, setText] = useState([]);
  
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  const [inputs, setInputs] = useState({
    title: '',
    content: '',
  });
  const { title, content } = inputs;

  const postHandle = () => {
    axios.post("http://likelion-todo.kro.kr:8000/review/", {
      title: title,
      content: content,
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

  
  // const onChangeTitle = (e) => {
  //   setTitle(e.target.value);
  // }
  // const onChangeContent = (e) => {
  //   setContent(e.target.value);
  // }
      
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  
  return (
    <div>
      <h1>axios 연습</h1>
      <div>
        <input name="title" placeholder="제목" value={title} onChange={onChange} />
        <input name="content" placeholder="내용" value={content} onChange={onChange} />
      </div>
      <div>
        <button onClick={() => {postHandle()}}>POST</button>
        <button onClick={() => {getHandle()}}>GET</button>
      </div>
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