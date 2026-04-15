import "./CharacterList.css";
import { characterMap } from "../../data/genshinData";

type CharacterListProps = {
  characters: {avatarId: number}[];
  uid: string;
  onSelect: (character: {avatarId: number}) => void;
};

function CharacterList({ characters, uid, onSelect }: CharacterListProps) {

  return (
    <div className="character-grid">
      {characters.map((character) => {
        const info = characterMap[character.avatarId];

        if (!info) return null;

        return (
          <div
            key={character.avatarId}
            onClick={() => onSelect(character)}
            className="character-card"
            style={{cursor: "pointer"}}
            >
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