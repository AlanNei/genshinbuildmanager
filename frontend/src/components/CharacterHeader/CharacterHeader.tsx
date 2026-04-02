import { characterMap } from "../../data/genshinData";

function CharacterHeader({character}){
    const characterInfo = characterMap[character.avatarId];

    return(
        <div>
            <h1>{characterInfo.name}</h1>
            <img src={characterInfo.icon} alt={characterInfo.name} />
            <p>C{character.talentIdList?.length || 0}</p>
        </div>
    );
}

export default CharacterHeader;