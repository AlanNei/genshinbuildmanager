import { characterMap } from "../../data/genshinData";
import "./CharacterHeader.css";

function CharacterHeader({ character, uid }) {
  const characterInfo = characterMap[character.avatarId];
  const level = character.propMap?.["4001"]?.val || 1;
  const unlockedConstellations = character.talentIdList?.length || 0;

  return (
    <div className="character-header-card">
      {/* Left strip — Constellations */}
      <div className="constellations-column">
        {characterInfo.constellations.map((icon, index) => (
          <div
            key={index}
            className={`constellation ${index < unlockedConstellations ? "unlocked" : "locked"}`}
          >
            <img src={icon} alt={`Constellation ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Avatar */}
      <div className="ch-profile-center">
        <img
          className="ch-profile-photo"
          src={characterInfo.icon}
          alt={characterInfo.name}
        />
      </div>

      {/* Name + info */}
      <div className="character-header-name">
        <div className="ch-name-info">
          <h2>{characterInfo.name}</h2>
          <div className="ch-info-row">
            <span className="ch-label">Level</span>
            <span className="ch-value">{level}</span>
          </div>
          <div className="ch-info-row">
            <span className="ch-label">Constellation</span>
            <span className="ch-value">C{unlockedConstellations}</span>
          </div>
        </div>
        <p className="character-header-uid">UID: {uid}</p>
      </div>

      {/* Right strip — Skills */}
      <div className="skills-column">
        {character.skillLevelMap &&
          Object.entries(character.skillLevelMap).map(([skillId, skillLevel]) => {
            const icon = characterInfo.skills?.[Number(skillId)];
            if (!icon) return null;
            return (
              <div key={skillId} className="skill">
                <div className="skill-icon-wrap">
                  <img src={icon} alt="skill" />
                </div>
                <span>{skillLevel}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CharacterHeader;