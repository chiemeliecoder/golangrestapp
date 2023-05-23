//import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import {Box, List, ThemeIcon} from "@mantine/core";
import useSWR from "swr";
import './App.css';
import AddTodo from "./components/AddTodo.tsx";
import {ListItem} from "@mantine/core/lib/List/ListItem/ListItem";
import {CheckCircleFillIcon} from "@primer/octicons-react";
import {useDrawerContext} from "@mantine/core/lib/Drawer/Drawer.context";

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
  const {data, mutate} = useSWR<Todo []>('api/todos', fetcher);

  async function markTodoAdDone(id: number){
    const updated = await fetch(`${ENDPOINT}/api/todo/${id}/done`, {method: "PATCH",}).then((r) => r.json());
  }

  return( <Box sx={() => ({ padding: "2rem", width:'100%', maxWidth: "40 rem", margin: "0 auto",})}>
    <List spacing= "xs" size = "sm" mb={12} center>
    {data?.map((todo) => {
      return( <ListItem onClick={() => markTodoAdDone(todo.id)}key ={`todo__${todo.id}`}
      icon={todo.done ? (<ThemeIcon color="teal" size={24} radius="xl ">
        <CheckCircleFillIcon size={20}/>
      </ThemeIcon>) : (<ThemeIcon color="gray" size={24} radius="xl ">
        <CheckCircleFillIcon size={20}/>
      </ThemeIcon>)}>
      {todo.title}
  </ListItem>);
    })}
  </List>
    <AddTodo mutate ={mutate}/>
  </Box>);
    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
}

export default App;
