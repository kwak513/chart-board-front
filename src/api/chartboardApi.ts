import axios from "axios";

const API_SERVER_URL = "http://localhost:8080";

// -------------------------- 차트 관련 --------------------------
//	customQuery의 결과 데이터 반환
export const showResultTableByCustomQuery = async(customQuery:string, userId: number) => {
    const res = await axios.get(`${API_SERVER_URL}/showResultTableByCustomQuery`, {params: {customQuery, userId}});
    return res.data;
}

interface ChartInfoDto{
    chartType: string;
    resultTableInfo: Array<Record<string, any>>;
    chartConfig: Record<string, any>;
    chartName: string;

    userId: number
}
//	'대시보드에 저장' 버튼 누르면, chartInfo 테이블에 해당 차트 정보 저장
export const insertIntoChartInfo = async(chartInfoDto: ChartInfoDto) => {
    const res = await axios.post(`${API_SERVER_URL}/insertIntoChartInfo`, chartInfoDto)
    return res.data;
}

//	회원이 저장한 차트 정보 조회(chart_info table에서 select)
export const selectFromChartInfoTableByUserId = async(userId: number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectFromChartInfoTableByUserId`, {params: {userId}});
    return res.data;
}

// 차트 삭제 (user_chart_connect 연결 테이블, chart_info 테이블, chart_dashboard_connect 연결 테이블 에서 삭제)
export const deleteChart = async(userId: number, chartId: number) => {
    const res = await axios.delete(`${API_SERVER_URL}/deleteChart`, {params: {userId, chartId}});
    return res.data;
}

// -------------------------- 대시보드 관련 --------------------------
interface AddDashboardDto{
    dashboardName: string;

	userId: number;
}
// 대시보드 추가
export const insertIntoDashboardInfo = async(addDashboardDto: AddDashboardDto) => {
    const res = await axios.post(`${API_SERVER_URL}/insertIntoDashboardInfo`, addDashboardDto)
    return res.data;
}

// 회원이 저장한 대시보드 id, 이름 조회(dashboard_info table에서 select)
export const selectFromDashboardInfoTableByUserId = async(userId: number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectFromDashboardInfoTableByUserId`,  {params: {userId}});
    return res.data;
}
// ---------------------

//	선택된 대시보드의 차트 정보 가져오기(dashboard_x, dashboard_y, dashboard_w, dashboard_h, CHART_TYPE, RESULT_TABLE_INFO, CHART_CONFIG, chart_name)
export const selectChartFromDashboard = async(dashboardInfoId:number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectChartFromDashboard`, {params: {dashboardInfoId}});
    return res.data;
}

interface ChartDashboardConnectDto{
    chartInfoId: number;
    dashboardInfoId: number;
    dashboardX: number;
    dashboardY: number;
    dashboardW: number;
    dashboardH: number;
}

//	대시보드에서 차트의 x, ,y, w, h 수정
export const updateChartDashboardConnect = async(chartDashboardConnectDto: ChartDashboardConnectDto) => {
    const res = await axios.put(`${API_SERVER_URL}/updateChartDashboardConnect`,chartDashboardConnectDto)
    return res.data;
}

interface ChartsIntoDashboardDto{
    dashboardInfoId: number;
    chartInfoIds: number[];
}

// 프론트에서 직접 호출 O - 대시보드에 차트 1개 이상 추가(차트의 id를 순회하며, insertChartIntoDashboard 호출)
export const insertManyChartsIntoDashboard = async(chartsIntoDashboardDto: ChartsIntoDashboardDto) => {
    const res = await axios.post(`${API_SERVER_URL}/insertManyChartsIntoDashboard`, chartsIntoDashboardDto)
    return res.data;
}

// 대시보드 삭제 (user_dashboard_connect 연결 테이블, dashboard_info 테이블, chart_dashboard_connect 연결 테이블에서 삭제)
export const deleteDashboard = async(userId: number, dashboardId: number) => {
    const res = await axios.delete(`${API_SERVER_URL}/deleteDashboard`, {params: {userId, dashboardId}});
    return res.data;
}

// --------------------------- USER 관련 ---------------------------
interface UserRegisterDto{
    username: string;
	password: string;
	fullName: string;
}
// 회원가입
export const userRegister = async(userRegisterDto: UserRegisterDto) => {
    const res = await axios.post(`${API_SERVER_URL}/userRegister`,userRegisterDto)
    return res.data;
}

interface UserLoginDto{
    username: string;
	password: string;
}
// 로그인
export const userLogin = async(userLoginDto: UserLoginDto) => {
    const res = await axios.post(`${API_SERVER_URL}/userLogin`,userLoginDto)
    return res.data;
}

interface InsertDbConnectionDto{
    jdbcUrl: string;
	dbUsername: string;
	dbPassword: string;

	userId: number;
}
// 사용자의 DB 정보 추가
export const insertIntoDbConnection = async(insertDbConnectionDto: InsertDbConnectionDto) => {
    const res = await axios.post(`${API_SERVER_URL}/insertIntoDbConnection`,insertDbConnectionDto)
    return res.data;
}

// 사용자의 DB 정보 조회
export const selectFromDbConnection = async(userId: number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectFromDbConnection`, {params: {userId}});
    return res.data;
}

// 사용자의 DB 정보가 존재하는지 확인
export const selectCountFromDbConnection = async(userId: number) => {
    const res = await axios.get(`${API_SERVER_URL}/selectCountFromDbConnection`, {params: {userId}});
    return res.data;
}