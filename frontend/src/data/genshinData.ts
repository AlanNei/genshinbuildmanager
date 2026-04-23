import characters from "./avatars.json";
import locs from "./locs.json"
import pfps from "./pfps.json";
import loc from "./loc.json";

type CharacterInfo = {
    name: string;
    icon: string;
    skills: Record<number, string>;
    constellations: string[];
};

export const characterMap: Record<number, CharacterInfo> = {};
export const pfpMap: Record<number, CharacterInfo> = {};

const language = "en";

// Populate character map
Object.entries(characters).forEach(([id, character]: any) => {
    const nameHash = character.NameTextMapHash;
    const name =
        locs[language]?.[nameHash] ||
        loc[language]?.[nameHash] ||
        nameHash;

    if (!character.SideIconName) return;
    const icon = character.SideIconName.replace("_Side", "");

    // Populate skill icons
    const skills: Record<number, string> = {};
    if (character.Skills) {
        Object.entries(character.Skills).forEach(([skillId, iconName]: any) => {
            skills[Number(skillId)] = `https://enka.network/ui/${iconName}.png`;
        });
    }

    // Constelaciones
    const constellations: string[] = [];
    if (character.Consts) {
        character.Consts.forEach((iconName: string) => {
            constellations.push(`https://enka.network/ui/${iconName}.png`);
            }); 
    }

    characterMap[Number(id)] = {
        name,
        icon: `https://enka.network/ui/${icon}.png`,
        skills,
        constellations,
    };
});

// Populate profile picture map
Object.entries(pfps).forEach(([id, pfp]: any) => {
    const icon = pfp.IconPath;

    pfpMap[Number(id)] = {
        name: "Profile Picture",
        icon: `https://enka.network/ui/${icon}.png`,
    }
});