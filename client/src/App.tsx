import { useEffect, useState } from "react";
import "./App.css";
import { FileInput, Button, Center, Table } from "@mantine/core";
import axios from "axios";
import { FileType } from "./types/files";

const SERVER_URL = "http://localhost:5000";

function App() {
	const [file, setFile] = useState<File | null>(null);
	const [files, setFiles] = useState([]);

	const uploadFile = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (file) {
			let formData = new FormData();
			formData.append("file", file);
			axios
				.post(`${SERVER_URL}/files`, formData)
				.then((response) => {
					console.log(response);
					getFiles();
				})
				.catch((error) => {});
		}
	};

	const getFiles = () => {
		axios
			.get(`${SERVER_URL}/files`)
			.then((response) => {
				setFiles(response.data);
				console.log(files);
			})
			.catch((error) => {});
	};

	useEffect(() => {
		getFiles();
	}, []);

	return (
		<div>
			<h3>File upload</h3>
			<Center>
				<form onSubmit={uploadFile}>
					<FileInput placeholder="Pick file" onChange={setFile} />
					<Button type="submit">Upload</Button>
				</form>
			</Center>
			{
				<Table>
					<thead>
						<tr>
							<td>File name</td>
							<td>Size</td>
							<td>Upload Date</td>
						</tr>
					</thead>
					<tbody>
						{files.map((file: FileType) => (
							<tr key={file.file_id}>
								<td>{file.file_name}</td>
								<td>{file.file_size}</td>
								<td>{new Date(file.upload_date).toDateString()}</td>
							</tr>
						))}
					</tbody>
				</Table>
			}
		</div>
	);
}

export default App;
