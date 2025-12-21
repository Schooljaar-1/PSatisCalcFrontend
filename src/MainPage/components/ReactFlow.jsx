import '../../MainPage_Styling/global.css'
import './reactFlow.css'

import ReactFlow, { Controls, Background, useNodesState, useEdgesState, addEdge, MarkerType } from 'reactflow';
import React, { useCallback, useEffect } from 'react';
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

function FlowCanvas({ flowData }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    if (!flowData) return;
    console.log('Incoming flowdata:', flowData);

    // Map incoming flowData nodes to reactflow node format
    if (Array.isArray(flowData.nodes)) {
      const mapped = flowData.nodes.map((n) => ({
        id: n.id,
        position: n.position || { x: 0, y: 0 },
        type: n.nodeData?.image ? 'side' : undefined,
        data: n.nodeData || n.data || {}
      }));
      setNodes(mapped);
    }

    // Map incoming flowData edges to reactflow edge format
    if (Array.isArray(flowData.edges)) {
      const mappedEdges = flowData.edges.map((e, idx) => ({
        id: e.id || `e-${idx}`,
        source: e.source,
        target: e.target,
        label: e.label || e.text || '',
      }));
      setEdges(mappedEdges);
    }
  }, [flowData, setNodes, setEdges]);

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