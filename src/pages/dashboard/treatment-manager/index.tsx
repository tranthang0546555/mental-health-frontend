import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { TREATMENT_LIST, useApi } from "../../../api";
import { dateFormat } from "../../../utils";


export default function TreatmentManager() {
    const [data, setData] = useState<Treatment[]>([]);

    const columns = useMemo<MRT_ColumnDef<Treatment>[]>(
        () => [
            {
                header: "Bài viết",
                accessorFn: (originalRow) => (
                    <span className="text-line-clamp-2">{originalRow.title}</span>
                ),
            },
            {
                header: "Tiêu đề",
                accessorKey: "title",
                size: 1,
            },
            {
                header: "Mô tả",
                accessorKey: "description",
                size: 1,
            },
            // {
            //     header: "Người tạo",
            //     accessorFn: (originalRow) => originalRow.createdBy.name?.firstName,
            // },
            {
                header: "Tạo",
                accessorFn: (originalRow) => dateFormat(originalRow.createdAt),
                size: 1,
            }
        ],
        []
    );

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const data = (await useApi.get(TREATMENT_LIST)).data as Data<Treatment>;
        setData(data.data);
    };

    // if (!data) return <></>;
    return (
        <section className="section">
            <MaterialReactTable
                columns={columns}
                data={data}
                enableFilters={false}
                enableRowNumbers
            />
        </section>
    );
}
