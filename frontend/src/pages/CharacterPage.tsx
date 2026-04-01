import { useLocation } from "react-router-dom";
import { characterMap } from "../data/genshinData";
import { getElementalBonus } from "../utils/getElementalBonus";
import {statMap} from "../utils/statMap";

function CharacterPage() {

    const location = useLocation();
    const {character} = location.state
    const characterInfo = characterMap[character.avatarId];
    const bonus = getElementalBonus(character.fightPropMap);

    //Para mostrar el arma
    const weapon = character.equipList.find(
        item => item.flat?.weaponStats
    );

    //Para mostrar los artefactos
    const artifacts = character.equipList.filter(
        item => item.flat?.reliquaryMainstat
    );

    return(
        <div>
            {/*Informacion del personaje*/}
            <h1>{characterInfo.name}</h1>
            <img src={characterInfo.icon} alt={characterInfo.name} />

            {/*Main Stats del personaje*/}
            <p>HP: {(character.fightPropMap["2000"]).toFixed(0)}</p>
            <p>ATK: {(character.fightPropMap["2001"]).toFixed(0)}</p>
            <p>DEF: {(character.fightPropMap["2002"]).toFixed(0)}</p>
            {character.fightPropMap["28"] > 0 && (
                <p>Elemental Mastery: {(character.fightPropMap["28"]).toFixed(0)}</p>
            )}
            <p>CRIT Rate: {(character.fightPropMap["20"]*100).toFixed(1)}%</p>
            <p>CRIT Damage: {(character.fightPropMap["22"]*100).toFixed(1)}%</p>
            <p>Energy Recharge: {(character.fightPropMap["23"]*100).toFixed(1)}%</p>
            {bonus && (
                <p>{bonus.element} DMG Bonus: {(bonus.value*100).toFixed(1)}%</p>
            )}

            {/*Arma equipada*/}
            {weapon && (
                <div>
                    <h2>Weapon</h2>
                    <img src={`https://enka.network/ui/${weapon.flat.icon}.png`}/>
                    <p>Level: {weapon.weapon.level}</p>
                </div>
            )}

            {/*Artefactos equipados*/}
            {artifacts.map((artifact)=>(
                <div key={artifact.itemId}>
                    <img src={`https://enka.network/ui/${artifact.flat.icon}.png`}/>
                    <p>
                        {statMap[artifact.flat.reliquaryMainstat.mainPropId]}: 
                        {artifact.flat.reliquaryMainstat.statValue}
                    </p>
                </div>
            ))}
        </div>
        
    );
}

export default CharacterPage;