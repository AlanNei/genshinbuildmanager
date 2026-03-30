import characters from "./characters.json";
import textMap from "./TextMapEN.json";

type CharacterInfo = {
    name: string;
    icon: string;
};

export const characterMap: Record<number, CharacterInfo> = {};

Object.entries(characters).forEach(([id, character]: any) => {
    const nameHash = character.NameTextMapHash;
    const name = textMap[nameHash];

    if (!character.SideIconName) return;
    const icon = character.SideIconName.replace("_Side", "");

    characterMap[Number(id)] = {
        name,
        icon: `https://enka.network/ui/${icon}.png`
    };
});