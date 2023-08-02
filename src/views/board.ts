import { Application, Container } from "pixi.js";
import { drawGrid } from "factories/grid.factory";
import {
  CHARACTER_CONFIGURATION,
  GRID_CONFIG,
  SPACE_CONFIG,
  STAGE_CONFIG,
} from "constants/config.constants";
import { PlayerCreature, SimplePosition } from "models/models";
import TraversableSpaces from "components/traversableSpaces";
import Player from "components/player";

import UKSelect, { UKOption } from "components/ukSelect";
import PlayerService from "services/PlayerService";
import UkTextInput from "components/ukTextInput";

class Board {
  private _app: Application<HTMLCanvasElement>;
  private _playerService: PlayerService;

  players: PlayerCreature[] = [];

  private cCharacter: Player | undefined;
  private oCharacters: Player[] = [];
  private cSpaces: TraversableSpaces | undefined;
  private cContainer: Container;

  constructor() {
    this.cContainer = new Container();
    this._app = new Application<HTMLCanvasElement>({
      width: STAGE_CONFIG.w,
      height: STAGE_CONFIG.h,
    });
    document.querySelector("#Stage")?.appendChild(this._app.view);
    const grid = drawGrid(GRID_CONFIG);
    this.cContainer.addChild(grid);
    this._app.stage.addChild(this.cContainer);

    this._playerService = new PlayerService();

    this._playerService.players$.subscribe((players: PlayerCreature[]) => {
      this.oCharacters.forEach((character) =>
        this.cContainer.removeChild(character.graphic)
      );
      this.oCharacters = [];
      if (players.length > 0) {
        players.forEach((player: PlayerCreature) => {
          if (player.id === this._playerService.currentPlayer?.id) {
            return;
          }
          const oCharacter = this.renderPlayer({ x: player.x, y: player.y });
          this.oCharacters.push(oCharacter);
          this.cContainer.addChild(oCharacter.graphic);
        });
      }
    });

    this._playerService.currentPlayer$.subscribe((data: PlayerCreature) => {
      console.log("cPlayer:", data);
      if (data) {
        if (this.cCharacter && this.cSpaces) {
          this.cContainer.removeChild(this.cCharacter.graphic);
          this.cContainer.removeChild(this.cSpaces.spaces);
        }
        this.cCharacter = this.renderPlayer({ x: data.x, y: data.y });
        // console.log(this.cCharacter);
        if (!this.cCharacter) {
          return;
        }
        this.cSpaces = this.renderTraversableSpaces(this.cCharacter, data);
        // console.log(this.cSpaces);
        if (!this.cSpaces) {
          return;
        }

        this.cContainer.addChild(this.cCharacter.graphic);
        this.cContainer.addChild(this.cSpaces.spaces);
      }
    });

    this.createForm();
  }

  createForm = () => {
    const UsernameInput = document.querySelector(
      "#Username"
    ) as HTMLInputElement;
    if (UsernameInput) {
      const ukUserNameInput = new UkTextInput({
        element: UsernameInput,
        onChange: (value: string) => {
          console.log(value);
        },
      });
    }

    this._playerService.players$.subscribe((fetchedPlayers) => {
      this.players = fetchedPlayers;
      const playerOptions = fetchedPlayers?.reduce<UKOption[]>(
        (options: UKOption[], player: PlayerCreature) => {
          const _opts = [...options];
          if (player.id && player.name && this._playerService.currentPlayer) {
            _opts.push({
              value: player.id,
              name: player.name,
              preSelect: player.id === this._playerService.currentPlayer.id,
            });
          }
          return _opts;
        },
        []
      );

      if (!playerOptions) {
        console.error("No Player Options were created, aborting build");
        return;
      }

      // console.log(playerOptions);

      const playerSelectElement = document.querySelector(
        "#PlayerSelect"
      ) as HTMLSelectElement;
      if (playerSelectElement) {
        const selectPlayerElement = new UKSelect({
          element: playerSelectElement,
          options: playerOptions,
        });
        selectPlayerElement.selected$.subscribe(async (selectedPlayer) => {
          const playerData = await this._playerService.fetchPlayerPosition(
            selectedPlayer.value
          );
          if (playerData) {
            this._playerService.currentPlayer$.next({
              id: selectedPlayer.value,
              name: selectedPlayer.name,
              ...playerData,
            } as PlayerCreature);
          }
        });
      }
    });
  };

  renderPlayer = (player: SimplePosition) => {
    const character = new Player(
      CHARACTER_CONFIGURATION,
      {
        x: (player.x - 1) * SPACE_CONFIG.w,
        y: (player.y - 1) * SPACE_CONFIG.h,
      },
      SPACE_CONFIG
    );

    return character;
  };

  renderTraversableSpaces = (
    playerGraphic: Player,
    player: SimplePosition & { id: string }
  ) => {
    const spaces = new TraversableSpaces({
      spaceConfig: SPACE_CONFIG,
      radiusInSquares: 3,
      onMove: (s: any, pos: SimplePosition) => {
        const relativePosition = {
          x: pos.x / SPACE_CONFIG.w + 1,
          y: pos.y / SPACE_CONFIG.h + 1,
        };
        playerGraphic.pos$.next({
          x: pos.x,
          y: pos.y,
        });
        s.center$.next(relativePosition);
        this._playerService.api.movePlayer(player.id, relativePosition);
      },
      center: { x: player.x, y: player.y },
    });
    return spaces;
  };
}

export default Board;
