export default function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="home-cta">
      {children}
    </button>
  );
}
