import "./Todos.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  markTodoDone,
} from "../../store/actions/todosActions";
import { searchTodos, clearSearch } from "../../store/actions/searchActions";

import { List, Button, Input } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import uuid from "react-uuid";

const style = {
  // width: "800px",
  textDecoration: "line-through",
  background: "rgb(178, 255, 133)",
};

export function Todos() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { Search } = Input;
  const items = useSelector((state) => state.todos);
  const results = useSelector((state) => state.searchResults);
  // console.log('all', results)

  const handleAdd = (text) => {
    dispatch(
      addTodo({
        id: uuid(),
        text: text,
        done: false,
      })
    );
    setText("");
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleChecked = (item) => {
    dispatch(markTodoDone(item));
  };

  const search = (text) => {
    // const textToSearch = new RegExp(text, "i");
    // const search = items.filter((item) => {
    //   if (item.text.search(textToSearch) !== -1 && text != "") {
    //     console.log(item);
    //   }
    // });
    dispatch(clearSearch());
    dispatch(searchTodos({ items, text }));
    
  };
  console.log("found state", results);
  return (
    <>
      <div className="todosWrap">
        <Search
          placeholder="import search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={search}
          //style={style}
        />
        <List
          size="large"
          bordered
          dataSource={results.length === 0? items:results}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  icon={<CheckOutlined />}
                  onClick={() => handleChecked(item)}
                ></Button>,
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => handleDelete(item.id)}
                ></Button>,
              ]}
              onClick={() => console.log(item.id)}
              style={item.isDone ? style : null}
            >
              {item.text}
            </List.Item>
          )}
        />
        <Search
          placeholder="import task text"
          allowClear
          enterButton="Add"
          size="large"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onSearch={handleAdd}
          //style={style}
        />
      </div>
    </>
  );
}
