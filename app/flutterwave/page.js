"use client";
import React, { useEffect, useRef } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { flutterwavePayment, MilestoneStatusChange } from "@/app/api/api";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { paysteckPayment, postNotification, getMailUsers } from "../api/api";
import { useSocket } from "../socketContext";

const Flutterwave = (props) => {
  const {
    amount,
    jobId,
    mileid,
    disableMakePayment,
    milstonPaymentType,
    paymentStatu,
    resetPaymentMethod,
  } = props;
  // const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const socket = io(serverUrl);
  const {socket}=useSocket()
  const buttonRef = useRef(null);
  const retrievedCookie = Cookies.get("authToken");
  const decodedToken = jwt.decode(retrievedCookie);

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLISHABLE_KEY,
    tx_ref: Date.now(),
    amount: amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: decodedToken.email,
      name: decodedToken.first_name && decodedToken.last_name,
    },
    customizations: {
      title:
        milstonPaymentType == "multiple"
          ? "Milestone payment"
          : "Project payment",
      description: "Payment for items in cart",
      logo: "https://syndelltech.com/wp-content/uploads/2023/10/Praiki-Logo.webp",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  useEffect(() => {
    const timer = setTimeout(() => {
      buttonRef.current.click();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const updateMilestone = async (response) => {
    try {
      if (response.status == "successful" || response.status == "completed") {
        const data = {
          milestone: {
            jobId: jobId,
            mileid: mileid,
            amount: parseInt(amount) * 100,
            payment_gateway: "flutterwave",
          },
          response,
        };
        await paysteckPayment(data);
        const getUsersData = await getMailUsers(data);
        const jobTitle = getUsersData.data.job.job_title;
        const milestoneTask = getUsersData.data.milestoneJob.milestone_task;

        //Change status...
        await MilestoneStatusChange({
          id: mileid,
          status: "1",
        });

        disableMakePayment();
        socket.emit("milstonChagestatus", { id: mileid, status: "1" });
        const route = `/mycontract`;
        const dataForNofitication = {
          rout: route,
          send_by: "client",
          subject: "payment",
          professional_id: getUsersData.data.professional._id,
          client_id: getUsersData.data.client._id,
          job_id: jobId,
          email: getUsersData.data.professional.email,
          client_email: getUsersData.data.client.email,
          first_name: getUsersData.data.professional.first_name,
          last_name: getUsersData.data.professional.last_name,
          milestone_Task: milestoneTask,
        };
        const messageForShow = `Payment for project ${jobTitle} successfully processed`;
        await postNotification(dataForNofitication).then((res) => {
          const data = {
            rout: route,
            status: 0,
            message: messageForShow,
            professional_id: getUsersData.data.professional._id,
            client_id: getUsersData.data.client._id,
          };
          socket.emit("new_notification", data);
          socket.emit("update_notification", { login_as: 3, id: "" });
        });

        const dataNofitication = {
          rout: route,
          send_by: "client",
          subject: "hired",
          email: getUsersData.data.professional.email,
          professional_id: getUsersData.data.professional._id,
          job_id: jobId,
          first_name: getUsersData.data.professional.first_name,
          last_name: getUsersData.data.professional.last_name,
          milestone_Task: milestoneTask,
        };

        const messageShow = `${decodedToken.first_name} ${decodedToken.last_name} hired your application for "${jobTitle}"`;

        await postNotification(dataNofitication).then((res) => {
          const data = {
            message: messageShow,
            professional_id: getUsersData.data.professional._id,
            rout: route,
            status: 0,
          };
          socket.emit("new_notification", data);
          socket.emit("update_notification", { login_as: 2, id: getUsersData.data.professional._id });
          if (res.status == 200) {
          }
        });

        paymentStatu();
      }
    } catch (error) {
      console.error(error);
      console.log("error 2", error);
    }
  };

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={() =>
          handleFlutterPayment({
            callback: (response) => {
              updateMilestone(response);
              closePaymentModal();
              resetPaymentMethod();
            },
            onClose: () => {
              resetPaymentMethod();
            },
          })
        }
      ></button>
    </div>
  );
};

export default Flutterwave;
