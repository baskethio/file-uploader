import { useState } from "react";
import "./App.css";
import { FileInput, Button, Center } from "@mantine/core";
import axios from "axios";

const SERVER_URL = "http://localhost:5000";

function App() {
	const [file, setFile] = useState<File | null>();

	const uploadFile = () => {
		if (file) {
			const formData = new FormData();
			formData.append("file", file);
			axios
				.post(`${SERVER_URL}/files`, formData)
				.then((response) => {})
				.catch((error) => {});
		}
	};

	return (
		<div>
			<h3>File upload</h3>
			<Center>
				<FileInput placeholder="Pick file" onChange={setFile} />
				<Button onClick={uploadFile}>Upload</Button>
			</Center>
		</div>
	);
}

export default App;
