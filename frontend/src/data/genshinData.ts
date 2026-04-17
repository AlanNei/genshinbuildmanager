import characters from "./avatars.json";
import locs from "./locs.json"
import pfps from "./pfps.json";
import loc from "./loc.json";

type CharacterInfo = {
    name: string;
    icon: string;
};

export const characterMap: Record<number, CharacterInfo> = {};
export const pfpMap: Record<number, CharacterInfo> = {};

const language = "en";

Object.entries(characters).forEach(([id, character]: any) => {
    const nameHash = character.NameTextMapHash;
    const name =
        locs[language]?.[nameHash] ||
        loc[language]?.[nameHash] ||
        nameHash;
    if (!character.SideIconName) return;
    const icon = character.SideIconName.replace("_Side", "");

    characterMap[Number(id)] = {
        name,
        icon: `https://enka.network/ui/${icon}.png`
    };
});

Object.entries(pfps).forEach(([id, pfp]: any) => {
    const icon = pfp.IconPath;

    pfpMap[Number(id)] = {
        name: "Profile Picture",
        icon: `https://enka.network/ui/${icon}.png`,
    }
});