import axios from "axios";

const API_SERVER_URL = "http://localhost:8080";

//	customQuery의 결과 데이터 반환
export const showResultTableByCustomQuery = async(customQuery:string) => {
    const res = await axios.get(`${API_SERVER_URL}/showResultTableByCustomQuery`, {params: {customQuery}});
    return res.data;
}

interface ChartInfoDto{
    chartType: string;
    resultTableInfo: Array<Record<string, any>>;
    chartConfig: Record<string, any>;
    chartName: string;
}
//	'대시보드에 저장' 버튼 누르면, chartInfo 테이블에 해당 차트 정보 저장
export const insertIntoChartInfo = async(chartInfoDto: ChartInfoDto) => {
    const res = await axios.post(`${API_SERVER_URL}/insertIntoChartInfo`,chartInfoDto)
    return res.data;
}
//	대시보드에서 chartInfo 테이블 전체 select (test 용이라서, 나중에 회원 만들면 지울거임.)
export const selectAllFromChartInfoTable = async() => {
    const res = await axios.get(`${API_SERVER_URL}/selectAllFromChartInfoTable`);
    return res.data;
}

// 대시보드 추가
export const insertIntoDashboardInfo = async(dashboardName: string) => {
    const res = await axios.post(`${API_SERVER_URL}/insertIntoDashboardInfo`, {dashboardName: dashboardName})
    return res.data;
}

//	전체 대시보드 조회 (test 용이라서, 나중에 회원 만들면 지울거임.)
export const selectAllFromDashboardInfoTable = async() => {
    const res = await axios.get(`${API_SERVER_URL}/selectAllFromDashboardInfoTable`);
    return res.data;
}

interface ChartIntoDashboardDto{
    dashboardId: number;
    chartInfoIds: number[];
}
//	만들어진 대시보드에 차트들을 추가
export const insertChartIntoDashboard = async(chartIntoDashboardDto: ChartIntoDashboardDto) => {
    const res = await axios.post(`${API_SERVER_URL}/insertChartIntoDashboard`,chartIntoDashboardDto)
    return res.data;
}

//	선택된 대시보드의 차트 정보 가져오기(dashboard_x, dashboard_y, dashboard_w, dashboard_h, CHART_TYPE, RESULT_TABLE_INFO, CHART_CONFIG, chart_name)
export const selectChartFromDashboard = async(dashboardInfoId:number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectChartFromDashboard`, {params: {dashboardInfoId}});
    return res.data;
}
