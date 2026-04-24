import "./UIDInput.css";

type UIDInputProps = {
  uid: string;
  setUid: (uid: string) => void;
  onSearch: (uid: string) => void;
};

function UIDInput({ uid, setUid, onSearch }: UIDInputProps) {

    function handleSearch() {
        onSearch(uid);
    }

    const handleKeyDown = (e: React.KeyboardEvent)=>{
        if (e.key === "Enter") handleSearch();
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="input-text">
                Enter your Genshin Impact UID to start
            </div>
            <div className="input-container">
                <input 
                type="text"
                placeholder="Enter UID..." 
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                onKeyDown={handleKeyDown}
                />
            
            <button onClick={handleSearch}>
                &#10095;
            </button>
            </div>
            <div className="input-hint">
                <span className="hint-icon">i</span> 
                Find it in-game: Paimon Menu → bottom right corner
            </div>
        </div>
    );
}

export default UIDInput;