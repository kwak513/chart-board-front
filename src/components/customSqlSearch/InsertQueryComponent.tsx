import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";

interface InsertQueryProps{
    customQuery: string;
    setCustomQuery: (value: string) => void;
    handleQueryButtonClick: () => void;
}


const InsertQueryComponent = ({customQuery, setCustomQuery, handleQueryButtonClick}: InsertQueryProps) => {
    return ( 
        <>
        {/* 1. Query 입력 & 제출 버튼 */}
        <div className="flex items-center justify-center gap-3 my-5">
            <Input.TextArea rows={4} placeholder="SQL 쿼리를 입력하시오."  value={customQuery} onChange={(e)=>{setCustomQuery(e.target.value)}}/>

            <Tooltip title="search">
                <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={handleQueryButtonClick}/>
            </Tooltip>
        </div>

        </>
        
    );
}
 
export default InsertQueryComponent;