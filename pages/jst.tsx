// import React, { memo, useState, useEffect } from "react";
// import { Resizable, Size } from "re-resizable";
// import { Col, Row, Tree, Input } from "antd";
// import { useDrag, useDrop, DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
// import "./SchemaMapper.less";

// // type import
// import { TreeNodeData, Connections } from "../../types/MapperTypes";

// // type Props = {};

// const defaultSourcePanelSize: Size = {
//   height: "100%",
//   width: "30%",
// };
// interface BoxProps {
//   nodeData: any;
//   type: string;
//   onDrop: (a: any, b: any) => void;
// }

// function SchemaMapper() {
//   const updateXarrow = useXarrow();

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [sourceTreeData, setSourceTreeData] = useState<TreeNodeData[]>([
//     {
//       key: "S0",
//       title: "Source File 1",
//       children: [
//         {
//           key: "S0-0",
//           title: "First Node",
//           children: [
//             {
//               key: "S0-0-0",
//               title: "Child 1",
//             },
//             {
//               key: "S0-0-1",
//               title: "Child 2",
//             },
//           ],
//         },
//         {
//           key: "S0-1",
//           title: "Second Node",
//         },
//       ],
//     },
//     {
//       key: "S1",
//       title: "Source File 2",
//       children: [
//         {
//           key: "S1-0",
//           title: "First Node",
//         },
//         {
//           key: "S1-1",
//           title: "Second Node",
//           children: [
//             {
//               key: "S1-1-0",
//               title: "Child 1",
//             },
//             {
//               key: "S1-1-1",
//               title: "Child 2",
//             },
//           ],
//         },
//       ],
//     },
//   ]);

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [targetTreeData, setTargetTreeData] = useState<TreeNodeData[]>([
//     {
//       key: "T",
//       title: "Target",
//       children: [
//         {
//           key: "T-0",
//           title: "First Node Target",

//           children: [
//             {
//               key: "T-0-0",
//               title: "Target Child One",
//             },
//             {
//               key: "T-0-1",
//               title: "Target Child Two",
//             },
//           ],
//         },
//         {
//           key: "T-1",
//           title: "Second Node Target",
//         },
//       ],
//     },
//   ]);

//   const [connections, setConnections] = useState<Connections[]>([]);

//   useEffect(() => {
//     console.log(connections);
//   }, [connections]);

//   // tree control - source
//   const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
//   const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
//   const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

//   // tree control handlers - source
//   const onExpand = (expandedKeysValue: React.Key[]) => {
//     console.log("onExpand Source:", expandedKeysValue);
//     setExpandedKeys(expandedKeysValue);
//     setAutoExpandParent(false);
//   };

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const onSelect = (selectedKeysValue: React.Key[], info: any) => {
//     console.log("onSelect Source", info);
//     // cant select root node
//     if (info.node.pos !== "0-0") {
//       setSelectedKeys(selectedKeysValue);
//     }
//   };

//   // tree control - target
//   const [expandedKeysTarget, setExpandedKeysTarget] = useState<React.Key[]>([
//     "T",
//   ]);
//   const [selectedKeysTarget, setSelectedKeysTarget] = useState<React.Key[]>([]);
//   const [autoExpandParentTarget, setAutoExpandParentTarget] =
//     useState<boolean>(true);

//   // tree control handlers - target
//   const onExpandTarget = (expandedKeysValue: React.Key[]) => {
//     console.log("onExpand Target:", expandedKeysValue);
//     setExpandedKeysTarget(expandedKeysValue);
//     setAutoExpandParentTarget(false);
//   };

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const onSelectTarget = (selectedKeysValue: React.Key[], info: any) => {
//     console.log("onSelect Target:", info);
//     // draw line and clear selection
//     if (selectedKeys.length > 0) {
//       // cant select root node
//       if (info.node.pos !== "0-0") {
//         setSelectedKeysTarget(selectedKeysValue);

//         // draw line method here
//         setConnections((prevConnections: Connections[]) => [
//           ...prevConnections,
//           { source: selectedKeys[0], target: selectedKeysValue[0] },
//         ]);

//         setTimeout(() => {
//           clearSelection();
//         }, 400);
//       }
//     }
//   };

//   // common handlers
//   const clearSelection = () => {
//     setSelectedKeys([]);
//     setSelectedKeysTarget([]);
//   };

//   const nodeIsUsedInConnection = (
//     nodeKey: string,
//     nodeType: "source" | "target"
//   ): boolean =>
//     connections.findIndex((connection) => {
//       if (nodeType === "source") return connection.source === nodeKey;
//       if (nodeType === "target") return connection.target === nodeKey;
//     }) > -1;

//   useEffect(() => {
//     // TODO: Explore better option than setTimeout - this is a last resort
//     setTimeout(() => {
//       updateXarrow();
//     }, 150);
//   }, [
//     expandedKeys,
//     expandedKeysTarget,
//     selectedKeys,
//     selectedKeysTarget,
//     connections,
//   ]);

//   const SourceTreeNode = memo(function SourceTreeNode({
//     nodeData,
//     type,
//     onDrop,
//   }: BoxProps) {
//     const [{ opacity }, drag] = useDrag(
//       () => ({
//         type: "node",
//         item: { nodeData },
//         collect: (monitor: any) => ({
//           opacity: monitor.isDragging() ? 0.4 : 1,
//         }),
//       }),
//       [nodeData, type]
//     );
//     function attachRef(el: any) {
//       drag(el);
//       // drop(el);
//     }

//     return (
//       <div ref={attachRef} style={{}}>
//         <Row justify="space-between" align="middle">
//           <Col span={40}>
//             <span>{nodeData.title}</span>
//           </Col>

//           <Col
//             span={4}
//             style={
//               nodeIsUsedInConnection(nodeData.key, "source")
//                 ? { visibility: "visible" }
//                 : { visibility: "hidden" }
//             }
//           >
//             <span id={`${nodeData.key}`}>😁</span>
//           </Col>
//         </Row>
//       </div>
//     );
//   });

//   const TargetTreeNode = memo(function TargetTreeNode({
//     nodeData,
//     type,
//     onDrop,
//   }: BoxProps) {
//     const [collectedProps, drop] = useDrop(() => ({
//       accept: "node",
//       drop: (item: any) => onDrop(item, nodeData),
//       collect: (monitor: any) => ({
//         isOver: monitor.isOver(),
//         canDrop: monitor.canDrop(),
//       }),
//     }));

//     function attachRef(el: any) {
//       // drag(el);
//       drop(el);
//     }

//     return (
//       <div ref={attachRef} style={{}}>
//         <Row>
//           <Col
//             span={3}
//             style={
//               nodeIsUsedInConnection(nodeData.key, "target")
//                 ? { visibility: "visible" }
//                 : { visibility: "hidden" }
//             }
//           >
//             <span id={`${nodeData.key}`}>😈</span>
//           </Col>
//           <Col span={21}>
//             {nodeData.key !== "T" ? (
//               <Row justify="space-between" align="middle">
//                 <Col span={12}>{nodeData.title}</Col>
//                 <Col span={12}>
//                   <Input />
//                 </Col>
//               </Row>
//             ) : (
//               <span className="ml-10">{nodeData.title}</span>
//             )}
//           </Col>
//         </Row>
//       </div>
//     );
//   });

//   const onDrop = (srcItem: any, tgtItem: any) => {
//     srcItem = srcItem.nodeData;
//     const dropKey = tgtItem.key;
//     const dragKey = srcItem.key;

//     const loop = (
//       data: any[],
//       key: string,
//       callback: (arr: any, key: any, array: any[]) => void
//     ) => {
//       for (let i = 0; i < data.length; i++) {
//         if (data[i].key === key) {
//           return callback(data[i], i, data);
//         }

//         if (data[i].children) {
//           loop(data[i].children, key, callback);
//         }
//       }
//     };

//     const data = [...targetTreeData];
//     if (tgtItem) {
//       // Drop on the content
//       loop(data, tgtItem.key, (item) => {
//         item.children = item.children || []; // where to insert 示例添加到头部，可以是随意位置
//         item.children.unshift(srcItem);
//       });
//     }

//     setTargetTreeData(data);
//   };

//   return (
//     <div className="full-height">
//       <div className="full-height row jc-stretch">
//         <DndProvider backend={HTML5Backend}>
//           <Xwrapper>
//             <Resizable
//               className="panel resizable"
//               minHeight={"100%"}
//               minWidth={"15%"}
//               maxWidth={"20%"}
//               defaultSize={defaultSourcePanelSize}
//               enable={{ right: true }}
//               handleClasses={{ right: "panel-handle-right" }}
//               onResize={() => {
//                 updateXarrow();
//               }}
//             >
//               Source Side
//               <Tree
//                 onExpand={onExpand}
//                 expandedKeys={expandedKeys}
//                 autoExpandParent={autoExpandParent}
//                 onSelect={onSelect}
//                 selectedKeys={selectedKeys}
//                 treeData={sourceTreeData}
//                 blockNode
//                 showIcon
//                 titleRender={(nodeData) => (
//                   <SourceTreeNode
//                     nodeData={nodeData}
//                     type={"node"}
//                     onDrop={onDrop}
//                   />
//                 )}
//               />
//             </Resizable>
//             {/* <div className="connection-lines-container">
//           Connection Lines appear here
//         </div> */}
//             <Resizable
//               className="panel resizable"
//               minHeight={"100%"}
//               minWidth={"30%"}
//               maxWidth={"40%"}
//               defaultSize={defaultSourcePanelSize}
//               enable={{ right: true }}
//               handleClasses={{ right: "panel-handle-right" }}
//               onResize={() => {
//                 updateXarrow();
//               }}
//             >
//               <div className="ml-30">
//                 Target Side
//                 <Tree
//                   onExpand={onExpandTarget}
//                   expandedKeys={expandedKeysTarget}
//                   autoExpandParent={autoExpandParentTarget}
//                   onSelect={onSelectTarget}
//                   selectedKeys={selectedKeysTarget}
//                   treeData={targetTreeData}
//                   showIcon
//                   titleRender={(nodeData) => (
//                     <TargetTreeNode
//                       nodeData={nodeData}
//                       type={"node"}
//                       onDrop={onDrop}
//                     />
//                   )}
//                 />
//               </div>
//             </Resizable>
//           </Xwrapper>
//         </DndProvider>
//         <div className="panel flex-1">Target Expressions Side</div>
//         {/* React- xarrow */}
//         {connections.map((connection) => (
//           <Xarrow
//             key={`${connection.source}-${connection.target}`}
//             start={connection.source.toString()}
//             end={connection.target.toString()}
//             strokeWidth={2}
//             color={`red`}
//             path="straight"
//             startAnchor="right"
//             endAnchor="left"
//             dashness={true}
//             showHead={false}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SchemaMapper;

export default function tt() {
  return <div>hey</div>;
}
