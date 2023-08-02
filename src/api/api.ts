import { API_URL } from "constants/config.constants";
import {
  PlayerCreature,
  PlayerCreatureKey,
  SimplePosition,
} from "models/models";

const API = () => {
  const baseFetch = async (body: any): Promise<Response> => {
    return await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  const fetchPlayer = async (
    id: string,
    keys: PlayerCreatureKey[]
  ): Promise<PlayerCreature | null> => {
    const result: Response = await baseFetch({
      query: `{
        creature(id:"${id}"){
             ${keys.join(",")}
        }
    }`,
    });

    if (result.status === 200) {
      const character = await result.json();
      return character.data.creature as PlayerCreature;
    } else {
      return null;
    }
  };

  const fetchPlayers = async (
    first: number,
    after: string,
    keys: PlayerCreatureKey[]
  ): Promise<PlayerCreature[] | null> => {
    const result: Response = await baseFetch({
      query: `{
        players(first:${first}, after:"${after}"){
            ${keys.join(",")}
        }
    }`,
    });

    if (result.status === 200) {
      const character = await result.json();
      return character.data.players as PlayerCreature[];
    } else {
      return null;
    }
  };

  const movePlayer = async (id: string, pos: SimplePosition) => {
    const mutation = {
      query: `mutation Mutation{
        movePlayer(id:"${id}",x:${pos.x},y:${pos.y}){
          success
        }
      }`,
    };

    const result: Response = await baseFetch(mutation);

    if (result.status === 200) {
      const character = await result.json();
      return character.data.creature as PlayerCreature;
    } else {
      return null;
    }
  };

  return { fetchPlayer, fetchPlayers, movePlayer };
};

export default API;
