export default function Record({ record, onRecordClick }) {
  return (
    <div>
      {record.map((item, index) => (
        <button
          onClick={() => {
            onRecordClick(index);
          }}
          key={index}
        >
          {item.info}
        </button>
      ))}
    </div>
  );
}
