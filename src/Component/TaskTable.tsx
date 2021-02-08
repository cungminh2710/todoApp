import AppContext from 'Context/AppContext';
import classnames from 'classnames';
import { useContext, useState } from 'react';

const TaskTable = () => {
	const { todos, markComplete, deleteTodo } = useContext(AppContext);
	const [taskSortOrder, setTaskSortOrder] = useState<number>(0);
	const [prioritySortOrder, setPrioritySortOrder] = useState<number>(0);
	const sortOrderText: { [key: number]: string } = {
		0: '', // nothing
		1: '↑', // ascending
		2: '↓', // descending
	};
	const sortOrderMultiplier: { [key: number]: number } = {
		0: 0,
		1: 1,
		2: -1,
	};

	const items =
		taskSortOrder !== 0
			? [...todos].sort((a, b) => { // Sort by Task name
					if (a.text < b.text)
						return -1 * sortOrderMultiplier[taskSortOrder];
					else if (a.text > b.text)
						return 1 * sortOrderMultiplier[taskSortOrder];
					else return 0;
			  })
			: prioritySortOrder !== 0
			? [...todos].sort((a, b) => { // Sort by Priority Name
					if (a.priority < b.priority)
						return -1 * sortOrderMultiplier[prioritySortOrder];
					else if (a.priority > b.priority)
						return 1 * sortOrderMultiplier[prioritySortOrder];
					else return 0;
			  })
			: todos;

	return (
		<div className="flex flex-col">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
										onClick={() => {
											setPrioritySortOrder(0);
											setTaskSortOrder(
												(taskSortOrder + 1) % 3
											);
										}}
									>
										Task
										<span className="opacity-50 mx-2">
											{sortOrderText[taskSortOrder]}
										</span>
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Status
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
										onClick={() => {
											setTaskSortOrder(0);
											setPrioritySortOrder(
												(prioritySortOrder + 1) % 3
											);
										}}
									>
										Prority
										<span className="opacity-50 mx-2">
											{sortOrderText[prioritySortOrder]}
										</span>
									</th>
									<th
										scope="col"
										className="relative px-6 py-3"
									>
										<span className="sr-only">
											Mark as Complete
										</span>
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{items.map((todo) => (
									<tr key={todo.id} className="group">
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center ">
												<div className="text-sm font-medium text-gray-500 group-hover:text-gray-900">
													{todo.text}
												</div>
												<button
													className="opacity-0 group-hover:opacity-30 mx-4 text-indigo-500"
													onClick={() => {
														deleteTodo &&
															deleteTodo(todo.id);
													}}
												>
													Delete
												</button>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={classnames(
													{
														'bg-green-100 text-green-800':
															todo.done,
														'bg-red-100 text-red-800': !todo.done,
													},
													'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
												)}
											>
												{todo.done ? 'Done' : 'Active'}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{todo.priority}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<button
												className={classnames(
													'text-indigo-600 hover:text-indigo-900',
													{ hidden: todo.done }
												)}
												onClick={() => {
													markComplete &&
														markComplete(todo.id);
												}}
											>
												Mark as Complete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TaskTable;
