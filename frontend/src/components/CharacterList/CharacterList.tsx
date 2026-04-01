import "./CharacterList.css";
import { characterMap } from "../../data/genshinData";
import { Link } from "react-router-dom";

type CharacterListProps = {
  characters: {avatarId: number}[];
};

function CharacterList({ characters }: CharacterListProps) {

  return (
    <div className="character-grid">
      {characters.map((character) => {
        const info = characterMap[character.avatarId];

        if (!info) return null;

        return (
          <Link
            key={character.avatarId}
            to= {`/character/${character.avatarId}`}
            state = {{character}}
            className="character-card"
            >
              <img
                src={info?.icon}
                alt={info?.name}
              />

              <p>{info?.name}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default CharacterList;