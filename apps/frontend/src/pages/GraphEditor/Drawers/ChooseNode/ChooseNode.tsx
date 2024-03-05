import { DiamondSvg } from "assets/Diamond";
import { Drawer } from "components/Drawer";
import { editor } from "@src/pages/GraphEditor/Editor";
import { SetStateAction, useContext, useEffect, useState } from "react";
import ChooseNodeDrawerProps from './typesChooseNode'
import { Policy, graph } from "../../Graph";
import { UserAddableNodeName } from "../../Nodes";
import { ChooseNodeButton } from "./ChooseNodeButton";




export function ChooseNodeDrawer({ id: edgeToAddNodeAfter, }: ChooseNodeDrawerProps) {


  
  const { drawerVisible, closeEditorDrawer } = useContext(editor);
  const { addNodeAfterEdge, edges } = useContext(graph);


  const [comparisonType, setComparisonType] = useState("");
  const [greaterValue, setGreaterValue] = useState('');
  const [lowerValue, setLowerValue] = useState('');
  const [nameCondition, setNameCondition] = useState('');



  function onButtonClick(nodeName: UserAddableNodeName, condition: Policy) {

    if (edgeToAddNodeAfter !== undefined) {
      const edge = edges.find((edge) => edge.id === edgeToAddNodeAfter)!;
      console.log(edge)
      addNodeAfterEdge({
        nodeName,
        edge,
        condition,
      });
 
    }
  };
 

  const handleGreaterInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setGreaterValue(e.target.value);
  };

 
  const handleLowerInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setLowerValue(e.target.value);
  };

  const handleNameCondition = (e: { target: { value: SetStateAction<string>; }; }) => {
    setNameCondition(e.target.value);
  };




  return (
    <Drawer
      title="Add a new block"
      content={
        <>
          <div>
            <div className="grid grid-cols-2 gap-4 flex flex-col">
              <ChooseNodeButton
                preview={
                  <DiamondSvg className="h-12 w-20 stroke-4 stroke-Y-350 text-Y-300" />
                }
                label="Conditional"
                onClick={() => {
                  onButtonClick(
                      "conditional", 
                      {
                          name: nameCondition,
                          value: comparisonType === "greater" ? greaterValue : lowerValue,
                          policy: comparisonType

                      }
                  );
                  
              }}

              />
            </div>
            <div >

         

              <div className="flex fle-row gap-5 mt-5">


                <div className="flex flex-col">


                  <div className="flex flex-row items-center justify-start space-x-2  mt-2">
                    <input type="radio" name="comparison" id="greater" value="greater" onChange={() => setComparisonType("greater")} />
                    <label htmlFor="greater" className="text-sm"> Greater </label>
                  </div>

                  <div className="flex flex-row items-center justify-center space-x-2 mt-3">
                    <input type="radio" name="comparison" id="lower" value="lower" onChange={() => setComparisonType("lower")} />
                    <label htmlFor="lower" className="text-sm"> Lower or Equal </label>
                  </div>

                  <div className="flex flex-row items-center justify-center space-x-2 mt-3">
                 Condition Name 
                  </div>



                </div>

                <div className="flex flex-col">

                  <input type="number"
                    className="border border-gray-300 rounded-md p-1"
                    disabled={comparisonType !== 'greater'}
                    value={comparisonType === 'greater' ? greaterValue : ''}
                    onChange={handleGreaterInputChange}
                  />

                  <input
                    type="number"
                    className="border border-gray-300 rounded-md p-1"
                    disabled={comparisonType !== 'lower'}
                    value={comparisonType === 'lower' ? lowerValue : ''}
                    onChange={handleLowerInputChange} />

                  <input type="text"
                    className="border border-gray-300 rounded-md p-1"
                    onChange={handleNameCondition} />
                
                </div>
              </div>

            </div>
          </div>
        </>
      }
      onClose={closeEditorDrawer}
      visible={drawerVisible}
    />
  );
};
