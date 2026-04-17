import loc from "../../data/locs.json";

function CharacterWeapon({character}) {
    //Para mostrar el arma
    const weapon = character.equipList.find(
        item => item.flat?.weaponStats
    );

    const weaponName = loc.en[String(weapon.flat.nameTextMapHash)];

    return(
        <div>
            {weapon && (
            <div>
                <h1>Weapon</h1>
                <img src={`https://enka.network/ui/${weapon.flat.icon}.png`}/>
                <p>{weaponName}</p>
                <p>Level: {weapon.weapon.level}</p>
            </div>
            )}
        </div>
    );
}

export default CharacterWeapon;