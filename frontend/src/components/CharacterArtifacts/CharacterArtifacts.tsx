import { statMap } from "../../utils/statMap";
import loc from "../../data/loc.json";

function CharacterArtifacts({character}) {

    //Para mostrar los artefactos
    const artifacts = character.equipList.filter(
        item => item.flat?.reliquaryMainstat
    );

    //Contar los sets
    const setCounts ={};
    artifacts.forEach(artifact=>{
        const setName = artifact.flat.setNameTextMapHash;

        if (!setCounts[setName]){
            setCounts[setName] = 0;
        }
        setCounts[setName]++;
    });

    return(
        <div>
            {Object.entries(setCounts).map(([set, count])=>{
                if (count >= 2){
                    return (
                        <p key={set}>
                            {loc.en[set] || set}: {count}pc
                        </p>
                    );
                }    
            })}
            <h1>Artifacts</h1>
            {artifacts?.map((artifact)=>(
                <div key={artifact.itemId}>
                    <img src={`https://enka.network/ui/${artifact.flat.icon}.png`}/>
                    <p>
                        Level: +{(artifact.reliquary.level)-1} 
                    </p>
                    <h2>Main Stat</h2>
                    <p>
                        {statMap[artifact.flat.reliquaryMainstat.mainPropId]}: {artifact.flat.reliquaryMainstat.statValue}
                    </p>
                    <h2>SubStats</h2>
                    {artifact.flat.reliquarySubstats?.map((sub) => (
                        <div key={sub.appendPropId}>
                            <p>
                                {statMap[sub.appendPropId]}: {sub.statValue}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

}

export default CharacterArtifacts;