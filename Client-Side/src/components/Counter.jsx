import React, { useEffect, useRef, useState } from "react";
import "./counter.css";
import axios from "axios";

export function Counter({ count, onIncrement, onDecrement }) {
  const inputRef = useRef();
  const [userList, setUserList] = useState([{}]);
  const [inputName, setInputName] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios("http://localhost:3005/users");
      setUserList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (event) => {
    setInputName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setInputName("");
    try {
      await axios.post(
        "http://localhost:3005/users",
        JSON.stringify({ name: inputName })
      );
      console.log("User details submitted successfully!");
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
    fetchUsers();
  }, []);

  return (
    <>
      <div className="user-list">
        <form method="POST">
          <input
            type="text"
            placeholder="Enter Name"
            ref={inputRef}
            value={inputName}
            onChange={handleOnChange}
          />
          <button onClick={handleSubmit}>add name</button>
        </form>

        <hr />
        <h2>User List</h2>
        <ul>
          {userList.length > 0 &&
            userList.map((user, index) => <li key={index}>{user.name}</li>)}
        </ul>
        <hr />
      </div>
    </>
  );
}
