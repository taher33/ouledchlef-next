import dynamic from "next/dynamic";
import React from "react";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Drag = dynamic(() => import("../components/drag"), {
  ssr: false,
});

function Drop() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Drag />
      </div>
    </DndProvider>
  );
}

export default Drop;

// const onSelectTarget = (selectedKeysValue: React.Key[], info: any) => {
//   // console.log('onSelect Target:', info);
//   // draw line and clear selection
//   if (selectedKeys.length > 0) {
//     // cant select root node
//     if (info.node.pos !== "0-0") {
//       dispatch(setSelectedKeysTarget(selectedKeysValue));

//       // Instead of drawing lines here (which is here only for PoC purposes) the mapper will just callback with this event.
//       if (props.onMapperEvent) {
//         props.onMapperEvent({
//           type: "connect-nodes",
//           payload: {
//             source: selectedKeys[0],
//             target: selectedKeysValue[0],
//           },
//         });
//       }

//       const sourceNode = nodeIndex[selectedKeys[0].toString()];
//       const targetNode = nodeIndex[selectedKeysValue[0].toString()];

//       // draw line method here
//       dispatch(
//         connectNodes({
//           source: sourceNode,
//           target: targetNode,
//           sourceElement: selectedKeys[0],
//           targetElement: selectedKeysValue[0],
//         })
//       );

//       setTimeout(() => {
//         dispatch(clearSelectedNodes());
//       }, 400);
//     }
//   }
// };
