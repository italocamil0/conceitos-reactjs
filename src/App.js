import React, {useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', 
    
    {      
      "title": "Novo Repositorio",
      "url": "Ítalo Camilo",
      "techs": [
        "1",
        "2",
        "3"
      ],
      "likes": 0
    }    
    );

    const newRepository = response.data;

    setRepositories([...repositories, newRepository]);

  }

  async function handleRemoveRepository(id) {
    api.delete('repositories/'+id);

    const indexRepository = repositories.findIndex(r => r.id == id);

    repositories.splice(indexRepository,1);

    setRepositories([...repositories]);

  }

  return (
    <>
     <ul data-testid="repository-list">

  {repositories.map(repository =>       
        <li key={repository.id}>
          {repository.title}

          <button type="button" onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
