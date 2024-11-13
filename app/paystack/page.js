"use client";
import React, { useEffect, useRef } from "react";
import { usePaystackPayment } from "react-paystack";
import {
  paysteckPayment,
  MilestoneStatusChange,
  getMailUsers,
  postNotification,
} from "../api/api";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useSocket } from "../socketContext";

const PaymentForm = (props) => {
  const {
    amount,
    jobId,
    mileid,
    disableMakePayment,
    paymentStatu,
    resetPaymentMethod,
  } = props;
  const retrievedCookie = Cookies.get("authToken");
  const decodedToken = jwt.decode(retrievedCookie);
  // const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const socket = io(serverUrl);
   const {socket}=useSocket();
  const config = {
    reference: new Date().getTime().toString(),
    email: decodedToken.email,
    amount: amount, // Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLISHABLE_KEY,
  };


  const handlePaystackSuccessAction = async (reference) => {
    try {
      const data = {
        milestone: {
          jobId: jobId,
          mileid: mileid,
          amount: amount,
          payment_gateway: "paystack",
        },
        response: reference,
      };

      //Update transection table...
      await paysteckPayment(data);
      const getUsersData = await getMailUsers(data);
      const jobTitle = getUsersData.data.job.job_title;
      const milestoneTask = getUsersData.data.milestoneJob.milestone_task;
      // socket.emit("milstonChagestatus", { id: mileid, status: "1" });
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
        socket.emit("update_notification", { login_as: 2, id: getUsersData.data.professional._id });
      });
      socket.emit("milstonChagestatus", { id: mileid, status: "1" });
      await MilestoneStatusChange({
        id: mileid,
        status: "1",
      });
      paymentStatu();
    } catch (error) {
      console.error(error);
    } finally {
      resetPaymentMethod();
    }
    disableMakePayment();
  };

  const handlePaystackCloseAction = () => {
    resetPaymentMethod();
  };

  const onSuccess = (reference) => handlePaystackSuccessAction(reference);

  const componentProps = {
    ...config,
    text: "Make Payment",
    onSuccess,
    onClose: handlePaystackCloseAction,
  };

  const initializePayment = usePaystackPayment(config);

  const buttonRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      buttonRef.current.click();
    }, 1000);

    return () => clearTimeout(timer);
  }, []); // empty dependency array to run this effect only once after initial render

  return (
    <div>
      <button
        ref={buttonRef}
        className="client-cont-end-button mr-5"
        style={{ display: "none" }}
        onClick={() => initializePayment(componentProps)}
      >
        Make Payment
      </button>
    </div>
  );
};

export default PaymentForm;
