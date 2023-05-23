//import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import {Box, List, ThemeIcon} from "@mantine/core";
import useSWR from "swr";
import './App.css';
import AddTodo from "./components/AddTodo.tsx";
import {CheckCircleFillIcon} from "@primer/octicons-react";


export interface Todo{
  id: number;
  title: string;
  body: string;
  done: boolean;
}


export const ENDPOINT = "http://localhost:5173";
const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((r)=> r.json())

function App() {
  //const [count, setCount] = useState(0)
  const {data, mutate} = useSWR<Todo[]>('api/todos', fetcher);

  async function markTodoAdDone(id: number){
    const updated = await fetch(`${ENDPOINT}/api/todo/${id}/done`, {method: "PATCH",}).then((r) => r.json());
    mutate(updated);

  }

  return( <Box sx={() => ({ padding: "2rem", width:"100%", maxWidth: "40rem", margin: "0 auto",})}>
    <List spacing= "xs" size = "sm" mb={12} center>
    {data?.map((todo) => {
      return( <List.Item onClick={() => markTodoAdDone(todo.id)} key ={`todo__${todo.id}`}
      icon={todo.done ? (<ThemeIcon color="teal" size={24} radius="xl ">
        <CheckCircleFillIcon size={20}/>
      </ThemeIcon>) : (<ThemeIcon color="gray" size={24} radius="xl ">
        <CheckCircleFillIcon size={20}/>
      </ThemeIcon>)}>
      {todo.title}
  </List.Item>);
    })}
  </List>
    <AddTodo mutate ={mutate}/>
  </Box>);
}

export default App;
