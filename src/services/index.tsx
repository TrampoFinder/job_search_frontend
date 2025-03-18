import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 4000,
});
api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      console.log(
        "Aviso: Você já adicionou esse job à sua lista de favoritos."
      );
      return { data: null, status: 409 }; // Retorna um objeto "válido" sem lançar erro
    }
    return Promise.reject(error); // Outros erros continuam sendo lançados
  }
);
