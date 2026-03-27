import { useState } from "react";
import { UIDInput, PlayerProfile, CharacterList} from "./components";
import { fetchPlayer } from "./services/enkaApi";


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
  );
}

export default App
