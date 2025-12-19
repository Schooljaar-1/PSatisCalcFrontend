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
          onError={(e) => {
            const recipeFallback = `/recipeImages/${data.image}.png`;
            const unknownFallback = '/recipeImages/unknown.png';

            if (e.target.src.includes(recipeFallback)) {
              e.target.src = unknownFallback;
            } else {
              e.target.src = recipeFallback;
            }
          }}
        />
        <div className="side-node__label">{data.label}</div>
        {data.subLabel ? (
          <div className="side-node__sublabel">{data.subLabel}</div>
        ) : null}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}