
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ChartBoardLayout from "../layouts/ChartBoardLayout";

const Home = lazy(() => import("../pages/home/HomePage"));
const CollectionMain = lazy(() => import("../pages/collections/CollectionMainPage"));
const CollectionChartList = lazy(() => import("../pages/collections/CollectionChartListPage"));
const CollectionDashboardList = lazy(() => import("../pages/collections/CollectionDashboardListPage"));

const RowToChart = lazy(() => import("../pages/collections/RowToChartPage"));
const RowToDashboard = lazy(() => import("../pages/collections/RowToDashboard"));


const DatabaseList = lazy(() => import("../pages/datas/DatabaseListPage"));
const CustomSqlSearch = lazy(() => import("../pages/customSqlSearch/CustomSqlSearchPage"));

const Login = lazy(() => import("../pages/user/LoginPage"));
const Signup = lazy(() => import("../pages/user/SignupPage"));
const ConnectDb = lazy(() => import("../pages/user/ConnectDbPage"));

const LoadingScreen = () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <h2>페이지 로딩 중...</h2>
    </div>
  );

const router = createBrowserRouter([
    {
        path: "",
        element:(
                <ChartBoardLayout />
        ),
        children: [
            {path: "", element: <Suspense fallback={<LoadingScreen />}><Home /></Suspense>},
            {path: "collection1", element: <Suspense fallback={<LoadingScreen />}><CollectionMain /></Suspense>},
            {path: "chartlist", element: <Suspense fallback={<LoadingScreen />}><CollectionChartList /></Suspense>},
            {path: "dashboardlist", element: <Suspense fallback={<LoadingScreen />}><CollectionDashboardList /></Suspense>},
            {path: "rowtochart", element: <Suspense fallback={<LoadingScreen />}><RowToChart /></Suspense>},
            {path: "rowtodashboard", element: <Suspense fallback={<LoadingScreen />}><RowToDashboard /></Suspense>},
            
            {path: "dblist", element: <Suspense fallback={<LoadingScreen />}><DatabaseList /></Suspense>},
            {path: "customsql", element: <Suspense fallback={<LoadingScreen />}><CustomSqlSearch /></Suspense>},

            {path: "login", element: <Suspense fallback={<LoadingScreen />}><Login /></Suspense>},
            {path: "signup", element: <Suspense fallback={<LoadingScreen />}><Signup /></Suspense>},
            {path: "dbconnect", element: <Suspense fallback={<LoadingScreen />}><ConnectDb /></Suspense>},
            
        ]

    }
])

export default router;