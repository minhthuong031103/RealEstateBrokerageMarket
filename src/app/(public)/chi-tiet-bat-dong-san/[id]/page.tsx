import Hello from "./hello";

export default function page({ params }) {
  return (
    <div>
      <div>{params.id}</div>
      <Hello />
    </div>
  );
}
