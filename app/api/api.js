/* eslint-disable */
"use client";
import Cookies from "js-cookie";
import axios from "axios";
const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const authToken = Cookies.get("authToken");

export const verifyToken = async () => {
  try {
    return await axios.get(`${url}/verify-token`, {
      withCredentials: true,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUsers = async () => {
  try {
    return await axios.get(`${url}/users`, {
      withCredentials: true,
    });
  } catch (err) {
    console.error(err);
  }
};

export const Registration = async (data) => {
  try {
    return await axios.post(`${url}/registration`, data);
  } catch (err) {
    console.error(err);
  }
};
export const googleRegistration = async (data) => {
  try {
    return await axios.post(
      `${url}/google/registration`,
      {
        userProfile: data.userProfile,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (err) {
    return err;
  }
};

export const linkedInRegistration = async (data) => {
  try {
    return await axios.post(
      `${url}/linkedin/registration`,
      {
        loginAs: data.id,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (err) {
    return err;
  }
};

export const linkedInLogin = async (data) => {
  try {
    return await axios.post(
      `${url}/linkedin/login`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (err) {
    return err;
  }
};

export const LoginData = async (data) => {
  try {
    return await axios.post(`${url}/login`, data, {
      withCredentials: true,
    });
  } catch (error) {
    return { success: false, error: error.message };
  }
};
export const ForgotPassword = async (data) => {
  try {
    return await axios.post(`${url}/forgot/password`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const getCategories = async () => {
  try {
    return await axios.post(
      `${url}/get-categories`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
};

export const getCountries = async () => {
  try {
    return await axios.post(`${url}/get-countries`, {
      withCredentials: true,
    });
  } catch (err) {
    console.error(err);
  }
};
export const getCountriesForSignup = async () => {
  try {
    return await axios.get(`${url}/get-signupcountries`);
  } catch (err) {
    console.error(err);
  }
};

export const getStates = async (id) => {
  try {
    return await axios.post(`${url}/get-states/${id}`);
  } catch (err) {
    console.error(err);
  }
};
export const Userverify = async (data) => {
  try {
    return await axios.post(`${url}/user/verify`, data);
  } catch (err) {
    console.error(err);
  }
};

export const verifyEmail = async (token) => {
  try {
    return await axios.post(`${url}/verify-email`, token);
  } catch (err) {
    console.error(err);
  }
};

export const getSkills = async () => {
  try {
    return await axios.post(`${url}/get-skills`);
  } catch (err) {
    console.error(err);
  }
};

export const getCity = async (id) => {
  try {
    return await axios.post(`${url}/get-city/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = async (data) => {
  const token = data.token;
  try {
    return await axios.post(`${url}/reset/password/${token}`, data);
  } catch (err) {
    return err.response;
  }
};

export const LogoutApi = async () => {
  try {
    return await axios.get(`${url}/logout`, {
      withCredentials: true,
    });
  } catch (err) {
    console.error(err);
  }
};

export const ProfileProcess = async (data) => {
  try {
    return await axios.post(`${url}/edit_profile_process`, data);
  } catch (err) {
    console.error(err);
  }
};
export const update_profile = async (data) => {
  try {
    return await axios.post(`${url}/update_profile`, data, {
      withCredentials: true,
    });
  } catch (err) {
    throw err;
  }
};
export const viewProfile = async () => {
  try {
    return await axios.get(`${url}/view_profile`, {
      withCredentials: true,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getConversation = async (id) => {
  try {
    return await axios.get(`${url}/get_conversation/${id}`, {
      withCredentials: true,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUserAllConversation = async () => {
  try {
    return await axios.get(`${url}/get_user_all_conversation`, {
      withCredentials: true,
    });
  } catch (err) {
    console.error(err);
  }
};

export const readMessage = async (data) => {
  try {
    return await axios.post(`${url}/read-message`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.error(err);
  }
};

export const addMessage = async (targetUser, data) => {
  try {
    return await axios.post(`${url}/add_message/${targetUser}`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const createCompanyProfile = async (companyProfileData) => {
  try {
    return await axios.post(`${url}/client_form_submit`, companyProfileData, {
      withCredentials: true,
    });
  } catch (err) {
    console.error(err);
  }
};

export const SaveExperience = async (formData) => {
  try {
    const monthMap = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };
    const {
      user_id,
      jobtitle,
      companyName,
      address,
      startmonth,
      endmonth,
      startyears,
      endyears,
      countryid,
      stateid,
      cityId,
      currentlywork,
    } = formData;
    const numericEndMonth = monthMap[endmonth];
    const requestData = {
      user_id,
      exp_title: jobtitle,
      company: companyName,
      address,
      month: startmonth,
      end_month: numericEndMonth,
      year: startyears,
      end_year: endyears,
      country_id: countryid,
      state_id: stateid,
      city_id: cityId,
      check: currentlywork,
    };
    // Make the API request using Axios
    const response = await axios.post(
      `${url}/admin/expirence_data_registration`,
      requestData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const SaveEducation = async (data) => {
  try {
    return await axios.post(`${url}/admin/education_data_registration`, data);
  } catch (error) {
    console.log("Error saving education");
  }
};

export const FormSubmit = async (data) => {
  try {
    return await axios.post(`${url}/admin/signup_form_submit`, data);
  } catch (error) {
    console.log("Error saving form submission");
  }
};

export const handleGoogleCallback = async (data) => {
  try {
    return await axios.post(`${url}/handleGoogleCallback`, data);
  } catch (err) {
    console.log(err);
  }
};

export const googleLogin = async (token) => {
  try {
    return await axios.post(
      `${url}/google/login`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const faceBookLogin = async (data) => {
  try {
    return await axios.post(
      `${url}/facebook/login`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
          AuthorizationAccess: `Bearer ${data.access_token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};
export const faceBookRegister = async (data) => {
  try {
    return await axios.post(
      `${url}/facebook/registration`,
      { loginAs: data.id },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
          AuthorizationAccess: `Bearer ${data.accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const findJob = async () => {
  try {
    return await axios.get(`${url}/findjob`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const withOutFindJob = async () => {
  try {
    return await axios.get(`${url}/without_login_findjob`);
  } catch (err) {
    console.log(err);
  }
};

export const findcontracts = async () => {
  try {
    return await axios.post(
      `${url}/my_contracts`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const pjobdetail = async (id) => {
  try {
    return await axios.post(
      `${url}/p-job-detail/${id}`,
      {},
      { withCredentials: true }
    );
  } catch (err) {
    console.log(err);
  }
};

export const jobApply = async (formData) => {
  try {
    return await axios.request({
      url: `${url}/job-apply`,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const postNotification = async (data) => {
  try {
    return await axios.post(`${url}/post-notification`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const postEmail = async (data) =>{
  try {
    return await axios.post(`${url}/post-email`,data,{withCredentials: true})
  } catch (error) {
    console.log(error);
  }
}


export const postNotificationClient = async (data) => {
  try {
    return await axios.post(`${url}/post-notification-client`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};


export const getNotification = async (data) => {
  try {
    return await axios.get(`${url}/get-notification/${data}`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const bankadddetails = async () => {
  try {
    return await axios.post(
      `${url}/bank/addbanking`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const bankstore = async (data) => {
  try {
    return await axios.post(`${url}/bank/store`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const bankupdate = async (data) => {
  try {
    return await axios.post(`${url}/bank/update`, data);
  } catch (err) {
    console.log(err);
  }
};
export const bankremove = async (data) => {
  try {
    return await axios.post(`${url}/bank/remove`, data);
  } catch (err) {
    console.log(err);
  }
};
export const transaction_history = async () => {
  try {
    return await axios.get(`${url}/transaction_history`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const earning_overview = async () => {
  try {
    return await axios.post(
      `${url}/earning_overview`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const MyApplication = async () => {
  try {
    return await axios.post(
      `${url}/my_application`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
};

export const logout = async () => {
  try {
    return await axios.get(`${url}/logout`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const discover_professional_list = async () => {
  try {
    return await axios.get(`${url}/discover_professional_list`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const bookmark = async (data) => {
  try {
    return await axios.post(`${url}/bookmark`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const jobinvIteesDetails = async () => {
  try {
    return await axios.post(
      `${url}/jobinviteesdetails`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const removejobinvitesen = async (data) => {
  try {
    return await axios.post(`${url}/removejobinvitesen`, data, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const diclinJobInvite = async (data) => {
  try {
    return await axios.post(`${url}/diclinJobInvite`, data, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeInvite = async (data) => {
  try {
    return await axios.post(`${url}/removeInvite`, data, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const InvitationBookmarkDetails = async (data) => {
  try {
    return await axios.post(`${url}/invitation-bookmark`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const job_post_form_add = async (formData) => {
  try {
    return await axios.request({
      url: `${url}/job_post_form_add`,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const ProjectTitle = async () => {
  try {
    return await axios.post(
      `${url}/ProjectTitle`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const GetFileDetails = async (data) => {
  try {
    return await axios.post(`${url}/SendFile`, data);
  } catch (err) {
    console.log(err);
  }
};

export const myApplicationList = async () => {
  try {
    return await axios.post(
      `${url}/myapplicationlist`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const professional_bookmark = async (data) => {
  try {
    return await axios.post(`${url}/professional_bookmark`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const bookmarkProfessionalForJob = async (data) => {
  try {
    return await axios.post(`${url}/bookmarkProfessionalForJob`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const bookmarkProfessionalForJobdetails = async () => {
  try {
    return await axios.get(`${url}/bookmarkProfessionalForJobdetails`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const removeprofessionalbookmarkForJobDetails = async (data) => {
  try {
    return await axios.post(
      `${url}/removeprofessionalbookmarkForJobDetails`,
      data,
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const myApplicationDetail = async (data) => {
  try {
    return await axios.post(`${url}/my_application_detail_list`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const bookmark_professional_list = async (data) => {
  try {
    return await axios.post(`${url}/bookmark_professional_list`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(error);
  }
};

export const removeprofessionalbookmark = async (data) => {
  try {
    return await axios.post(`${url}/removeprofessionalbookmark`, data, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const JobBookmarkdetails = async () => {
  try {
    return await axios.post(
      `${url}/jobbookmarkdetails`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const findprojects = async () => {
  try {
    return await axios.get(`${url}/projects`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const professioal_hired_list = async () => {
  try {
    return await axios.get(`${url}/professioal_hired_list`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const hiredProfessionals = async () => {
  try {
    return await axios.get(`${url}/hiredProfessionals`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const updateapplication = async (formData) => {
  try {
    return await axios.request({
      url: `${url}/update_application_detials`,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deletMilstoneData = async (data) => {
  try {
    return await axios.post(`${url}/delete_milstone_details`, data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUploadFile = async (data) => {
  try {
    return await axios.post(`${url}/delete_upload_file`, data);
  } catch (error) {
    console.log(error);
  }
};
export const getAppliedJobs = async () => {
  try {
    return await axios.get(`${url}/get-applied-jobs`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getAllJobs = async () => {
  try {
    return await axios.get(`${url}/get-all-jobs`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const reviewHireAppliedJob = async (data) => {
  try {
    return await axios.put(`${url}/review-hire-applied-job`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const milstoneData = async (jobId) => {
  try {
    return await axios.post(
      `${url}/Job-milstone`,
      { id: jobId },
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const contarctRating = async (data) => {
  try {
    return await axios.post(`${url}/contarct-rating`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const clientContarctDetails = async () => {
  try {
    return await axios.get(`${url}/client-contarct-details`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const professionalDontarctDetails = async () => {
  try {
    return await axios.get(`${url}/professional-contarct-details`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getContractRating = async (data) => {
  try {
    return await axios.post(`${url}/get-contract-rating`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const get_specific_country = async (data, fuserid) => {
  try {
    return await axios.post(
      `${url}/get-specific-countries`,
      { countrydata: data, userids: fuserid },
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log("ERROR", err);
  }
};
export const clientUpdateJobMilestone = async (data) => {
  try {
    return await axios.post(`${url}/client-update-job-milestone`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const updateUser = async ({ status }) => {
  try {
    return await axios.post(
      `${url}/update_user`,
      { status },
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const changeStatusOfMilestone = async (formDataToSend) => {
  try {
    return await axios.request({
      url: `${url}/change-status-of-milestone`,
      method: "PUT",
      headers: { "Content-Type": "multipart/form-data" },
      data: formDataToSend,
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const makeEndContract = async (data) => {
  try {
    return await axios.post(`${url}/make-end-contract`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const identity_verification = async (formData) => {
  try {
    return await axios.request({
      url: `${url}/identity-verification`,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const clientTransactions = async (data) => {
  try {
    return await axios.post(`${url}/client-transactions`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getidentificationStatus = async () => {
  try {
    return await axios.get(`${url}/getidentity-verificationStatus`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getPaymentMethods = async () => {
  try {
    return await axios.get(`${url}/get-payment-methods`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getMilestoneData = async () => {
  try {
    return await axios.get(`${url}/milestones`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobCategory = async ({ id }) => {
  try {
    return await axios.post(
      `${url}/get-job-categories`,
      { id },
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const withdrawAmount = async (data) => {
  try {
    return await axios.post(`${url}/withdrawAmount`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.error(err);
  }
};

export const paysteckPayment = async (data) => {
  try {
    return await axios.post(`${url}/payment/paysteck-payment`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const flutterwavePayment = async (data) => {
  try {
    return await axios.post(`${url}/payment/flutterwave-payment`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const withdrawApplication = async (data) => {
  try {
    return await axios.post(`${url}/withdraw_application`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log("error", err);
  }
};

export const update_Milstone_SubmitReview = async (data) => {
  try {
    return await axios.post(`${url}/updateMilstoneSubmitReview`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const MilestoneStatusChange = async (data) => {
  try {
    return await axios.put(`${url}/MilestoneStatusChange`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const getUserContractApplications = async (data) => {
  try {
    return await axios.post(`${url}/get-user-contract-applications`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const getFAQsWithStatus = async (status) => {
  try {
    return await axios.get(`${url}/admin/getFAQsWithStatus?status=${status}`, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

export const getMilstoneDataForTransaction = async (data) => {
  try {
    return await axios.post(`${url}/getMilstoneData`, data);
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const updateNotificationStatus = async (notificationId) => {
  try {
    return await axios.post(`${url}/update-notification`, notificationId, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const GetUserNameAvtar = async () => {
  try {
    return await axios.post(
      `${url}/getUserNameAvtar`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const switchAccount = async (data) => {
  try {
    return await axios.post(`${url}/switchaccount`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addOrUpdateSkill = async (data) => {
  try {
    return await axios.post(`${url}/admin/addOrUpdateSkill`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const globalSearch = async (data) => {
  try {
    return await axios.post(`${url}/global-search`, data, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

export const storeImageInBackend = async (formData) => {
  try {
    return await axios.post(`${url}/storeImageInBackend`, formData, {
      withCredentials: true,
    });
  } catch (err) {
    console.error(err);
  }
};

export const storepPortfolioData = async (formData) => {
  try {
    return await axios.post(`${url}/storepPortfolioData`, formData, {
      withCredentials: true,
    });
  } catch (err) {
    console.error(err);
  }
};

export const changeStatus = async (data)=>{
  try {
    return await axios.post(`${url}/change_status`, data, {
      withCredentials: true,
    });
  } catch (err) {
    console.error(err);
  }
}
export const contactUs = async (formDataToSend) => {
  try {
    return await axios.post(`${url}/contact-us`, formDataToSend);
  } catch (error) {
    console.error(error);
  }
};
// AI TEXT API
export const generateText = async (prompt) => {
  try {
    return await axios.post(`${url}/generate-text`, prompt);
  } catch (error) {
    console.error('Error generating text api', error);
  }
};

export const getMailUsers = async (data) => {
  try {
    return await axios.post(`${url}/payment/getMailUser`, data);
  } catch (err) {
    console.log("ERROR", err);
  }
};
