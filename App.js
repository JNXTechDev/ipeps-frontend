import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Updated imports for React Router v6
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useSelector, useDispatch, connect} from 'react-redux'; // Use hooks instead of connect

import { getAuthStorage, resetCaptcha } from './store/actions'; // Example actions
import * as actions from '../src/store/actions/index';


// Import components screens
import Home from './containers/Home/Home';
import './index.css'; // Updated import path
import ForgotPassword from './containers/ForgotPassword/ForgotPassword';


//Application forms
import StudentApplicationForm from './containers/UserApplicationForm/StudentApplicationForm'; 
import JobSeekerApplicationForm from './containers/UserApplicationForm/JobSeekerApplicationForm';
import AcademeApplicationForm from './containers/UserApplicationForm/AcademeApplicationForm';
import EmployerApplicationForm from './containers/UserApplicationForm/EmployerApplicationForm';



//Dashboard Screens
import StudentDashboardScreen from './containers/Dashboards/StudentDashboardScreen/StudentDashboardScreen';
import JobSeekerDashboardScreen from './containers/Dashboards/JobSeekersDashboardScreen/JobseekersDashboardScreen';
import EmployerDashboardScreen from './containers/Dashboards/EmployersDashboardScreen/EmployerDashboardScreen';  
import Settings from './containers/Dashboards/EmployersDashboardScreen/components/sidebar-menu-items/Settings/Settings';

/*
import Logout from './containers/Logout/Logout';
import AccountRecovery from './containers/AccountRecovery/AccountRecovery';
import VerifyEmail from './containers/VerifyEmail/VerifyEmail';

// Lazy-loaded dashboard layouts
const AcademeLayout = React.lazy(() =>
  import('./containers/Dashboards/AcademeDashboard/Layout')
);
const AdminLayout = React.lazy(() =>
  import('./containers/Dashboards/AdminDashboard/Layout')
);
const EmployerLayout = React.lazy(() =>
  import('./containers/Dashboards/EmployerDashboard/Layout')
);
const JobSeekerLayout = React.lazy(() =>
  import('./containers/Dashboards/JobSeekerDashboard/Layout')
);
const StudentLayout = React.lazy(() =>
  import('./containers/Dashboards/StudentDashboard/Layout')
);
*/
const loading = (
  <div className='pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse'></div>
  </div>
);


const App = () => {
  const [theme, colorMode] = useMode();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); // Access Redux state

  useEffect(() => {
    dispatch(getAuthStorage()); // Dispatch action to get auth storage
  }, [dispatch]);

  let authRoutes = null;
/*
  if (new Date(auth.expirationDate) > new Date() && auth.user) {
    // Check user type
    if (auth.user.user_type === 'ADMIN') {
      authRoutes = (
        <Route
          path='/dashboard/*'
          element={
            <React.Suspense fallback={loading}>
              <AdminLayout />
            </React.Suspense>
          }
        />
      );
    } else if (auth.user.user_type === 'EMPLOYER') {
      authRoutes = (
        <Route
          path='/dashboard/*'
          element={
            <React.Suspense fallback={loading}>
              <EmployerLayout />
            </React.Suspense>
          }
        />
      );
    } else if (auth.user.user_type === 'JOBSEEKER') {
      authRoutes = (
        <Route
          path='/dashboard/*'
          element={
            <React.Suspense fallback={loading}>
              <JobSeekerLayout />
            </React.Suspense>
          }
        />
      );
    } else if (auth.user.user_type === 'ACADEME') {
      authRoutes = (
        <Route
          path='/dashboard/*'
          element={
            <React.Suspense fallback={loading}>
              <AcademeLayout />
            </React.Suspense>
          }
        />
      );
    } else if (auth.user.user_type === 'STUDENT') {
      authRoutes = (
        <Route
          path='/dashboard/*'
          element={
            <React.Suspense fallback={loading}>
              <StudentLayout />
            </React.Suspense>
          }
        />
      );
    }

    if (auth.verifiedCaptcha) {
      dispatch(resetCaptcha()); // Reset captcha if verified
    }
  }

  if (auth.token && !(new Date(auth.expirationDate) > new Date())) {
    // Not valid
    authRoutes = (
      <Route
        path='/dashboard/*'
        element={<Navigate to='/logout' replace />} // Redirect to logout
      />
    );

    if (auth.verifiedCaptcha) {
      dispatch(resetCaptcha()); // Reset captcha if verified
    }
  }
*/
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Suspense fallback={loading}>
            <Routes>
              {/* Public Routes */}
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/student-application-form/*' element={<StudentApplicationForm />} />
              <Route path='/jobseeker-application-form/*' element={<JobSeekerApplicationForm/>} />
              <Route path='/academe-application-form/*' element={<AcademeApplicationForm/>}/>
              <Route path='/employer-application-form/*' element={<EmployerApplicationForm/>}/>

              {/* Protected Routes */}
              {authRoutes}

              {/* Student Dashboard Route */}
              <Route 
                path='/dashboard/student/*' 
                element={<StudentDashboardScreen />}
              />

              {/* Job Seeker Dashboard Route */}
              <Route 
                path='/dashboard/job-seeker/*'    
                element={<JobSeekerDashboardScreen />}
              />


              {/* Academe Dashboard Route */}
              <Route 
                path='/dashboard/academe/*'    
  
              />

              
              {/* Employers Dashboard Route */}
              <Route 
                path='/dashboard/employer/*'    
                element={<EmployerDashboardScreen />}
  
              />

              {/* Add Settings route */}
              <Route 
                path='/dashboard/employer/settings'    
                element={<Settings />}
              />

              {/* Catch-all Route */}
              <Route path='*' element={<div>Error 404: Page Not Found</div>} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App
