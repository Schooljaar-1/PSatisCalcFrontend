import '../../MainPage_Styling/global.css'
import './reactFlow.css'

import ReactFlow, { Controls, Background, useNodesState, useEdgesState, addEdge, MarkerType } from 'reactflow';
import React, { useCallback } from 'react';
import 'reactflow/dist/style.css';
import SideNode from './NodesAndEdges';

// 1. Move static objects OUTSIDE the component function
const NODE_TYPES = {
  side: SideNode
};

const DEFAULT_EDGE_OPTIONS = {
  markerEnd: {
    type: MarkerType.Arrow,
    width: 20,
    height: 20,
  },
  style: { strokeWidth: 1 },
  labelShowBg: false,
  labelStyle: {
    fill: 'orange',
    fontWeight: 600,
    transform: 'translateY(-10px)',
  },
  labelBgStyle: { fill: 'transparent' },
  labelBgPadding: [0, 0],
  labelBgBorderRadius: 0,
};

const INITIAL_NODES = [
  { id: '1', type: 'side', position: { x: 0, y: 0 }, data: { label: 'Miner', subLabel: 'x', image: 'Miner' } },
  { id: '2', type: 'side', position: { x: 200, y: 0 }, data: { label: 'Smelter', subLabel: 'x0.34', image: 'Smelter' } },
  { id: '3', type: 'side', position: { x: 400, y: 0 }, data: { label: 'Iron Ingot', subLabel: '10 per minute', image: 'IronIngot' } },
];

const INITIAL_EDGES = [
  { id: 'e1-2', source: '1', target: '2', label: "10 iron ore per minute" },
  { id: 'e2-3', source: '2', target: '3', label: "10 ingots per minute" }
];

function FlowCanvas() {
  const [nodes, , onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
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
        nodeTypes={NODE_TYPES}
        defaultEdgeOptions={DEFAULT_EDGE_OPTIONS} 
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default FlowCanvas;