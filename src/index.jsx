/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import App from "./App";

import Home from "./pages/Home";
import StudentLogin from "./pages/LoginStudent";
import CreateProfile from "./pages/CreateStudentProfile";
import CreatedStudentProfile from "./pages/CreatedStudentProfile";
import Downloads from "./pages/Downloads";
import ChangeDefaultPassword from "./pages/ChangeDefaultPassword";
import ChangePassword from "./pages/ChangePassword";
import CompleteProfile from "./pages/CompleteProfile";
import Passport from "./pages/Passport";
import ProfileStudent from "./pages/ProfileStudent";
import PortalWallet from "./pages/PortalWallet";
import AccommodationWallet from "./pages/AccommodationWallet";
import SemesterRegistration from "./pages/SemesterRegistration";
import RegistrationForm from "./pages/RegistrationForm";
import ConfirmDetails from "./pages/ConfirmDetails";
import ResetPassword from "./pages/ResetPassword";
import PrintOuts from "./pages/PrintOuts";
import PrintRegistrationForm from "./pages/PrintRegistrationForm";
//
import AdminLogin from "./pages/LoginAdmin";
import Dashboard from "./pages/Dashboard";
import ManageResgistrationPeriod from "./pages/ManageRegistrationPeriod";
import AllPortalWallets from "./pages/AllPortalWallets";
import AllAccommodationWallets from "./pages/AllAccommodationWallets";
import ManageCourses from "./pages/ManageCourses";
import ManageAdminCharges from "./pages/ManageAdminCharges";
import ManageDepartmentalCharges from "./pages/ManageDepartmentalCharges";
import AwaitingApprovalPeriod from "./pages/AwaitingApprovalPeriod";
import AwaitingApproval from "./pages/AwaitingApproval";
import RegistrationLogPeriod from "./pages/RegistrationLogPeriod";
import RegistrationLog from "./pages/RegistrationLog";
import AddDropLogPeriod from "./pages/AddDropLogPeriod";
import AddDropLog from "./pages/AddDropLog";
import AddDropForm from "./pages/AddDropForm";
import PrintAddDropForm from "./pages/PrintAddDropForm";
import CaptureQueryReceipt from "./pages/CaptureQueryReceipt";
import EnrollmentStatisticsPeriod from "./pages/EnrollmentStatisticsPeriod";
import EnrollmentStatistics from "./pages/EnrollmentStatistics";
import AssignCoursesPeriod from "./pages/AssignCoursesPeriod";
import AssignCourses from "./pages/AssignCourses";
//
import FacultyLogin from "./pages/LoginFaculty";
import ProfileFaculty from "./pages/ProfileFaculty";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/student/login" component={StudentLogin} />
      <Route path="/student/create-profile" component={CreateProfile} />
      <Route
        path="/student/profile-created"
        component={CreatedStudentProfile}
      />
      <Route path="/student/downloads" component={Downloads} />
      <Route
        path="/student/change-default-password"
        component={ChangeDefaultPassword}
      />
      <Route path="/student/complete-profile" component={CompleteProfile} />
      <Route path="/student/passport" component={Passport} />
      <Route path="/student/profile" component={ProfileStudent} />
      <Route path="/student/portal-wallet" component={PortalWallet} />
      <Route
        path="/student/accommodation-wallet"
        component={AccommodationWallet}
      />
      <Route
        path="/student/semester-registration"
        component={SemesterRegistration}
      />
      <Route
        path="/student/registration-form/:periodId/:customId"
        component={RegistrationForm}
      />
      <Route path="/student/confirm-details" component={ConfirmDetails} />
      <Route path="/student/reset-password" component={ResetPassword} />
      <Route path="/student/change-password" component={ChangePassword} />
      <Route path="/student/print-outs" component={PrintOuts} />
      <Route
        path="/student/print-registration-form/:periodId/:customId"
        component={PrintRegistrationForm}
      />
      <Route
        path="/student/add-drop-form/:periodId/:customId"
        component={AddDropForm}
      />
      <Route
        path="/student/print-add-drop-form/:periodId/:customId"
        component={PrintAddDropForm}
      />
      {/*  */}

      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={Dashboard} />
      <Route
        path="/admin/manage-semester-registration"
        component={ManageResgistrationPeriod}
      />
      <Route path="/admin/all-portal-wallets" component={AllPortalWallets} />
      <Route
        path="/admin/all-accommodation-wallets"
        component={AllAccommodationWallets}
      />
      <Route path="/admin/manage-courses" component={ManageCourses} />
      <Route
        path="/admin/manage-admin-charges"
        component={ManageAdminCharges}
      />
      <Route
        path="/admin/manage-departmental-charges"
        component={ManageDepartmentalCharges}
      />
      <Route
        path="/admin/awaiting-approval-period"
        component={AwaitingApprovalPeriod}
      />
      <Route
        path="/admin/awaiting-approval/:periodId"
        component={AwaitingApproval}
      />
      <Route
        path="/admin/registration-form/:periodId/:customId"
        component={RegistrationForm}
      />
      <Route
        path="/admin/registration-log-period"
        component={RegistrationLogPeriod}
      />
      <Route
        path="/admin/registration-log/:periodId"
        component={RegistrationLog}
      />
      <Route path="/admin/add-drop-log-period" component={AddDropLogPeriod} />
      <Route path="/admin/add-drop-log/:periodId" component={AddDropLog} />
      <Route
        path="/admin/add-drop-form/:periodId/:customId"
        component={AddDropForm}
      />
      <Route
        path="/admin/print-registration-form/:periodId/:customId"
        component={PrintRegistrationForm}
      />
      <Route
        path="/admin/print-add-drop-form/:periodId/:customId"
        component={PrintAddDropForm}
      />
      <Route
        path="/admin/capture-query-receipt"
        component={CaptureQueryReceipt}
      />
      <Route path="/admin/change-password" component={ChangePassword} />
      <Route
        path="/admin/enrollment-statistics-period"
        component={EnrollmentStatisticsPeriod}
      />
      <Route
        path="/admin/enrollment-statistics/:periodId"
        component={EnrollmentStatistics}
      />
      <Route
        path="/admin/assign-courses-period"
        component={AssignCoursesPeriod}
      />
      <Route path="/admin/assign-courses/:periodId" component={AssignCourses} />

      {/*  */}

      <Route path="/faculty/login" component={FacultyLogin} />
      <Route path="/faculty/change-password" component={ChangePassword} />
      <Route path="/faculty/profile" component={ProfileFaculty} />
    </Router>
  ),
  root
);
