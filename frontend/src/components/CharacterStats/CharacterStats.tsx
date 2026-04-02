import { getElementalBonus } from "../../utils/getElementalBonus";

function CharacterStats({character}) {
    const bonus = getElementalBonus(character.fightPropMap);

    return(
        <div>
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
        </div>
    );
}

export default CharacterStats;