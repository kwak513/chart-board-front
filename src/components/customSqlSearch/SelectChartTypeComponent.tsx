import { BarChartOutlined, DashboardOutlined, DotChartOutlined, LineChartOutlined } from "@ant-design/icons";
import { Flex, Radio } from "antd";

interface SelectChartType{
    resultTableInfo: Record<string, any>[];
    radioValue: string;
    setRadioValue: (value: string) => void;
}

const SelectChartTypeComponent = ({resultTableInfo, radioValue, setRadioValue}: SelectChartType) => {
    return (  
        <>
        
        {/* --------------- 3. 차트 종류 선택 ---------------*/}

        {resultTableInfo.length > 0 &&  // 결과 테이블이 있을때만, 차트 종류 선택 가능
            <div className="flex justify-center items-center space-x-4 mt-5 pb-5">
            <Radio.Group
                onChange={(e) => setRadioValue(e.target.value)}
                value={radioValue}
                options={[
                {
                value: 'bar',
                label: (
                    <Flex gap="small" justify="center" align="center" vertical>
                    <BarChartOutlined style={{ fontSize: 18 }} />
                    Bar Chart
                    </Flex>
                ),
                },
                {
                value: 'line',
                label: (
                    <Flex gap="small" justify="center" align="center" vertical>
                    <LineChartOutlined style={{ fontSize: 18 }} />
                    Line Chart
                    </Flex>
                ),
                },
                {
                value: 'scatter',
                label: (
                    <Flex gap="small" justify="center" align="center" vertical>
                    <DotChartOutlined style={{ fontSize: 18 }} />
                    Scatter Chart
                    </Flex>
                ),
                },
                // {
                // value: 'gauge',
                // label: (
                //     <Flex gap="small" justify="center" align="center" vertical>
                //     {/* <PieChartOutlined style={{ fontSize: 18 }} /> */}
                //     <DashboardOutlined style={{ fontSize: 18 }}/>
                //     Gauge Chart
                //     </Flex>
                // ),
                // },
            ]}
            />  
            </div>
        }
        </>
    );
}
 
export default SelectChartTypeComponent;