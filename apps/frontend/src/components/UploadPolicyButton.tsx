import { SetStateAction, useState } from 'react'; 
import { graph } from "@src/pages/GraphEditor/Graph";
import { useContext } from "react";
import postData from '@src/pages/GraphEditor/API/Post';

/**
 * Component for uploading policies.
 * @returns JSX element representing the upload policy button component.
 */
function UploadPolicyButton() {
  const { nodes, edges} = useContext(graph);
 
  const [error, setError] = useState('');
  const [name, setName] = useState('')

  /**
   * Function to handle the policy upload.
   */
  async function handleUpload() {
    try {
      if (!name.trim()) {
        setError('Need a policy name');
        return;
      }
      const responseData = await postData({ name, nodes, edges });
      console.log('Data send:', responseData);
    } catch (error) {
      console.error('Error not send', error);
    }
  }

  /**
   * Function to handle changes in the policy name.
   * @param event The change event.
   */
  function handleNameChange(event: { target: { value: SetStateAction<string>; }; }) {
    setName(event.target.value);
  }

  return (
    <div className='flex flex-row gap-2 mt-2 mb-2'>
      <input className='bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-300'
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder={error == '' ? "Policy name" : error }
      />
      <button className='bg-gray-300 hover:bg-teal-300 text-gray-800 font-bold border border-black px-2 rounded' onClick={handleUpload}>Save</button>
    </div>
  );
}

export default UploadPolicyButton;
