import cs from "./index.module.css";

interface Props {
  value: boolean;
  onClick: () => void;
}

export const SwitchButton = ({ onClick, value }: Props) => {
  return (
    <label className={cs.toggle_switch}>
      <input checked={value} type="checkbox" />
      <div onClick={onClick} className={cs.toggle_switch_background}>
        <div className={cs.toggle_switch_handle}></div>
      </div>
    </label>
  );
};
