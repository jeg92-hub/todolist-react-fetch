import React, { useState, useEffect } from "react";

const URL = "https://assets.breatheco.de/apis/fake/todos/user/alesanchezr";

//create your first component
const TodoList = () => {
	const [list, setList] = useState([]);
	const [currentTask, setCurrentTask] = useState("");

	useEffect(() => {
		fetch(URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				console.log(response);
				return response.json();
			})
			.then(data => {
				const newList = data;
				setList(newList);
			});
	}, []);

	function onkeydown(e) {
		if (e.key === "Enter") {
			addItem();
		}
	}

	function actionList(newList) {
		fetch(URL, {
			method: 'PUT',
			mode: "cors",
			body: JSON.stringify(newList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				//console.log(response);
				if (response.ok) {
					setList(newList);
				}

				return response.json();
				//return response.json();
			})
			.then(data => alert(data.result));
	}

	function addItem() {
		if (currentTask !== "") {
			const newItem = { label: currentTask, done: false };
			const newList = [...list, newItem];
			/*setList(newList);*/
			actionList(newList);
		} else {
			alert("Rellenar el input");
		}
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
		actionList(newList);
	}

	function eliminar(index) {
		const newList = list.filter((item, key) => key !== index);
		actionList(newList);
	}

	function clean() {
		setList([]);
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
				<button type="button" onClick={() => clean()}>
					Clean
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
