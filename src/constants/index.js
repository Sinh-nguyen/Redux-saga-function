import AdminHomePage from '../containers/AdminHomePage';
import LoginPage from '../containers/LoginPage';
import SignupPage from '../containers/SignupPage';
// eslint-disable-next-line import/no-cycle
import Taskboard from '../containers/Taskboard';

export const API_ENDPOINT = 'http://localhost:3000';

export const STATUSES = [
  {
    value: 0,
    label: 'READY',
  },
  {
    value: 1,
    label: 'IN PROGRESS',
  },
  {
    value: 2,
    label: 'COMPLETED',
  },
];

export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  UPDATED: 202,
};

export const ADMIN_ROUTES = [
  {
    name: 'Management Page',
    path: '/admin',
    exact: true,
    component: AdminHomePage,
  },
  {
    name: 'Work Management',
    path: '/admin/task-board',
    component: Taskboard,
  },
];
export const ROUTES = [
  {
    name: 'SignIn',
    path: '/login',
    component: LoginPage,
  },
  {
    name: 'SignUp',
    path: '/signup',
    component: SignupPage,
  },
];
