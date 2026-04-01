import "./PlayerProfile.css";
import { characterMap } from "../../data/genshinData";

type PlayerProfileProps = {
    player: any;
};

function PlayerProfile({ player }: PlayerProfileProps) {
    const avatarId = player.profilePicture.avatarId;
    const character = characterMap[avatarId];

    return(
        <div>
            <img src={character?.icon} 
            alt={character?.name} 
            />
            <h2>{player.nickname}</h2>
            <p>AR: {player.level}</p>
            <p>{player.signature}</p>
        </div>
    );
}

export default PlayerProfile;