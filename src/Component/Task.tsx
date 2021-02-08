import AppContext, { TodoItem } from 'Context/AppContext';
import { createRef, useContext } from 'react';

interface Props {
	onSuccess?: () => void;
}
const Task = (props: Props) => {
	const { addTodo } = useContext(AppContext);
	const { onSuccess } = props;
	const TaskTextRef = createRef<HTMLInputElement>();
	const TaskPriorityRef = createRef<HTMLSelectElement>();
	return (
		<div className="py-4">
			<label
				htmlFor="task"
				className="block text-sm font-medium text-gray-700"
			>
				New Task
			</label>
			<div className="mt-1 relative rounded-md shadow-sm">
				<input
					type="text"
					name="task"
					id="task"
					className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
					placeholder="Your task"
					ref={TaskTextRef}
					autoComplete='off'
				/>
				<div className="absolute inset-y-0 right-0 flex items-center">
					<label htmlFor="priority" className="sr-only">
						priority
					</label>
					<select
						id="priority"
						name="priority"
						ref={TaskPriorityRef}
						className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
					>
						<option>normal</option>
						<option>high</option>
					</select>
				</div>
			</div>
			<button
				className="my-4 border-2 border-indigo-500 rounded-full font-bold text-indigo-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-indigo-500 hover:text-white mr-6"
				onClick={() => {
					const text = TaskTextRef.current?.value;
					const priority = TaskPriorityRef.current?.value;
					if (
						text &&
						priority &&
						(priority === 'normal' || priority === 'high')
					) {
						const item: TodoItem = {
							id: Date.now(),
							text,
							priority,
							done: false,
						};
						addTodo && addTodo(item);
						onSuccess && onSuccess();
					}
				}}
			>
				Add +
			</button>
			<button
				className="my-4 border-2 border-red-500 rounded-full font-bold text-red-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-red-500 hover:text-white mr-6"
				onClick={onSuccess}
			>
				Cancel
			</button>
		</div>
	);
};

export default Task;
