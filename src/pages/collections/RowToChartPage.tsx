import { useLocation } from "react-router-dom";
import DrawBarChartComponent from "../../components/customSqlSearch/DrawBarChartComponent";
import DrawLineChartComponent from "../../components/customSqlSearch/DrawLineChartComponent";
import DrawScatterChartComponent from "../../components/customSqlSearch/DrawScatterChartComponent";

const RowToChartPage = () => {
    const location = useLocation();
    const { chartData } = location.state || {};

    if (!chartData) {
        return <div>차트 데이터가 없습니다.</div>;
    }

    const {chart_name, CHART_CONFIG, CHART_TYPE, RESULT_TABLE_INFO} = chartData;

    console.log("chart_name:", chart_name);
    console.log("CHART_CONFIG:", CHART_CONFIG);
    console.log("CHART_TYPE:", CHART_TYPE);
    console.log("RESULT_TABLE_INFO:", RESULT_TABLE_INFO);

    console.log("JSON.parse(CHART_CONFIG).barX", JSON.parse(CHART_CONFIG).barX);


    return (
        <>
            {/* 차트 보여주기*/}
            {CHART_TYPE == 'bar' &&
                <DrawBarChartComponent radioValue={CHART_TYPE} resultTableInfo={JSON.parse(RESULT_TABLE_INFO)} barX={JSON.parse(CHART_CONFIG).barX} barY={JSON.parse(CHART_CONFIG).barY} barColor={JSON.parse(CHART_CONFIG).barColor}/>
            }
            {CHART_TYPE == 'line' &&
                <DrawLineChartComponent radioValue={CHART_TYPE} resultTableInfo={JSON.parse(RESULT_TABLE_INFO)} lineX={JSON.parse(CHART_CONFIG).lineX} lineY={JSON.parse(CHART_CONFIG).lineY}/>
            }
            {CHART_TYPE == 'scatter' &&
                <DrawScatterChartComponent radioValue={CHART_TYPE} resultTableInfo={JSON.parse(RESULT_TABLE_INFO)} scatterX={JSON.parse(CHART_CONFIG).scatterX} scatterY={JSON.parse(CHART_CONFIG).scatterY} scatterColor={JSON.parse(CHART_CONFIG).scatterColor}/>
            }
        </>
    );
}
 
export default RowToChartPage;