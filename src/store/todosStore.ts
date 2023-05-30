import { create } from "zustand";
interface ITodo {
  id: number;
  name: string;
  complete: boolean;
}
interface ISnippetStore {
  todos: ITodo[];
  addTodo: (todo: ITodo) => void;
  removeTodo: (id: number) => void;
  updateTodo: (todo: ITodo) => void;
}

export const useTodosStore = create<ISnippetStore>((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  removeTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
  updateTodo: (todo) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
    })),
}));
