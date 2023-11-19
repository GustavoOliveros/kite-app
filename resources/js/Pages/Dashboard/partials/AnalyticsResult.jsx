import PrimaryButton from "@/Components/PrimaryButton";
import DataTable from "react-data-table-component";
import { createTheme } from "react-data-table-component";
import { ArrowDownTrayIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function AnalyticsResult({ data, reset }) {
    createTheme(
        "dark",
        {
            text: {
                primary: "#FFFFFF",
                secondary: "#FFFFFF",
            },
            background: {
                default: "#1F2937",
            },
            context: {
                background: "#cb4b16",
                text: "#FFFFFF",
            },
            divider: {
                default: "#073642",
            },
            action: {
                button: "rgba(0,0,0,.54)",
                hover: "rgba(0,0,0,.08)",
                disabled: "rgba(0,0,0,.12)",
            },
        },
        "dark"
    );

    const columns = [
        {
            name: "Pos.",
            selector: (row) => row.pos,
            grow: true,
            sortable: true,
        },
        {
            name: "Item ID",
            selector: (row) => row.itemId,
            grow: true,
        },
        {
            name: "Item",
            selector: (row) => row.item,
        },
        {
            name: "Cantidad",
            selector: (row) => row.cantidad,
            sortable: true,
        },
    ];

    return (
        <div className="w-full py-4 px-8 text-center">
            <div className="flex gap-2 my-5 justify-between">
                <div>
                    <PrimaryButton
                        className="flex gap-2 items-center"
                        onClick={reset}
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                        Generar otro
                    </PrimaryButton>
                </div>
                <div>
                    <h2>Reporte: {data.title}</h2>
                </div>
                <div className="space-x-2">
                    <a
                        href={route("analytics.pdf", {
                            file: data.filename + ".pdf",
                        })}
                    >
                        <PrimaryButton className="flex gap-2 items-center">
                            <ArrowDownTrayIcon className="w-5 h-5" />
                            PDF
                        </PrimaryButton>
                    </a>
                    <a
                        href={route("analytics.excel", {
                            file: data.filename + ".xlsx",
                        })}
                    >
                        <PrimaryButton className="flex gap-2 items-center">
                            <ArrowDownTrayIcon className="w-5 h-5" />
                            Excel
                        </PrimaryButton>
                    </a>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={data.data}
                theme="dark"
                pagination
            />
        </div>
    );
}
