    import { characterMap,} from "../../data/genshinData";
    import "./CharacterHeader.css";

function CharacterHeader({ character, uid }) {
  const characterInfo = characterMap[character.avatarId];
  const level = character.propMap?.["4001"]?.val || 1;
  const unlockedConstellations = character.talentIdList?.length || 0;

  return (
    <div className="character-header-card">

      <div className="character-header-name">
        <h2>{characterInfo.name}</h2>
        <p>Lv. {level}</p>
      </div>

      <div className="character-header-body">

        {/* Columna izquierda — constelaciones */}
        <div className="constellations-column">
          {characterInfo.constellations.map((icon, index) => (
            <div key={index} className={`constellation ${index < unlockedConstellations ? "unlocked" : "locked"}`}>
              <img src={icon} alt={`Constelación ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Centro — foto de perfil */}
        <div className="ch-profile-center">
          <img className="ch-profile-photo" src={characterInfo.icon} alt={characterInfo.name} />
        </div>

        {/* Columna derecha — talentos */}
        <div className="skills-column">
          {character.skillLevelMap &&
            Object.entries(character.skillLevelMap).map(([skillId, level]) => {
              const icon = characterInfo.skills?.[Number(skillId)];
              if (!icon) return null;
              return (
                <div key={skillId} className="skill">
                  <img src={icon} alt="skill" />
                  <span>{level}</span>
                </div>
              );
            })}
        </div>

      </div>

      <p className="character-header-uid">UID: {uid}</p>


    </div>
  );
}

    export default CharacterHeader;