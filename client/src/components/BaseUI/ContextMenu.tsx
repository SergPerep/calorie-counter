import { MouseEventHandler } from "react";

type MenuButtons = {
  title: string;
  onClick: MouseEventHandler;
}[];

const ContextMenu = ({ menuButtons }: { menuButtons: MenuButtons }) => {
  return (
    <div className="context-menu">
      {menuButtons.map((button, index) => (
        <button
          className="context-menu__button"
          key={index}
          onClick={button.onClick}
        >
          {button.title}
        </button>
      ))}
    </div>
  );
};

export default ContextMenu;
