import { useState } from "react";
import "./UIDInput.css";

//Aqui hago una props
type UIDInputProps = {
    //esto es un evento
    onSearch: (uid: string) => void;
};

function UIDInput({ onSearch }: UIDInputProps) {
    const [uid, setUid] = useState("");

    function handleSearch() {
        onSearch(uid);
    }

    return (
        <div>
            <input 
            type="text"
            placeholder="Enter UID" 
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            />
        

        <button onClick={handleSearch}>
            Search
        </button>
        </div>
    );
}

export default UIDInput;