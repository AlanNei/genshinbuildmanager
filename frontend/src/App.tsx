import { useState } from "react";
import { UIDInput, PlayerProfile, CharacterList, Header, Loading, ErrorMessage, BuildSection} from "./components";
import { fetchPlayer } from "./services/enkaApi";
import { Routes, Route } from "react-router-dom";
import "./App.css";


function App() {
  //guarda la UID del jugador
  const [uid,setUid] = useState("");
  //guarda la informacion del jugador
  const [playerData, setPlayerData] = useState(null);

  const [ loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  //Recibe el uid que escribe el usuario y se guarda en handlesearch
  async function handleSearch(uid: string) {
    setUid(uid);
    setError("");
    setLoading(true);

    try {
      const data = await fetchPlayer(uid);
      if (!data || !data.avatarInfoList) {
        throw new Error("No profile found. Please check the UID and try again.");
      };
      setPlayerData(data);
    } 
    catch (error) {
      setError("⚠ UID not found\nCheck if the profile is public");
      setPlayerData(null); 
    }
    setLoading(false);
  }
  
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header uid={uid} />
            <UIDInput onSearch={handleSearch} />

            {/*Cargando y errores */}
            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}

            {playerData && (
              <>
                <PlayerProfile player={playerData.playerInfo} />

                {playerData.avatarInfoList && (
                  <CharacterList 
                  characters={playerData.avatarInfoList} 
                  uid={uid}
                  onSelect={setSelectedCharacter} 
                  />
                )}
                {selectedCharacter && (
                  <BuildSection character={selectedCharacter} uid={uid} />
                )}
              </>
            )}
          </>
        }
      />
    </Routes>
  );
}

export default App
