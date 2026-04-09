import "./Header.css";

function Header({ uid }) {
  return (
    <header className="main-header">
      <div className="header-content">
        <h1 className="logo-text">Genshin Build Manager</h1>
        <div className="header-right">
        {uid && (<div className="uid-badge">{uid}</div>)}
        <button className="help-btn">?</button>
        </div>
      </div>
    </header>
  );
}

export default Header;