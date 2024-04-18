import axios from 'axios';

export default function InitData() {
    axios.get("http://localhost:8000/api/init")
        .then(() => {
            console.log("Data Initialized");
        }).catch(async (error) => {
            console.error("Error:", error);
        });
}