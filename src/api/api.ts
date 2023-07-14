import { Entity } from "models/models";

const API = () => {
  const fetchCharacter = async () => {
    const query = `{
        player(id:"575f84c5-0561-46cf-85ae-70f270ab5bbb"){
            x,
            y,
            name
        }
    }`;
    const result = await fetch("http://localhost:9000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    });

    if (result.status === 200) {
      const character = await result.json();
      return character.data.player as Entity;
    } else {
      return null;
    }
  };

  return { fetchCharacter };
};

export default API;
