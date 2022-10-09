import CalDropDown from "./CalDropdown/CalDropdown";

const Nav = ({ selectedDateStr }: { selectedDateStr: string }) => {
  return (
    <nav>
      <div className="container">
        <CalDropDown selectedDateStr={selectedDateStr} />
      </div>
    </nav>
  );
};
export default Nav;
