import characters from "./avatars.json";
import locs from "./locs.json"
import loc from "./loc.json";
import pfps from "./pfps.json";
import weapons from "./weapons.json";
import relics from "./relics.json";

// ============================================
// TYPE DEFINITIONS
// ============================================

type CharacterInfo = {
    name: string;
    icon: string;
    skills: Record<number, string>;
    constellations: string[];
};

type WeaponInfo = {
    name: string;
    icon: string;
    rarity: number;
    weaponType: string;
    baseProps: Record<string, number>;
};

type RelicInfo = {
    name: string;
    icon: string;
    rarity: number;
    equipType: string; // 0=Flower, 1=Feather, 2=Sands, 3=Goblet, 4=Circlet
    setId: number;
};

// ============================================
// MAPS EXPORT
// ============================================

export const characterMap: Record<number, CharacterInfo> = {};
export const pfpMap: Record<number, CharacterInfo> = {};
export const weaponMap: Record<number, WeaponInfo> = {};
export const relicMap: Record<number, RelicInfo> = {};
export const relicSetMap: Record<number, { name: string; setId: number }> = {};

// Mapping de EquipType a nombres legibles
const equipTypeNames: Record<number, string> = {
    0: "Flower",
    1: "Feather",
    2: "Sands",
    3: "Goblet",
    4: "Circlet"
};

// Mapping de WeaponType a nombres legibles
const weaponTypeNames: Record<number, string> = {
    1: "Sword",
    2: "Claymore",
    4: "Polearm",
    10: "Bow",
    20: "Catalyst"
};

const language = "en";

// ============================================
// POPULATE CHARACTER MAP
// ============================================

Object.entries(characters).forEach(([id, character]: any) => {
    const nameHash = character.NameTextMapHash;
    const name =
        locs[language]?.[nameHash] ||
        loc[language]?.[nameHash] ||
        `Character ${id}`;

    if (!character.SideIconName) return;
    const icon = character.SideIconName.replace("_Side", "");

    // Populate skill icons
    const skills: Record<number, string> = {};
    if (character.Skills) {
        Object.entries(character.Skills).forEach(([skillId, iconName]: any) => {
            skills[Number(skillId)] = `https://enka.network/ui/${iconName}.png`;
        });
    }

    // Constellations
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

// ============================================
// POPULATE PROFILE PICTURE MAP
// ============================================

Object.entries(pfps).forEach(([id, pfp]: any) => {
    const icon = pfp.IconPath;

    pfpMap[Number(id)] = {
        name: "Profile Picture",
        icon: `https://enka.network/ui/${icon}.png`,
    }
});

// ============================================
// POPULATE WEAPON MAP
// ============================================

Object.entries(weapons).forEach(([id, weapon]: any) => {
    const nameHash = weapon.NameTextMapHash;
    const name =
        locs[language]?.[nameHash] ||
        loc[language]?.[nameHash] ||
        `Weapon ${id}`;

    const icon = weapon.Icon || weapon.AwakenIcon || "";
    const weaponType = weaponTypeNames[weapon.WeaponType] || "Unknown";
    const rarity = weapon.Rarity || 1;

    // BaseProps: { "4": 23.245 } → { "atk": 23.245 }
    // "4" es el ID de ATK base
    const baseProps = weapon.BaseProps || {};

    weaponMap[Number(id)] = {
        name,
        icon: icon ? `https://enka.network/ui/${icon}.png` : "",
        rarity,
        weaponType,
        baseProps,
    };
});

// ============================================
// POPULATE RELIC SETS MAP
// ============================================

const relicSets = relics.Sets || {};

Object.entries(relicSets).forEach(([setId, setData]: any) => {
  const nameHash = setData.Name;
  const name =
    locs[language]?.[nameHash] ||
    loc[language]?.[nameHash] ||
    `Set ${setId}`;

  relicSetMap[Number(setId)] = {
    name,
    setId: Number(setId),
  };
});

// ============================================
// POPULATE RELIC MAP
// ============================================

const relicsData = relics.Items || {};

Object.entries(relicsData).forEach(([id, relic]: any) => {
  const icon = relic.Icon || "";
  const equipType = equipTypeNames[relic.EquipType] || "Unknown";
  const rarity = relic.Rarity || 1;
  const setId = relic.SetId || 0;

  relicMap[Number(id)] = {
    name: `Relic ${id}`,
    icon: icon ? `https://enka.network/ui/${icon}.png` : "",
    rarity,
    equipType,
    setId,
  };
});



// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Obtiene el nombre de un arma por su ID
 */
export function getWeaponName(weaponId: number): string {
    return weaponMap[weaponId]?.name || `Weapon ${weaponId}`;
}

/**
 * Obtiene el icono de un arma por su ID
 */
export function getWeaponIcon(weaponId: number): string {
    return weaponMap[weaponId]?.icon || "";
}

/**
 * Obtiene el tipo de arma (Sword, Bow, etc.)
 */
export function getWeaponType(weaponId: number): string {
    return weaponMap[weaponId]?.weaponType || "Unknown";
}

/**
 * Obtiene la rareza de un arma
 */
export function getWeaponRarity(weaponId: number): number {
    return weaponMap[weaponId]?.rarity || 1;
}

/**
 * Obtiene el nombre de un reliquia por su ID
 */
export function getRelicName(relicId: number): string {
    return relicMap[relicId]?.name || `Relic ${relicId}`;
}

/**
 * Obtiene el icono de un reliquia por su ID
 */
export function getRelicIcon(relicId: number): string {
    return relicMap[relicId]?.icon || "";
}

/**
 * Obtiene el tipo de slot (Flower, Feather, etc.)
 */
export function getRelicEquipType(relicId: number): string {
    return relicMap[relicId]?.equipType || "Unknown";
}

/**
 * Obtiene la rareza de un reliquia
 */
export function getRelicRarity(relicId: number): number {
    return relicMap[relicId]?.rarity || 1;
}

/**
 * Obtiene el SetId de un reliquia
 */
export function getRelicSetId(relicId: number): number {
    return relicMap[relicId]?.setId || 0;
}

export function getRelicSetName(setId: number): string {
  return relicSetMap[setId]?.name || `Set ${setId}`;
}