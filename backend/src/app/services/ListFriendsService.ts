import axios from "axios";

export default async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (response.data) {
      return response.data;
    } else {
      throw new Error("Erro ao buscar amigos");
    }
  } catch (err) {
    return { message: "Falha ao retornar dados", error: err };
  }
};
