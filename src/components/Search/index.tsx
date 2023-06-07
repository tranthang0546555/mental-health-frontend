import { useDebouncedCallback } from "use-debounce";

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
      <h3 className="sidebar-title">Search</h3>
      <form action="" className="mt-3">
        <input
          type="text"
          defaultValue={defaultValue}
          onChange={(event) => handleChange(event.target.value)}
        />
        <button type="submit">
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
}
