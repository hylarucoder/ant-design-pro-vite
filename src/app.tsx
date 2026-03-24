import { Spin } from "antd";
import { lazy, Suspense } from "react";
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import AppShell from "./layout/AppShell";
import { getStoredUser } from "./services/auth";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const AnalysisPage = lazy(() => import("./pages/AnalysisPage"));
const AdvancedFormPage = lazy(() => import("./pages/AdvancedFormPage"));
const AccountCenterPage = lazy(() => import("./pages/AccountCenterPage"));
const AccountSettingsPage = lazy(() => import("./pages/AccountSettingsPage"));
const BasicFormPage = lazy(() => import("./pages/BasicFormPage"));
const BasicListPage = lazy(() => import("./pages/BasicListPage"));
const CardListPage = lazy(() => import("./pages/CardListPage"));
const Exception403Page = lazy(() => import("./pages/Exception403Page"));
const Exception404Page = lazy(() => import("./pages/Exception404Page"));
const Exception500Page = lazy(() => import("./pages/Exception500Page"));
const MigrationPlanPage = lazy(() => import("./pages/MigrationPlanPage"));
const MonitorPage = lazy(() => import("./pages/MonitorPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ProfileAdvancedPage = lazy(() => import("./pages/ProfileAdvancedPage"));
const ProfileBasicPage = lazy(() => import("./pages/ProfileBasicPage"));
const QueryTablePage = lazy(() => import("./pages/QueryTablePage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const RegisterResultPage = lazy(() => import("./pages/RegisterResultPage"));
const ResultFailPage = lazy(() => import("./pages/ResultFailPage"));
const ResultSuccessPage = lazy(() => import("./pages/ResultSuccessPage"));
const SearchApplicationsPage = lazy(() => import("./pages/SearchApplicationsPage"));
const SearchArticlesPage = lazy(() => import("./pages/SearchArticlesPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const SearchProjectsPage = lazy(() => import("./pages/SearchProjectsPage"));
const StepFormPage = lazy(() => import("./pages/StepFormPage"));
const WelcomePage = lazy(() => import("./pages/WelcomePage"));
const WorkplacePage = lazy(() => import("./pages/WorkplacePage"));

const RequireAuth = () => {
  const location = useLocation();
  const currentUser = getStoredUser();

  if (!currentUser) {
    const redirect = `${location.pathname}${location.search}`;
    return <Navigate to={`/user/login?redirect=${encodeURIComponent(redirect)}`} replace />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="route-loader">
            <Spin size="large" />
          </div>
        }
      >
        <Routes>
          <Route path="/user/login" element={<LoginPage />} />
          <Route path="/user/register" element={<RegisterPage />} />
          <Route path="/user/register-result" element={<RegisterResultPage />} />
          <Route element={<AppShell />}>
            <Route path="/" element={<Navigate to="/dashboard/workplace" replace />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/migration" element={<MigrationPlanPage />} />
            <Route path="/result/success" element={<ResultSuccessPage />} />
            <Route path="/result/fail" element={<ResultFailPage />} />
            <Route path="/exception/403" element={<Exception403Page />} />
            <Route path="/exception/404" element={<Exception404Page />} />
            <Route path="/exception/500" element={<Exception500Page />} />
            <Route element={<RequireAuth />}>
              <Route path="/dashboard/workplace" element={<WorkplacePage />} />
              <Route path="/dashboard/analysis" element={<AnalysisPage />} />
              <Route path="/dashboard/monitor" element={<MonitorPage />} />
              <Route path="/form/basic-form" element={<BasicFormPage />} />
              <Route path="/form/step-form" element={<StepFormPage />} />
              <Route path="/form/advanced-form" element={<AdvancedFormPage />} />
              <Route path="/list/search" element={<SearchPage />}>
                <Route index element={<Navigate to="articles" replace />} />
                <Route path="articles" element={<SearchArticlesPage />} />
                <Route path="projects" element={<SearchProjectsPage />} />
                <Route path="applications" element={<SearchApplicationsPage />} />
              </Route>
              <Route path="/list/table-list" element={<QueryTablePage />} />
              <Route path="/list/basic-list" element={<BasicListPage />} />
              <Route path="/list/card-list" element={<CardListPage />} />
              <Route path="/profile/basic" element={<ProfileBasicPage />} />
              <Route path="/profile/advanced" element={<ProfileAdvancedPage />} />
              <Route path="/account/center" element={<AccountCenterPage />} />
              <Route path="/account/settings" element={<AccountSettingsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
