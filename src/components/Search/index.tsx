import { useDebouncedCallback } from "use-debounce";
import "./index.css";

type Props = {
  defaultValue?: string;
  onChange?: (text: string) => void;
};

export default function Search(props: Props) {
  const { defaultValue, onChange } = props;

  const handleChange = useDebouncedCallback((text: string) => {
    onChange && onChange(text);
  }, 500);

  return (
    <div className="sidebar-item search-form">
      <h3 className="sidebar-title">Tìm kiếm</h3>
      <form onSubmit={(event) => event.defaultPrevented} className="mt-3">
        <input
          type="text"
          defaultValue={defaultValue}
          onChange={(event) => handleChange(event.target.value)}
          title="search-text"
        />
        <button type="submit" title="search">
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
}
