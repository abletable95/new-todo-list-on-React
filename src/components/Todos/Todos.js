import "./Todos.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  markTodoDone,
  filterTodos,
  GET_TODOS_REQUEST,
} from "../../store/actions/todosActions";
import { searchTodos, clearSearch } from "../../store/actions/searchActions";

import { List, Button, Input, Switch, Radio } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import uuid from "react-uuid";

const style = {
  completed: {
    textDecoration: "line-through",
    background: "rgb(178, 255, 133)",
  },
  important: {
    background: "rgb(255, 208, 208)",
  },
};

export function Todos() {
  const [text, setText] = useState("");
  const [important, setImportant] = useState(false);
  const [filterValue, setFilterValue] = useState("done");

  const dispatch = useDispatch();
  const { Search } = Input;
  const items = useSelector((state) => state.todos);
  const results = useSelector((state) => state.searchResults);

  // handling todos
  const checkImportant = (checked) => {
    setImportant(checked);
  };
  const handleAdd = (text) => {
    dispatch(
      addTodo({
        id: uuid(),
        title: text,
        completed: false,
        important: important,
      })
    );
    dispatch(filterTodos(filterValue));
    setText("");
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleChecked = (item) => {
    dispatch(markTodoDone(item));
  };

  // search haldle
  const search = (text) => {
    dispatch(clearSearch());
    dispatch(searchTodos({ items, text }));
  };

  const filter = (e) => {
    setFilterValue(e.target.value);
  };

  // setting todos order
  useEffect(() => {
    dispatch(filterTodos(filterValue));
  }, [filterValue, items.length]);

  const fetch = () => {
    dispatch({
      type: GET_TODOS_REQUEST,
    });
  };

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
        <Button onClick={() => fetch()}>Load todos</Button>
        <Radio.Group onChange={filter} value={filterValue}>
          <Radio value="done">Не завершенные</Radio>
          <Radio value="important">Важные</Radio>
          <Radio value="completed">Завершенные</Radio>
        </Radio.Group>
        <List
          size="large"
          bordered
          dataSource={results.length === 0 ? items : results}
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
              style={
                item.completed
                  ? style.completed
                  : null || item.important
                  ? style.important
                  : null
              }
            >
              {item.important ? (
                <ThunderboltOutlined className="importantIcon" />
              ) : null}
              {item.title}
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
        <div className="switch">
          <span>Important</span>
          <Switch className="importantSwitch" onChange={checkImportant} />
        </div>
      </div>
    </>
  );
}
