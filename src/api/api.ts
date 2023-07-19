import { Entity, SimplePosition } from "models/models";

const API = () => {
  const baseFetch = async (body: any): Promise<Response> => {
    return await fetch("http://localhost:9000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  const fetchCharacter = async (id: string) => {
    const result: Response = await baseFetch({
      query: `{
        player(id:"${id}"){
            x,
            y,
            name
        }
    }`,
    });

    if (result.status === 200) {
      const character = await result.json();
      return character.data.player as Entity;
    } else {
      return null;
    }
  };

  const moveCharacter = async (id: string, pos: SimplePosition) => {
    const mutation = {
      query: `mutation Mutation{
        move(id:"${id}",x:${pos.x},y:${pos.y}){
          success
        }
      }`,
    };

    const result: Response = await baseFetch(mutation);

    if (result.status === 200) {
      const character = await result.json();
      return character.data.player as Entity;
    } else {
      return null;
    }
  };

  return { fetchCharacter, moveCharacter };
};

export default API;
