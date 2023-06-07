type Props = {
  pagination: Pagination;
  onChange?: (page: number) => void;
};
export default function Pagination(props: Props) {
  const { pagination, onChange } = props;
  if (!pagination) return <></>;

  const { page = 1, size = 0, totalRecords = 0 } = pagination;

  const handleChange = (p: number) => {
    if (page !== p && onChange) onChange(p);
  };

  return (
    <div className="blog-pagination">
      <ul className="justify-content-center">
        {[...Array(Math.ceil(totalRecords / size)).keys()].map((p) => {
          return (
            <li
              key={p}
              className={page === p + 1 ? "active" : ""}
              onClick={() => handleChange(p + 1)}
            >
              <a href="#">{p + 1}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
