import "./CharacterList.css";

type CharacterListProps = {
  characters: any[];
};

function CharacterList({ characters }: CharacterListProps) {

  return (
    <div>
      {characters.map((character, index) => (
        <p key={index}>
          {character.avatarId}
        </p>
      ))}
    </div>
  );
}

export default CharacterList;