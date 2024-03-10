import React from "react";
import { ConditionsProps } from "../typesChooseNode";

function Conditions({
  comparisonType,
  setComparisonType,
  greaterValue,
  setGreaterValue,
  greaterOrEqualValue,
  setGreaterOrEqualValue,
  lowerValue,
  setLowerValue,
  lowerOrEqualValue,
  setLowerOrEqualValue,
  equalValue,
  setEqualValue,
  setNameCondition
}: ConditionsProps) {

  const handleGreaterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGreaterValue(e.target.value);
  };

  const handleGreaterOrEqualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGreaterOrEqualValue(e.target.value);
  };

  const handleLowerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLowerValue(e.target.value);
  };

  const handleLowerOrEqualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLowerOrEqualValue(e.target.value);
  };

  const handleEqualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEqualValue(e.target.value);
  };

  const handleNameCondition = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameCondition(e.target.value);
  };

  return (
    <div>

      <div className="flex flex-row gap-5 mt-5">

        <div className="flex flex-col p-1">
          <div className="flex items-center justify-center font-bold">Condition</div>

          <div className="flex flex-row items-center justify-start space-x-2 mt-2">
            <input type="radio" name="comparison" id="greater" value="greater" onChange={() => setComparisonType("greater")} />
            <label htmlFor="greater" className="text-md"> Greater </label>
          </div>


          <div className="flex flex-row items-center justify-start space-x-2 mt-2">
            <input type="radio" name="comparison" id="greaterEqual" value="greaterEqual" onChange={() => setComparisonType("greaterEqual")} />
            <label htmlFor="greaterEqual" className="text-md"> Greater or Equal </label>
          </div>

          <div className="flex flex-row items-center justify-start space-x-2 mt-2">
            <input type="radio" name="comparison" id="lower" value="lower" onChange={() => setComparisonType("lower")} />
            <label htmlFor="lower" className="text-md"> Lower</label>
          </div>

          <div className="flex flex-row items-center justify-start space-x-2 mt-2">
            <input type="radio" name="comparison" id="lowerEqual" value="lowerEqual" onChange={() => setComparisonType("lowerEqual")} />
            <label htmlFor="lowerEqual" className="text-md"> Lower or Equal </label>
          </div>

          <div className="flex flex-row items-center justify-start space-x-2 mt-2">
            <input type="radio" name="comparison" id="Equal" value="Equal" onChange={() => setComparisonType("Equal")} />
            <label htmlFor="Equal" className="text-md"> Equal </label>
          </div>

          <div className="flex flex-row items-center justify-center space-x-2 mt-7">
            Condition Name
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-center font-bold">Value</div>

          <input
            type="number"
            className="border border-gray-300 rounded-md p-1"
            disabled={comparisonType !== 'greater'}
            value={comparisonType === 'greater' ? greaterValue : ''}
            onChange={handleGreaterInputChange}
          />
          <input
            type="number"
            className="border border-gray-300 rounded-md p-1"
            disabled={comparisonType !== 'greaterEqual'}
            value={comparisonType === 'greaterEqual' ? greaterOrEqualValue : ''}
            onChange={handleGreaterOrEqualInputChange}
          />

          <input
            type="number"
            className="border border-gray-300 rounded-md p-1"
            disabled={comparisonType !== 'lower'}
            value={comparisonType === 'lower' ? lowerValue : ''}
            onChange={handleLowerInputChange}
          />



          <input
            type="number"
            className="border border-gray-300 rounded-md p-1"
            disabled={comparisonType !== 'lowerEqual'}
            value={comparisonType === 'lowerEqual' ? lowerOrEqualValue : ''}
            onChange={handleLowerOrEqualInputChange}
          />

          <input
            type="number"
            className="border border-gray-300 rounded-md p-1"
            disabled={comparisonType !== 'Equal'}
            value={comparisonType === 'Equal' ? equalValue : ''}
            onChange={handleEqualInputChange}
          />

          <div className="mt-3"><input type="text"
            className="border border-gray-300 rounded-md p-1"
            onChange={handleNameCondition} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Conditions;
