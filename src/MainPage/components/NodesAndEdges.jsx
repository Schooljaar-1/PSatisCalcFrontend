import { Handle, Position } from 'reactflow';

export default function SideNode({ data }) {
  return (
    <div className="side-node">
      <Handle type="target" position={Position.Left} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={`/machineImages/${data.image}.png`}
          alt={data.label}
          style={{ width: 32, height: 32, objectFit: 'contain' }}
          onError={e => { e.target.onerror = null; e.target.src = '/recipeImages/unknown.png'; }}
        />
        <span>{data.label}</span>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}