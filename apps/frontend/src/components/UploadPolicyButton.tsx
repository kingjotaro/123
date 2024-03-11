import { SetStateAction, useState } from 'react'; // Importe o useState
import { graph } from "@src/pages/GraphEditor/Graph";
import { useContext } from "react";
import postData from '@src/pages/GraphEditor/API/Post';

function UploadPolicyButton() {
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
    <div className='flex flex-row gap-2 mt-2 mb-2'>
      <input className='bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-300'
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Policy name"
      />
      <button className='bg-gray-300 hover:bg-teal-300 text-gray-800 font-bold border border-black  px-2 rounded' onClick={handleUpload}>Save</button>
    </div>
  );
}

export default UploadPolicyButton;
