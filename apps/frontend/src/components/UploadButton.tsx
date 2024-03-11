import { SetStateAction, useState } from 'react'; // Importe o useState
import { graph } from "@src/pages/GraphEditor/Graph";
import { useContext } from "react";
import postData from '@src/pages/GraphEditor/API/Post';

function UploadButton() {
  const { nodes, edges} = useContext(graph);
  const [name, setName] = useState(""); // Adicione o estado para o nome

  async function handleUpload() {
    try {
      const responseData = await postData({ name, nodes, edges });
      console.log('Dados enviados com sucesso:', responseData);
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  }

  // Função para lidar com a alteração do input de texto
  function handleNameChange(event: { target: { value: SetStateAction<string>; }; }) {
    setName(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Digite o nome"
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadButton;
