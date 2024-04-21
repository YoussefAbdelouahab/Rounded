import axios from "axios"

export default function GetAgents(setAgents: any){
    if (typeof window !== 'undefined') {
        try {
            axios.get(`http://localhost:8000/api/calls/`)
                .then((res) => {
                    setAgents(res.data);
                })
        } catch (error) {
            console.log(error)
        }
    }
}