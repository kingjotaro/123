import React, { useState, useEffect, useContext } from 'react';
import getAll from "@src/pages/GraphEditor/API/GetAll";
import { Graph, graph } from '@src/pages/GraphEditor/Graph';

interface ObjectData {
  _id: string;
  name: string;
}

function DownloadButton() {
  const { setNodes, setEdges } = useContext(graph);
  const [objects, setObjects] = useState<ObjectData[]>([]);
  const [showList, setShowList] = useState(false);
  const [selectedObjectName, setSelectedObjectName] = useState('');
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
    <div>
      <button onClick={refresh}>Refresh list</button>
      <button onClick={toggleList}>Show list</button>

      {showList && (
        <div>
          <label htmlFor="objectSelect">Select an object:</label>
          <select id="objectSelect" onChange={handleSelectChange} value={selectedObjectName}>
            <option value="">Select an object</option>
            {objects.map(obj => (
              <option key={obj._id} value={obj.name}>{obj.name}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default DownloadButton;
