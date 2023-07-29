import Player from "components/player";
import API from "../api/api";
import { PlayerCreature, SimplePosition } from "../models/models";
import { ReplaySubject } from "rxjs";

class PlayerService {
  api = API();

  currentPlayer$ = new ReplaySubject<PlayerCreature>(1);
  players$ = new ReplaySubject<PlayerCreature[]>(1);

  currentPlayer: PlayerCreature | undefined;

  constructor() {
    this.preFetchPlayerData();
    this.currentPlayer$.subscribe((cPlayer) => {
      this.currentPlayer = cPlayer;
    });
  }

  fetchPlayerPosition = async (id: string): Promise<SimplePosition> => {
    const fetchedPlayer = await this.api.fetchPlayer(id, ["x", "y"]);
    if (!fetchedPlayer) {
      throw Error("Player was not found");
    }
    return { x: fetchedPlayer?.x, y: fetchedPlayer?.y };
  };

  preFetchPlayerData = async () => {
    const fetchedPlayers = await this.api.fetchPlayers(10, "", [
      "id",
      "name",
      "initiative",
    ]);
    if (!fetchedPlayers) {
      console.error("No Players Fetched, aborting");
      return;
    }

    const playerWithHighestInitiative = fetchedPlayers.reduce<PlayerCreature>(
      (result: PlayerCreature, player: PlayerCreature) => {
        if (!player.initiative) {
          return result;
        }
        return player.initiative > (result.initiative ?? 0) ? player : result;
      },
      {} as PlayerCreature
    );

    this.currentPlayer =
      playerWithHighestInitiative.id !== undefined
        ? playerWithHighestInitiative
        : fetchedPlayers[0];

    const position = await this.fetchPlayerPosition(this.currentPlayer.id);
    if (position) {
      this.currentPlayer$.next({ ...this.currentPlayer, ...position });
    } else {
      throw Error("The selected player has no position, aborting!");
    }

    this.players$.next(fetchedPlayers);
  };
}

export default PlayerService;
