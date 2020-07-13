import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

interface ApiResponse {
  id: number;
  description: string;
  status: boolean;
}

function App() {
  const [contracts, setContracts] = useState<ApiResponse[]>([]);
  const [description, setDescription] = useState<string>("");

  async function HandleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    const newContract = {
      description,
    };
    await axios.post("http://localhost:8080/contract", newContract);
    setDescription("");
    getContracts();
  }

  async function getContracts() {
    axios
      .get<ApiResponse[]>("http://localhost:8080/contracts")
      .then((response) => {
        const contractsFromApi = response.data.map((contract) => {
          return {
            id: contract.id,
            description: contract.description,
            status: contract.status,
          };
        });
        setContracts(contractsFromApi);
      });
  }

  useEffect(() => {
    getContracts();
  }, []);

  function handleDescriptionInput(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  async function handleUpdateStatus(id: number) {
    await axios.put(`http://localhost:8080/contract/${id}`);
    getContracts();
  }

  return (
    <div className="Wrapper" id="Wrapper">
      <main className="Content" id="Content">
        <header>
          <h1>Lista de contratos</h1>
        </header>
        <form>
          <p>Adicionar novo contrato</p>
          <input
            type="text"
            placeholder="descrição"
            value={description}
            onChange={handleDescriptionInput}
          />
          <button type="submit" onClick={HandleSubmit}>
            Salvar Contrato
          </button>
        </form>
        <div className="Head-line">
          <p>Descrição</p>
          <p>Status (clique para alterar)</p>
        </div>
        <ul>
          {contracts.map((contract) => (
            <div className="Item" key={contract.id}>
              <li>{contract.description}</li>
              <button
                className={contract.status.toString().concat("-button")}
                onClick={() => handleUpdateStatus(contract.id)}
              >
                {contract.status ? "Ativo" : "Inativo"}
              </button>
            </div>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
