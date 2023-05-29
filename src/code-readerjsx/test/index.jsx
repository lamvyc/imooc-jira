import React from 'react';
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useQuery, useMutation } from 'react-query'

function CreateUserForm() {

  const createUsers = async (userData) => {
    const response = await fetch('https://www.baidu.com');
    const data = await response.json();
    return data;
  };

 

  const [newTodo, setNewTodo] = useState('');
  const { mutate, isLoading, isError, isSuccess } = useMutation(createUsers());
  

  const handleAddTodo = () => {
    mutate({ newTodo});
  };
  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      {isLoading ? <p>Adding Todo...</p> : null}
      {isError ? <p>Error adding Todo</p> : null}
      {isSuccess ? <p>Todo added successfully!</p> : null}
    </div>

  );
}

export default CreateUserForm