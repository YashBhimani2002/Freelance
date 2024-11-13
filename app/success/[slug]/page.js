"use client";
import { React, useEffect, useState } from "react";
import styles from "./style.css";
import {
  MilestoneStatusChange,
  getMilstoneDataForTransaction,
  paysteckPayment,
} from "@/app/api/api";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import { milstoneData, getMailUsers, postNotification } from "../../api/api";
import { useSocket } from "../../socketContext";
const Success = (params) => {
  const router = useRouter();
  const id = window.location.pathname.split("/").pop();
  const [status, setStatus] = useState(Boolean);
  const [contract, setContract] = useState("");
  // const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // const socket = io(serverUrl, { rejectUnauthorized: false });
  const {socket} = useSocket();
  useEffect(() => {
    function decrypt(text, key) {
      return String.fromCharCode(
        ...text
          .match(/.{1,2}/g)
          .map((e, i) => parseInt(e, 16) ^ key.charCodeAt(i % key.length) % 255)
      );
    }
    let dec = decrypt(id, "enc89dd837jfndk52987774bndbssndf");

    socket.emit("milstonChagestatus", { id: dec, status: "1" });
  }, [id]);
  const getMilstonDataForTransaction = async (dec) => {
    await getMilstoneDataForTransaction({ mid: dec }).then(async (res) => {
      if (res?.status == 200) {
        const data = {
          milestone: {
            jobId: res?.data?.job_id,
            mileid: dec,
            amount: parseInt(res?.data?.milestone_price) * 100,
            payment_gateway: "stripe",
          },
          response: {
            status: "successful",
            reference: "",
          },
        };

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
          job_id: res?.data?.job_id,
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
            milestone_Task: milestoneTask,
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
          job_id: res?.data?.job_id,
          first_name: getUsersData.data.professional.first_name,
          last_name: getUsersData.data.professional.last_name,       
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

        await paysteckPayment(data);
      }
    });
  };
  useEffect(() => {
    socket.on("milstonChagestatus", async (msg) => {
      try {
        const respons = await milstoneData(msg.data.milestone.job_id);
        if (respons?.status == 200) {
          if (respons?.data?.success == true) {
            setStatus(true);
            setContract(respons?.data?.contractdata);
          }
        }
      } catch (error) {
        console.error(error);
        console.log("error 4", error);
        setStatus(false);
      }
    });
  }, []);
  const onClose = () => {
    function decrypt(text, key) {
      return String.fromCharCode(
        ...text
          .match(/.{1,2}/g)
          .map((e, i) => parseInt(e, 16) ^ key.charCodeAt(i % key.length) % 255)
      );
    }
    let dec = decrypt(id, "enc89dd837jfndk52987774bndbssndf");
    getMilstonDataForTransaction(dec);
    router.push(`/clientContract/${contract}`);
  };
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative w-auto max-w-sm mx-auto my-6 z-50">
        <div className="relative bg-white rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-center p-5 border-b border-solid rounded-t border-blueGray-200">
            <h3 className="text-3xl font-semibold text-green-500">
              Payment Successful !
            </h3>
          </div>
          <div className="relative p-6 flex-auto flex flex-col justify-center items-center">
            <div className="w-12 h-12 animate-tick mb-4"></div>{" "}
            {/* Tick animation */}
            {!status && (
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                Payment successful
              </p>
            )}
            <button
              className="px-6 py-2 mt-4 text-sm font-bold text-white bg-green rounded shadow outline-none active:bg-green hover:shadow-lg focus:outline-none"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
