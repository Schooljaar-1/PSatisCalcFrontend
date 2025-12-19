import '../../MainPage_Styling/global.css'
import './reactFlow.css'

import ReactFlow, { Controls, Background, useNodesState, useEdgesState, addEdge, MarkerType } from 'reactflow';
import React, { useCallback } from 'react';
import 'reactflow/dist/style.css';
import SideNode from './NodesAndEdges';

const nodeTypes = {
  side: SideNode,
};

// Canvas component for React Flow. Avoid name clash with library default export.
function FlowCanvas() {
  const defaultEdgeOptions = {
    markerEnd: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
    },
    style: {
      strokeWidth: 1,
    },
    // Label styling
    labelShowBg: false,
    labelStyle: {
      fill: 'orange',
      fontWeight: 600,
      transform: 'translateY(-10px)',
    },
    // Defensive: even if labelShowBg is ignored, keep bg transparent.
    labelBgStyle: { fill: 'transparent' },
    labelBgPadding: [0, 0],
    labelBgBorderRadius: 0,
  };

  const initialNodes = [
    { id: '1', type: 'side', position: { x: 0, y: 0 }, data: { label: 'Miner', subLabel: 'x', image: 'Miner' } },
    { id: '2', type: 'side', position: { x: 200, y: 0 }, data: { label: 'Smelter', subLabel: 'x0.34', image: 'Smelter' } },
    { id: '3', type: 'side', position: { x: 400, y: 0 }, data: { label: 'Iron Ingot', subLabel: '10 per minute', image: 'IronIngot' } },
  ];

  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', ...defaultEdgeOptions, label: "10 iron ore per minute" },
    { id: 'e2-3', source: '2', target: '3', ...defaultEdgeOptions, label: "10 ingots per minute" }
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, ...defaultEdgeOptions }, eds)),
    [setEdges]
  );

  return (
    <div className='chart'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default FlowCanvas;