import "./Header.css";

type HeaderProps = {
  uid: string;
  setUid: (uid: string) => void;
  onSearch: (uid: string) => void;
  hasSearched: boolean;
};

function Header({ uid, setUid, onSearch, hasSearched }: HeaderProps) {
  function handleSearch() {
    onSearch(uid);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };
  return (
    <header className="main-header">
      <div className="header-content">
        <h1 className="logo-text">Genshin Build Manager</h1>
        <div className="header-right">
          {hasSearched &&(
          <div className="input-container-min">
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
          )}
        <button className="help-btn">?</button>
        </div>
      </div>
    </header>
  );
}

export default Header;