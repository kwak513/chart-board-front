import { Select } from "antd";

interface InsertChartXY{
    setX: (value: string) => void;
    setY: (value: string) => void;
    setColor ?: (value: string) => void;
    resultTableColumns: { title: string; dataIndex: string }[];
    radioValue: string;
}

const InsertChartXYComponent = ({setX, setY, setColor = () => {}, resultTableColumns, radioValue}: InsertChartXY) => {
    return (  

        <>
            <div className="flex justify-center items-center space-x-4 mb-5 gap-10">
            <Select
                showSearch
                placeholder="X축 선택"
                optionFilterProp="label"
                onChange={(value) => setX(value)}
                options={
                [{value: '', label: '선택 없음'},
                    ...resultTableColumns.map((column) => {
                    return {
                        value: column.title,
                        label: column.title
                    }
                    })
                ]
                }
            />

            <Select
                showSearch
                placeholder="Y축 선택"
                optionFilterProp="label"
                onChange={(value) => setY(value)}
                options={
                [{value: '', label: '선택 없음'},
                    ...resultTableColumns.map((column) => {
                    return {
                        value: column.title,
                        label: column.title
                    }
                    })
                ]
                }
            />

            {(radioValue == "bar" ||  radioValue == "scatter") &&
            <Select
                showSearch
                placeholder="Color 선택"
                optionFilterProp="label"
                onChange={(value) => setColor(value)}
                options={
                [{value: '', label: '선택 없음'},
                    ...resultTableColumns.map((column) => {
                    return {
                        value: column.title,
                        label: column.title
                    }
                    })
                ]
                }
            />
            }

            </div>
        </>
    );
}
 
export default InsertChartXYComponent;