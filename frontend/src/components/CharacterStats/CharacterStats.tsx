import { getElementalBonus } from "../../utils/getElementalBonus";
import { statMap } from "../../utils/statMap";
import locs from "../../data/locs.json";
import loc from "../../data/loc.json";
import "./CharacterStats.css";

const isPercent = (propId) =>
  propId?.includes("PERCENT") ||
  propId?.includes("CRITICAL") ||
  propId?.includes("CHARGE") ||
  propId?.includes("ADD_HURT");

function CharacterStats({ character }) {
  const bonus = getElementalBonus(character.fightPropMap);
  const weapon = character.equipList.find(item => item.flat?.weaponStats);
  const weaponName = locs.en?.[String(weapon.flat.nameTextMapHash)]
    || loc.en?.[String(weapon.flat.nameTextMapHash)]
    || "Unknown";
  const weaponMainStat = weapon.flat.weaponStats?.[0];
  const weaponSubStat  = weapon.flat.weaponStats?.[1];
  const refinement = weapon.weapon.affixMap
    ? Object.values(weapon.weapon.affixMap)[0] + 1
    : 1;

  const stats = [
    { label: "HP",              value: character.fightPropMap["2000"].toFixed(0) },
    { label: "CRIT Rate",       value: (character.fightPropMap["20"] * 100).toFixed(1) + "%" },
    { label: "ATK",             value: character.fightPropMap["2001"].toFixed(0) },
    { label: "CRIT DMG",        value: (character.fightPropMap["22"] * 100).toFixed(1) + "%" },
    { label: "DEF",             value: character.fightPropMap["2002"].toFixed(0) },
    { label: "Energy Recharge", value: (character.fightPropMap["23"] * 100).toFixed(1) + "%" },
    ...(character.fightPropMap["28"] > 0
      ? [
          { label: "Elemental Mastery", value: character.fightPropMap["28"].toFixed(0) },
          ...(bonus ? [{ label: `${bonus.element} DMG Bonus`, value: (bonus.value * 100).toFixed(1) + "%" }] : [{ label: "", value: "" }])
        ]
      : bonus
        ? [{ label: "", value: "" }, { label: `${bonus.element} DMG Bonus`, value: (bonus.value * 100).toFixed(1) + "%" }]
        : []
    ),
  ];

  const setCounts = {};
  character.equipList
    .filter(item => item.flat?.reliquaryMainstat)
    .forEach(artifact => {
      const setName = artifact.flat.setNameTextMapHash;
      if (!setCounts[setName]) setCounts[setName] = 0;
      setCounts[setName]++;
    });

  return (
    <div className="cs-card">
      {weapon && (
        <div className="cs-top">
          <img
            className="cs-weapon-icon"
            src={`https://enka.network/ui/${weapon.flat.icon}.png`}
            alt={weaponName}
          />
          <div className="cs-weapon-info">
            <p className="cs-weapon-name">{weaponName}</p>
            <p className="cs-weapon-sub">R{refinement} · Lv. {weapon.weapon.level}</p>
            <p className="cs-weapon-sub">
              {statMap[weaponMainStat?.appendPropId] || weaponMainStat?.appendPropId}
              &nbsp;{isPercent(weaponMainStat?.appendPropId)
                ? weaponMainStat?.statValue.toFixed(1) + "%"
                : weaponMainStat?.statValue}
              {weaponSubStat && (<>
                &nbsp;·&nbsp;
                {statMap[weaponSubStat.appendPropId] || weaponSubStat.appendPropId}
                &nbsp;{isPercent(weaponSubStat.appendPropId)
                  ? weaponSubStat.statValue.toFixed(1) + "%"
                  : weaponSubStat.statValue}
              </>)}
            </p>
          </div>
        </div>
      )}

      <div className="cs-stats-grid">
        {stats.map(({ label, value }, i) => (
          <div key={i} className="cs-stat-row">
            <span className="cs-stat-label">{label}</span>
            <span className="cs-stat-value">{value}</span>
          </div>
        ))}
      </div>

      <div className="cs-artifact-set">
        {Object.entries(setCounts).map(([set, count]) => {
          if (count < 2) return null;
          const name = locs.en?.[set] || loc.en?.[set] || set;
          return <p key={set}>{name}: {count}pc</p>;
        })}
      </div>
    </div>
  );
}

export default CharacterStats;