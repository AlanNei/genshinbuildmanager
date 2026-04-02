import { useLocation } from "react-router-dom";
import { CharacterHeader, CharacterStats, CharacterWeapon, CharacterArtifacts } from "../components";

function CharacterPage() {

    const location = useLocation();
    const {character} = location.state

    return(
        <div>
            {/*Informacion del personaje*/}
            <CharacterHeader character={character}/>

            {/*Main Stats del personaje*/}
            <CharacterStats character={character}/>

            {/*Arma equipada*/}
            <CharacterWeapon character={character}/>

            {/*Artefactos equipados*/}
            <CharacterArtifacts character={character}/>

        </div>
        
    );
}

export default CharacterPage;