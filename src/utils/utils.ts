import { PlayerCreature } from "models/models";

const utils = () => {
  const positionsAreValid = (player: Partial<PlayerCreature>) =>
    typeof player.x !== "number" ||
    !isFinite(player.x) ||
    typeof player.y !== "number" ||
    !player.y;

  return {
    positionsAreValid,
  };
};

export default utils;
