import "./PlayerProfile.css";
import { characterMap, pfpMap } from "../../data/genshinData";

type PlayerProfileProps = {
    player: any;
};

function PlayerProfile({ player }: PlayerProfileProps) {
    const avatarId = player.profilePicture?.avatarId ?? player.profilePicture?.id;

    let character = null;

    if (avatarId && characterMap[avatarId]){
        character = characterMap[avatarId];
    }
    else if (avatarId && pfpMap[avatarId]) {
        character = pfpMap[avatarId];
    }

    return(
        <div className="profile-card">
            <div className="avatar-wrapper">
                <img 
                    src={character?.icon} 
                    alt={character?.name} 
                    className="avatar-img"
                />
                <span className="ar-badge">AR {player.level}</span>
            </div>

            <div className="profile-info">
                <h2 className="profile-name">{player.nickname}</h2>
                <p className="profile-signature">{player.signature}</p>
            </div>
            <button className="refresh-btn">⟳ Refresh</button>
        </div>
    );
}

export default PlayerProfile;