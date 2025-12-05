import '../../MainPage_Styling/global.css'
import './reactFlow.css'

import ReactFlow, { Controls, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import React, { useCallback } from 'react';
import 'reactflow/dist/style.css';
import SideNode from './NodesAndEdges';

const nodeTypes = {
  side: SideNode,
};

// Canvas component for React Flow. Avoid name clash with library default export.
function FlowCanvas() {
  const initialNodes = [
    { id: '1', type: 'side', position: { x: 0, y: 0 }, data: { label: 'Iron Ore', image: 'IronNew' } },
    { id: '2', type: 'side', position: { x: 200, y: 0 }, data: { label: 'Iron Ingot', image: 'IronIngot' } },
  ];

  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div className='chart'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default FlowCanvas;