import { DiamondSvg } from "assets/Diamond";
import { Drawer } from "components/Drawer";
import { editor } from "@src/pages/GraphEditor/Editor";
import { useContext, useState } from "react";
import ChooseNodeDrawerProps from './typesChooseNode'
import { Policy, graph } from "../../Graph";
import { UserAddableNodeName } from "../../Nodes";
import { ChooseNodeButton } from "./ChooseNodeButton";
import Conditions from "./Conditions/Conditions";

/**
 * Component representing the drawer for choosing a new node.
 * @param {ChooseNodeDrawerProps} id - The ID of the edge to add the node after.
 * @returns {JSX.Element} JSX element representing the choose node drawer.
 */
export function ChooseNodeDrawer({ id: edgeToAddNodeAfter, }: ChooseNodeDrawerProps) {

  const { drawerVisible, closeEditorDrawer } = useContext(editor);
  const { addNodeAfterEdge, edges } = useContext(graph);

  const [comparisonType, setComparisonType] = useState("");
  const [greaterValue, setGreaterValue] = useState('');
  const [greaterOrEqualValue, setGreaterOrEqualValue] = useState('');
  const [lowerValue, setLowerValue] = useState('');
  const [equalValue, setEqualValue] = useState('');
  const [lowerOrEqualValue, setLowerOrEqualValue] = useState('');
  const [nameCondition, setNameCondition] = useState('');

  /**
   * Handles the button click event for adding a node with conditions.
   * @param {UserAddableNodeName} nodeName - The name of the node to add.
   * @param {Policy} condition - The condition policy for the node.
   */
  function onButtonClick(nodeName: UserAddableNodeName, condition: Policy) {
    if (edgeToAddNodeAfter !== undefined) {
      const edge = edges.find((edge) => edge.id === edgeToAddNodeAfter)!;
      addNodeAfterEdge({
        nodeName,
        edge,
        condition,
      });
    }
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
                  let Value = '';
                  switch (comparisonType) {
                    case "greater":
                      Value = greaterValue;
                      break;
                    case "greaterEqual":
                      Value = greaterOrEqualValue;
                      break;
                    case "lower":
                      Value = lowerValue;
                      break;
                    case "lowerEqual":
                      Value = lowerOrEqualValue;
                      break;
                    case "Equal":
                      Value = equalValue;
                      break;
                    default:
                      Value = 'Condition Unknown';
                      break;
                  }
                  onButtonClick(
                    "conditional",
                    {
                      name: nameCondition,
                      value: Value,
                      policy: comparisonType
                    }
                  );
                }}
              />
            </div>
            <Conditions
              comparisonType={comparisonType}
              setComparisonType={setComparisonType}
              greaterValue={greaterValue}
              setGreaterValue={setGreaterValue}
              greaterOrEqualValue={greaterOrEqualValue}
              setGreaterOrEqualValue={setGreaterOrEqualValue}
              lowerValue={lowerValue}
              setLowerValue={setLowerValue}
              lowerOrEqualValue={lowerOrEqualValue}
              equalValue={equalValue}
              setEqualValue={setEqualValue}
              setLowerOrEqualValue={setLowerOrEqualValue}
              nameCondition={nameCondition}
              setNameCondition={setNameCondition}
            ></Conditions>
          </div>
        </>
      }
      onClose={closeEditorDrawer}
      visible={drawerVisible}
    />
  );
};
