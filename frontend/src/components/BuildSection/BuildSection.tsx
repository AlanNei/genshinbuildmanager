import { CharacterStats, CharacterWeapon, CharacterArtifacts, CharacterHeader } from "..";
import "./BuildSection.css";

function BuildSection({ character }) {
    return (
        <div className="build-container">
            <div>
                <CharacterHeader character={character} />
            </div>

            <div className="card">
                <CharacterStats character={character} />
            </div>

            <div className="card">
                <CharacterWeapon character={character} />
            </div>

            <div className="card">
                <CharacterArtifacts character={character} />
            </div>
        </div>
    );
}

export default BuildSection;