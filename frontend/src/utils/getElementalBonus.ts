const elementalProps = {
  "30": "Physical",
  "40": "Pyro",
  "41": "Electro",
  "42": "Hydro",
  "43": "Dendro",
  "44": "Anemo",
  "45": "Geo",
  "46": "Cryo"
};

export function getElementalBonus(fightPropMap: any) {
  for (const id in elementalProps) {
    const value = fightPropMap[id];
    if (value && value > 0) {
      return {
        element: elementalProps[id],
        value: value
      };
    }
  }

  return null;
}