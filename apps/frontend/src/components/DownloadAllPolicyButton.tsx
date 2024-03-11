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

function DownloadAllPolicyButton({selectedObjectName, setSelectedObjectName}: propsName) {
  const { setNodes, setEdges } = useContext(graph);
  const [objects, setObjects] = useState<ObjectData[]>([]);
  const [showList, setShowList] = useState(false);

  const [selectedObject, setSelectedObject] = useState<ObjectData | null>(null);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    try {
      const data = await getAll();
      console.log('Data received:', data);
      setObjects(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function toggleList() {
    setShowList(!showList);
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedName = event.target.value;
    setSelectedObjectName(selectedName);
    const selectedObj = objects.find(obj => obj.name === selectedName);
    setSelectedObject(selectedObj || null);
  }

  useEffect(() => {
    if (selectedObject) {
      const { nodes, edges } = selectedObject as unknown as Graph;
      setEdges(edges)
      setNodes(nodes)
      console.log(nodes);
      console.log(edges);
    }
  }, [selectedObject, setEdges, setNodes]);

  return (
    <div className='mt-1'>
      <div className='flex flex-row gap-5'>
      <button className='bg-gray-300 hover:bg-teal-300 text-gray-800 font-bold border border-black  px-2 rounded' onClick={refresh}>Refresh list</button>
      <button className='bg-gray-300 hover:bg-teal-300 text-gray-800 font-bold border border-black  px-2 rounded' onClick={toggleList}>Show list</button>
      </div>
      {showList && (
        <div className='flex flex-row gap-1 mt-1'>
          <label className='text-gray-800 font-bold' htmlFor="objectSelect">Select an Policy:</label>
          <select className='border border-black rounded' onChange={handleSelectChange} value={selectedObjectName}>
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
