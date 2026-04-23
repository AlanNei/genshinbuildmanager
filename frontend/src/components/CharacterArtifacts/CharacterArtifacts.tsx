import { statMap } from "../../utils/statMap";
import "./CharacterArtifacts.css";

const isPercent = (propId?: string) =>
  propId?.includes("PERCENT") ||
  propId?.includes("CRITICAL") ||
  propId?.includes("CHARGE") ||
  propId?.includes("ADD_HURT");

function CharacterArtifacts({ character }) {
  const artifacts = character.equipList.filter(
    item => item.flat?.reliquaryMainstat
  );

  return (
    <div className="ca-card">
      {artifacts.map((artifact) => {
        const level = artifact.reliquary.level - 1;
        const main = artifact.flat.reliquaryMainstat;

        return (
          <div key={artifact.itemId} className="ca-artifact-row">

            <div className="ca-left">
              <img
                className="ca-icon"
                src={`https://enka.network/ui/${artifact.flat.icon}.png`}
                alt="artifact"
              />
              <p className="ca-main-value">
                {isPercent(main.mainPropId)
                  ? main.statValue.toFixed(1) + "%"
                  : main.statValue}
              </p>
              <p className="ca-stars">{"★".repeat(artifact.flat.rankLevel ?? 5)}</p>
              <p className="ca-level">+{level}</p>
            </div>

            <div className="ca-substats">
              {artifact.flat.reliquarySubstats?.map((sub) => (
                <div key={sub.appendPropId} className="ca-sub-row">
                  <span className="ca-sub-label">
                    {statMap[sub.appendPropId] || sub.appendPropId}
                  </span>
                  <span className="ca-sub-value">
                    +{isPercent(sub.appendPropId)
                      ? sub.statValue.toFixed(1) + "%"
                      : sub.statValue}
                  </span>
                </div>
              ))}
            </div>

          </div>
        );
      })}
    </div>
  );
}

export default CharacterArtifacts;