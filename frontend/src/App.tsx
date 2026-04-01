import { useState } from "react";
import { UIDInput, PlayerProfile, CharacterList} from "./components";
import { fetchPlayer } from "./services/enkaApi";
import { Routes, Route } from "react-router-dom";
import CharacterPage from "./pages/CharacterPage";


function App() {
  //guarda la UID del jugador
  const [uid,setUid] = useState("");
  //guarda la informacion del jugador
  const [playerData, setPlayerData] = useState<any>(null);

  //Recibe el uid que escribe el usuario y se guarda en handlesearch
  async function handleSearch(uid: string) {
    setUid(uid);
    try {
      const data = await fetchPlayer(uid);
      setPlayerData(data);
    } 
    catch (error) {
      console.error("Error:",error); 
    }
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <UIDInput onSearch={handleSearch} />

            {playerData && (
              <>
                <PlayerProfile player={playerData.playerInfo} />

                {playerData.avatarInfoList && (
                  <CharacterList characters={playerData.avatarInfoList} />
                )}
              </>
            )}
          </>
        }
      />
      <Route path="/character/:id" element={<CharacterPage />} />
    </Routes>
  );
}

export default App
