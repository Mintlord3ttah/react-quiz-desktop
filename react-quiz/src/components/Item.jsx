export default function Item({ keyName, value, unit }) {
  return (
    <div className="flex-wrap">
      <p className="stats">{keyName}: </p>
      <p className="value">
        {value}
        {unit}
      </p>
    </div>
  );
}
