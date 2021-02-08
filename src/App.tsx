import TaskTable from 'Component/TaskTable';
import AppContext, { AppState, TodoItem } from 'Context/AppContext';
import classnames from 'classnames';
import { useState } from 'react';
import Task from 'Component/Task';

export default function App() {
	const [todos, setTodos] = useState<TodoItem[]>([
		{
			id: 0,
			text: 'Do Code Test',
			priority: 'normal',
			done: false,
		},
		{
			id: 1,
			text: 'Cook',
			priority: 'high',
			done: true,
		},
	]);

	const [adding, setAdding] = useState<boolean>(false);

	const state: AppState = {
		todos,
		addTodo: (item) => {
			let _todos = [...todos, item];
			setTodos(_todos);
		},
		deleteTodo: (id: number) => {
			let _todos = todos.filter((todo) => todo.id !== id);
			setTodos(_todos);
		},
		markComplete: (id: number) => {
			let _todos = todos.map((todo) =>
				todo.id !== id ? todo : Object.assign({}, todo, { done: true })
			);
			setTodos(_todos);
		},
	};

	return (
		<AppContext.Provider value={state}>
			<div className="container mx-auto p-8">
				<p>
					Total number of tasks:
					<span className="mx-2 text-green-500">{todos.length}</span>
				</p>
				<p>
					Completed tasks:
					<span className="mx-2 text-indigo-500">
						{todos.filter((todo) => todo.done).length}
					</span>
				</p>
				<>
					<button
						className={classnames(
							{ hidden: adding },
							'my-4 border-2 border-indigo-500 rounded-full font-bold text-indigo-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-indigo-500 hover:text-white mr-6'
						)}
						onClick={() => {
							setAdding(true);
						}}
					>
						Add +
					</button>
					<div
						className={classnames({ hidden: !adding }, 'max-w-xl')}
					>
						<Task
							onSuccess={() => {
								setAdding(false);
							}}
						/>
					</div>
				</>
				<TaskTable />
			</div>
		</AppContext.Provider>
	);
}
