import '../../MainPage_Styling/global.css'
import './reactFlow.css'

import React, { useCallback } from 'react';
import ReactFlow,
  { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge }
  from 'reactflow';
import 'reactflow/dist/style.css';

// Canvas component for React Flow. Avoid name clash with library default export.
function FlowCanvas() {
  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 200, y: 200 }, data: { label: '2' } },
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
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default FlowCanvas;