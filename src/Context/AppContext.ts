import { createContext } from 'react';

export type TodoPriority = 'normal' | 'high';

export interface TodoItem {
	id: number;
	text: string;
	done: boolean;
	priority: TodoPriority;
}

export interface AppState {
	todos: TodoItem[];
	addTodo?: (item: TodoItem) => void;
	deleteTodo?: (id: number) => void;
	markComplete?: (id: number) => void;
}

const AppContext = createContext<AppState>({ todos: [] });

export default AppContext;
