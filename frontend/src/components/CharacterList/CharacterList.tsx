import "./CharacterList.css";
import { characterMap } from "../../data/genshinData";

type CharacterListProps = {
  characters: {avatarId: number}[];
};

function CharacterList({ characters }: CharacterListProps) {

  return (
    <div>
      {characters.map((character) => {
        const info = characterMap[character.avatarId];

        return (
          <div key={character.avatarId}>

            <img
              src={info?.icon}
              alt={info?.name}
            />

            <p>{info?.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default CharacterList;