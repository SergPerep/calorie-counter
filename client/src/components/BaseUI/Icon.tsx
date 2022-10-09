const Icon = ({ name, type = "line" }: { name: string; type?: string }) => {
  return (
    <span className={`material-symbols-outlined icon ${type}-icon`}>
      {name}
    </span>
  );
};

export default Icon;
