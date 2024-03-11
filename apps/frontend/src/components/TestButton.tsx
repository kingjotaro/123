import React, { useState } from 'react';
import { propsName } from './DownloadAllPolicyButton';
import ExecutionEngine from '@src/pages/GraphEditor/API/ExecutionEngine';

interface Field {
  key: string;
  value: string;
}

function TestButton({selectedObjectName}:propsName ) {
  const [fields, setFields] = useState<Field[]>([{ key: '', value: '' }]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>, field: 'key' | 'value'): void => {
    const values = [...fields];
    values[index][field] = event.target.value;
    setFields(values);
  };

  const handleAddField = (): void => {
    setFields([...fields, { key: '', value: '' }]);
  };

  const handleRemoveField = (index: number): void => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const handleGenerateJSON = (): void => {
    const jsonObject: { [key: string]: string } = {};
    fields.forEach((field) => {
      if (field.key.trim() !== '') {
        jsonObject[field.key] = field.value;
      }
    });
    console.log(JSON.stringify(jsonObject));
    
    ExecutionEngine(selectedObjectName, jsonObject)




  };

  return (
    <div className='mt-3'>
        <div className='flex flex-col justify-center items-center gap-1 mb-5'>
        <button className='bg-gray-300 hover:bg-green-500 text-gray-800 font-bold border border-black px-2 rounded' onClick={handleGenerateJSON}>Save and Run Policy</button>
        <button className='bg-gray-300 hover:bg-blue-300 text-gray-800 font-bold border border-black px-2 rounded' onClick={handleAddField}> Add Fields</button>
        
        </div>
        
      {fields.map((field, index) => (
        <div className='flex flex-row'
        key={index}>
          <input
          className='w-20 gap-1 '
            type="text"
            placeholder="Key"
            value={field.key}
            onChange={(e) => handleChange(index, e, 'key')}
          />
          <input
          className='w-20'
            type="text"
            placeholder="Value"
            value={field.value}
            onChange={(e) => handleChange(index, e, 'value')}
          />
          <button className='bg-red-300 hover:bg-red-500 text-gray-800 font-bold border border-black px-2 rounded' onClick={() => handleRemoveField(index)}>-</button>
        </div>
      ))}
      
    </div>
  );
};

export default TestButton;