import React, { useState, useEffect, useContext } from 'react';
import getAll from "@src/pages/GraphEditor/API/GetAll";
import { Graph, graph } from '@src/pages/GraphEditor/Graph';

interface ObjectData {
  _id: string;
  name: string;
}

export interface propsName {
  selectedObjectName: string;
  setSelectedObjectName: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Component to render a button for downloading all policies.
 * @param selectedObjectName The name of the selected object.
 * @param setSelectedObjectName Function to set the selected object name.
 * @returns JSX element representing the download all policy button component.
 */
function DownloadAllPolicyButton({ selectedObjectName, setSelectedObjectName }: propsName) {
  const { setNodes, setEdges } = useContext(graph);
  const [objects, setObjects] = useState<ObjectData[]>([]);
  const [showList, setShowList] = useState(false);

  const [selectedObject, setSelectedObject] = useState<ObjectData | null>(null);


  // Function to refresh the list of objects.
  async function refresh() {
    try {
      const data = await getAll();
      console.log('Data received:', data);
      setObjects(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }


  // Function to toggle the visibility of the list.
  function toggleList() {
    setShowList(!showList);
  }

  // * Function to handle the change event of the select element.
  // @param event The change event.
  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedName = event.target.value;
    setSelectedObjectName(selectedName);
    const selectedObj = objects.find(obj => obj.name === selectedName);
    setSelectedObject(selectedObj || null);
  }

  useEffect(() => {
    if (selectedObject) {
      const { nodes, edges } = selectedObject as unknown as Graph;
      setEdges(edges);
      setNodes(nodes);
      console.log(nodes);
      console.log(edges);
    }
  }, [selectedObject, setEdges, setNodes]);

  return (
    <div className=' flex flex-col mt-1'>
      <div className='flex flex-row gap-5 items-center justify-around mb-3'>
        <button className='bg-gray-300 hover:bg-teal-300 text-gray-800 font-bold border border-black  px-2 rounded' onClick={refresh}>Refresh list</button>
        <button className='bg-gray-300 hover:bg-teal-300 text-gray-800 font-bold border border-black  px-2 rounded' onClick={toggleList}>Show list</button>
      </div>
      {showList && (
        <div className='flex flex-row'>
          <label className='text-gray-800 font-bold h-10' htmlFor="objectSelect">Select a Policy:</label>
          <select className='border border-black rounded h-10' onChange={handleSelectChange} value={selectedObjectName}>
            {objects.map(obj => (
              <option className='bg-gray-300 border' key={obj._id} value={obj.name}>{obj.name}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default DownloadAllPolicyButton;
