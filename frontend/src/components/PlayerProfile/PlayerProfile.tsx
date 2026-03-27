import "./PlayerProfile.css";

type PlayerProfileProps = {
    player: any;
};

function PlayerProfile({ player }: PlayerProfileProps) {
    return(
        <div>
            <h2>{player.nickname}</h2>
            <p>AR: {player.level}</p>
            <p>{player.signature}</p>
        </div>
    );
}

export default PlayerProfile;