import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../../axios";
import * as actions from "../../store/actions/index";

// Material-UI Components
import {
  Container,
  // Grid2 as Grid,
  Card,
  CardHeader,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom Components
import PersonalInfo from "./Pages/jobseeker/PersonalInfo";
import JobPreference from "./Pages/jobseeker/JobPreference";
import LanguageDialectProficiency from "./Pages/jobseeker/LanguageDialectProficiency";
import EducationalBackground from "./Pages/jobseeker/EducationalBackground";
import OtherTraining from "./Pages/jobseeker/OtherTraining";
import EligibilityProfessionalLicense from "./Pages/jobseeker/EligibilityProfessionalLicense";
import WorkExperience from "./Pages/jobseeker/WorkExperience";
import OtherSkills from "./Pages/jobseeker/OtherSkills";
//import SideBar from './SideBar';

const JobSeekerApplicationForm = (props) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [pageData, setPageData] = useState({});
  const [userHasValidEmail, setUserHasValidEmail] = useState(false);
  const [userRequestedEmailConfirmation, setUserRequestedEmailConfirmation] =
    useState(false);

  useEffect(() => {
    onRefresh();
  }, []);

  const BlueBorderStepper = styled(Stepper)(({ theme, activeStep }) => ({
    background: "transparent",
    borderRadius: "0px",
    padding: "10px",
    transition: "background 0.5s ease-in-out",
    "& .MuiStepLabel-root": {
      color: "white",
      width: "100%",
    },
    "& .MuiStep-root": {
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    zIndex: 1000,
    "& .MuiStepConnector-root": {
      display: "block",
    },
    "& .MuiStepConnector-line ": {
      borderLeft: "2px solid #2c387e",
      height: "100%",
    },
  }));

  const NumberedStepLabel = styled(StepLabel)(
    ({ theme, completed, active }) => ({
      "& .MuiStepIcon-root": {
        // backgroundColor: completed ? 'green' : active ? '#2c387e' : 'transparent',
        borderRadius: "5px",
        width: "100%",
        height: "25px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",

        //  border: active ? '2px solid darkblue' : 'none',
      },
      "& .MuiStepIcon-text": {
        fill: "white",
        display: "none",
      },
      "& .MuiTypography-root": {
        width: "100%",
        border: "2px solid #2c387e",
        borderRadius: "8px",
        padding: "8px 16px",
        backgroundColor: active ? "#2c387e" : "transparent",
        color: active ? "white" : "#2c387e",
        transition: "all 0.3s ease",
        fontWeight: active ? "bold" : "normal",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: active ? "#2c387e" : "rgba(44, 56, 126, 0.1)",
        },
        boxShadow: active ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
        opacity: active ? "100%" : "50%",
      },
    })
  );

  const content = [
    { label: "Information Details", stepLabel: "Instructions: Please fill in the application form.", step: "Step 1" },
    { label: "Job Preference", step: "Step 2" },
    { label: "Language Proficiency", step: "Step 3" },
    { label: "Educational Background", step: "Step 4" },
    { label: "Other Training", step: "Step 5" },
    { label: "Professional License", step: "Step 6" },
    { label: "Work Experience", step: "Step 7" },
    { label: "Other Skills", step: "Step 8" },
    { label: "Review", step: "Step 9" },
  ];

  const onRefresh = () => {
    props.onGetAuthStorage();
    getAllPageData(props.auth.token);
    checkIfUserEmailVerified(props.auth.token);
  };

  let selectedTabContent = null;

  switch (selectedTab) {
    case 1:
      selectedTabContent = (
        <PersonalInfo
          pageData={pageData?.personal_info_page}
          onRefresh={onRefresh}
          selectedTab={selectedTab}
          onClickNextPage={() => onClickNextPage()}
          onClickPrevPage={() => onClickPrevPage()}
        />
      );
      break;
    case 2:
      selectedTabContent = (
        <JobPreference
          pageData={pageData?.job_preference_page}
          onRefresh={onRefresh}
          selectedTab={selectedTab}
          onClickNextPage={() => onClickNextPage()}
          onClickPrevPage={() => onClickPrevPage()}
        />
      );
      break;
    case 3:
      selectedTabContent = (
        <LanguageDialectProficiency
          pageData={pageData?.dialect_lang_prof_page}
          onRefresh={onRefresh}
          selectedTab={selectedTab}
          onClickNextPage={() => onClickNextPage()}
          onClickPrevPage={() => onClickPrevPage()}
        />
      );
      break;
    case 4:
      selectedTabContent = (
        <EducationalBackground
          pageData={pageData?.edu_background_page}
          onRefresh={onRefresh}
          selectedTab={selectedTab}
          onClickNextPage={() => onClickNextPage()}
          onClickPrevPage={() => onClickPrevPage()}
        />
      );
      break;
    case 5:
      selectedTabContent = (
        <OtherTraining
          pageData={pageData?.other_training_page}
          onRefresh={onRefresh}
          selectedTab={selectedTab}
          onClickNextPage={() => onClickNextPage()}
          onClickPrevPage={() => onClickPrevPage()}
        />
      );
      break;
    case 6:
      selectedTabContent = (
        <EligibilityProfessionalLicense
          pageData={pageData?.eligibility_prof_license_page}
          onRefresh={onRefresh}
          selectedTab={selectedTab}
          onClickNextPage={() => onClickNextPage()}
          onClickPrevPage={() => onClickPrevPage()}
        />
      );
      break;
    case 7:
      selectedTabContent = (
        <WorkExperience
          pageData={pageData?.work_experience_page}
          onRefresh={onRefresh}
          selectedTab={selectedTab}
          onClickNextPage={() => onClickNextPage()}
          onClickPrevPage={() => onClickPrevPage()}
        />
      );
      break;
    case 8:
      selectedTabContent = (
        <OtherSkills
          pageData={pageData?.work_experience_page}
          onRefresh={onRefresh}
          selectedTab={selectedTab}
          onClickNextPage={() => onClickNextPage()}
          onClickPrevPage={() => onClickPrevPage()}
        />
      );
      break;
    default:
      selectedTabContent = null;
  }

  const getAllPageData = (token) => {
    const url = "/api/user/registration/jobseeker/get-all-pages";
    const authData = {
      auth: {
        username: token,
      },
    };

    axios
      .get(url, authData)
      .then((response) => {
        setPageData(response.data.registration_application);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const checkIfUserEmailVerified = (token) => {
    const url = "/api/check-user-email-validated";
    const authData = {
      auth: {
        username: token,
      },
    };

    axios
      .get(url, authData)
      .then((response) => {
        setUserHasValidEmail(response.data.user_validate_email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resendEmailVerification = (token) => {
    axios({
      method: "post",
      url: `/api/request-email-verification`,
      headers: { "Content-Type": "multipart/form-data" },
      auth: {
        username: token,
      },
    })
      .then((response) => {
        setUserRequestedEmailConfirmation(response.data.sent);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onClickNextPage = () => {
    if (selectedTab < 9) {
      setSelectedTab(selectedTab + 1);
      onRefresh();
    }
  };

  const onClickPrevPage = () => {
    if (selectedTab > 1) {
      setSelectedTab(selectedTab - 1);
      onRefresh();
    }
  };

  if (userRequestedEmailConfirmation) {
    return (
      <Modal
        open={userRequestedEmailConfirmation}
        onClose={() => setUserRequestedEmailConfirmation(false)}
      >
        <Card>
          <CardHeader title="Sent verification email" />
          <CardContent>
            <Typography>Please check your inbox</Typography>
          </CardContent>
        </Card>
      </Modal>
    );
  }

  return (
    <div className="flex justify-center gap-3 max-w-8xl m-auto my-5">
      {/* Stepper container */}

      {/* Main content area */}
      <Container>
      <Card className="px-3">
      <CardHeader
        title={
          <Typography variant="h6" component="div" style={{ fontWeight: "bold", fontSize: "16px" }}>
            Job Seeker Application
          </Typography>
        }
        subheader={
          <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: "12px" }}>
            {content[selectedTab - 1].stepLabel}
          </Typography>
        }
        className="font-bold"
      />
      <CardContent>
        <div>{selectedTabContent}</div>
      </CardContent>
      </Card>

        <div style={{ marginTop: "1rem", textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/logout"
          >
            Log Out
          </Button>
        </div>
      </Container>
      <BlueBorderStepper
        orientation="vertical"
        activeStep={selectedTab - 1}
        className="min-w-[250px]"
      >
        {content.map((item, index) => (
          <Step key={item.step} onClick={() => setSelectedTab(index + 1)}>
            <NumberedStepLabel
              completed={index < selectedTab - 1}
              active={index === selectedTab - 1}
            >
              <Typography className="text-xs">{item.label}</Typography>
            </NumberedStepLabel>
          </Step>
        ))}
      </BlueBorderStepper>
    </div>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });
const mapDispatchToProps = (dispatch) => ({
  onGetAuthStorage: () => dispatch(actions.getAuthStorage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobSeekerApplicationForm);
