import React, { useState } from "react";

//create your first component
const TodoList = () => {
	const [list, setList] = useState([]);
	const [currentTask, setCurrentTask] = useState("");

	fetch("https://assets.breatheco.de/apis/fake/todos/user/alesanchezr", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(resp => {
			console.log(resp.ok); // will be true if the response is successfull
			console.log(resp.status); // the status code = 200 or code = 400 etc.
			console.log(resp.text()); // will try return the exact result as string
			resp.text().then(value => {
				console.log("inside-promise");
				console.log(value);
			});
			return "resp.json()"; // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		})
		.then(data => {
			console.log("second then");
			//here is were your code should start after the fetch finishes
			console.log(data); //this will print on the console the exact object received from the server
		})
		.catch(error => {
			//error handling
			console.log(error);
		});

	function onkeydown(e) {
		if (e.key === "Enter") {
			addItem();
		}
	}

	function addItem() {
		const newList = [...list, { label: currentTask, done: false }];
		setList(newList);
	}

	function toggleStatus(index) {
		const newList = list.map((item, key) => {
			if (key === index) {
				const updatedItem = {
					...item,
					done: !item.done
				};

				return updatedItem;
			}

			return item;
		});
		setList(newList);
	}

	function eliminar(index) {
		const newList = list.filter((item, key) => key !== index);
		setList(newList);
	}

	return (
		<div className="card">
			<div className="form">
				<input
					type="text"
					placeholder="Añadir tarea"
					onChange={e => {
						setCurrentTask(e.target.value);
					}}
					onKeyDown={onkeydown}
					value={currentTask}
				/>
				<button type="button" onClick={() => addItem()}>
					Add
				</button>
			</div>
			{list.map((item, index) => (
				<div className="item" key={index}>
					<p>
						Tarea {index + 1} : {item.label}
					</p>
					<div className="footer">
						<label onClick={() => toggleStatus(index)}>
							Status: {item.done ? "Terminado" : "Incompleto"}
						</label>
						<button type="button" onClick={() => eliminar(index)}>
							Eliminar
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default TodoList;
