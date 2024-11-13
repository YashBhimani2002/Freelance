"use client";

import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { transaction_history } from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Error from "../error";
import ErrorBoundary from "../ErrorBoundry";
import Loader from "@/components/common/Loader";
import {
  createTheme,
  ThemeProvider,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
const inter = Inter({ subsets: ["latin"], weight: "500" });
const mulish500 = Mulish({ subsets: ["latin"], weight: "500" });

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [uniqueClients, setUniqueClients] = useState([]);
  const [error, setError] = useState("");
  const [showDateRange, setShowDateRange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(0);

  useEffect(() => {
    // Fetch transactions from API
    async function fetchTransactions() {
      try {
        setLoading(true);
        const response = await transaction_history();
        if (response?.status == 200) {
          setTransactions(response?.data?.transactions);
          setFilteredTransactions(response?.data?.transactions);
          setRole(response?.data?.userRole);
          if (response?.data?.userRole === 1) {
            setUniqueClients(
              Array.from(
                new Set(
                  response?.data?.transactions.map(
                    (transaction) =>
                      transaction.professional_user_id?.first_name +
                      " " +
                      transaction.professional_user_id?.last_name
                  )
                )
              )
            );
          } else if (response?.data?.userRole === 2) {
            setUniqueClients(
              Array.from(
                new Set(
                  response?.data?.transactions.map(
                    (transaction) =>
                      transaction.user_id?.first_name +
                      " " +
                      transaction.user_id?.last_name
                  )
                )
              )
            );
          }
        }
      } catch (error) {
        setError("Error fetching transactions");
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
  };

  const handleSubmit = () => {
    let filteredData = transactions;
    const startDate = new Date(toDate);
    const endDate = new Date(fromDate);

    if (endDate < startDate) {
      setError("End date should be greater than or equal to Start date");
      setShowDateRange(false);
      return;
    } else {
      setError("");
      setShowDateRange(true);
    }

    if (toDate && fromDate) {
      if (startDate.getTime() === endDate.getTime()) {
        const startYear = startDate.getFullYear();
        const startMonth = startDate.getMonth();
        const startDay = startDate.getDate();

        filteredData = filteredData.filter((transaction) => {
          const transactionDate = new Date(transaction.created_at);
          const transactionYear = transactionDate.getFullYear();
          const transactionMonth = transactionDate.getMonth();
          const transactionDay = transactionDate.getDate();

          return (
            startYear === transactionYear &&
            startMonth === transactionMonth &&
            startDay === transactionDay
          );
        });
      } else {
        filteredData = filteredData.filter((transaction) => {
          const transactionDate = new Date(transaction.created_at);
          return transactionDate >= startDate && transactionDate <= endDate;
        });
      }
    }

    // Filter by client name
    if (selectedClient) {
      if (role === 1) {
        filteredData = filteredData.filter(
          (transaction) =>
            transaction.professional_user_id?.first_name +
              " " +
              transaction.professional_user_id?.last_name ===
            selectedClient
        );
      } else if (role === 2) {
        filteredData = filteredData.filter(
          (transaction) =>
            transaction.user_id?.first_name +
              " " +
              transaction.user_id?.last_name ===
            selectedClient
        );
      }
    }

    setFilteredTransactions(filteredData);
    // setShowDateRange(true);
  };

  const handleDateFilterDelete = () => {
    setToDate("");
    setFromDate("");
    setShowDateRange(false);
    let filteredData = transactions;
    if (selectedClient) {
      if (role === 1) {
        filteredData = filteredData.filter(
          (transaction) =>
            transaction.professional_user_id?.first_name +
              " " +
              transaction.professional_user_id?.last_name ===
            selectedClient
        );
      } else if (role === 2) {
        filteredData = filteredData.filter(
          (transaction) =>
            transaction.user_id?.first_name +
              " " +
              transaction.user_id?.last_name ===
            selectedClient
        );
      }

      setFilteredTransactions(filteredData);
    } else {
      // If no date range filter exists, display all transactions
      setFilteredTransactions(transactions);
    }
  };

  // Function to handle deleting the client filter
  const handleClientFilterDelete = () => {
    setSelectedClient("");
    const startDate = new Date(toDate);
    const endDate = new Date(fromDate);

    if (fromDate && toDate) {
      if (startDate.getTime() === endDate.getTime()) {
        const startYear = startDate.getFullYear();
        const startMonth = startDate.getMonth();
        const startDay = startDate.getDate();

        const filteredData = transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.created_at);
          const transactionYear = transactionDate.getFullYear();
          const transactionMonth = transactionDate.getMonth();
          const transactionDay = transactionDate.getDate();

          return (
            startYear === transactionYear &&
            startMonth === transactionMonth &&
            startDay === transactionDay
          );
        });

        setFilteredTransactions(filteredData);
      } else {
        // If startDate and endDate are different, filter for transactions within the date range
        const filteredData = transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.created_at);
          return transactionDate >= startDate && transactionDate <= endDate;
        });
        setFilteredTransactions(filteredData);
      }
    } else {
      // If no date range filter exists, display all transactions
      setFilteredTransactions(transactions);
    }
  };

  // Function to handle deleting all filters
  const handleDeleteAllFilters = () => {
    setToDate("");
    setFromDate("");
    setSelectedClient("");
    setFilteredTransactions(transactions);
    setShowDateRange(false);
  };

  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };
  const theme = createTheme({
    palette: {
      background: {
        paper: "#1168AD",
      },
      text: {
        primary: "#ffffff",
      },
    },
  });

  const tooltipClass = {
    popper: {
      sx: {
        [`& .${tooltipClasses.arrow}`]: {
          color: (theme) => theme.palette.background.paper,
        },
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: (theme) => theme.palette.background.paper,
        },
      },
    },
  };
  return (
    <ErrorBoundary fallback={<Error />}>
      <ThemeProvider theme={theme}>
        {loading ? (
          <Loader />
        ) : (
          <div
            className={`${inter.className} main-transaction-history p-[11px]6 lg:px-12 lg:py-4`}
          >
            <div className="row">
              <div>
                <div className="row">
                  {/* {error && <span className="trans-err-msg">{error}</span>} */}
                  <div
                    className={`flex flex-wrap gap-2 ${error ? "mt-2" : ""}`}
                  >
                    <div
                      className="tra-date"
                      style={{
                        height: " 56px",
                        width: "194px",
                        borderRadius: "6px",
                        position: "relative",
                      }}
                    >
                      <label
                        style={{
                          position: "absolute",
                          background: "#fff",
                          top: "-9px",
                          left: "9px",
                          color: " #000",
                          fontSize: "14px",
                          width: "35px",
                        }}
                      >
                        From
                      </label>
                      <input
                        type="date"
                        className="form-control mt-0"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        style={{
                          marginBottom: "20px",
                          height: "48px",
                          fontSize: "14px!important",
                        }}
                      />
                    </div>
                    <div
                      className="tra-date"
                      style={{
                        height: " 56px",
                        width: "194px",
                        borderRadius: "6px",
                        position: "relative",
                      }}
                    >
                      <label
                        style={{
                          position: "absolute",
                          background: "#fff",
                          top: "-9px",
                          left: "9px",
                          color: " #000",
                          fontSize: "14px",
                          width: "18px",
                        }}
                      >
                        To
                      </label>
                      <input
                        type="date"
                        className="form-control mt-0"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        style={{
                          marginBottom: "20px",
                          height: "48px",
                        }}
                        min={toDate}
                      />
                    </div>
                    <div
                      style={{ height: "48px", width: "194px" }}
                      className="tra-date"
                    >
                      <select
                        type="button"
                        className="btn btn-danger dropdown-toggle client-btn text-left"
                        id="clientnm"
                        value={selectedClient}
                        onChange={handleClientChange}
                      >
                        <option value="">
                          {role === 1 && "Professional"}
                          {role === 2 && "Clients"}
                        </option>
                        {uniqueClients.map((client, index) => (
                          <>
                            <option key={index} value={client}>
                              {client}
                            </option>
                          </>
                        ))}
                      </select>
                    </div>
                    <div className="md:ps-4 pt-1">
                        <Tooltip title='Submit' placement="right" arrow componentsProps={tooltipClass}>
                      <button
                        className="trans-sbmt"
                        id="btn_login"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                        </Tooltip>
                    </div>
                  </div>
                  {error && <span className="trans-err-msg">{error}</span>}
                </div>
                <div className="row mt-2">
                  <div className="col-md-12 date-clear-btn">
                    <ul className={`${inter.className}`}>
                      {fromDate && toDate && (
                        <li className="flex gap-2 items-center justify-content-center">
                          <span
                            style={{
                              lineHeight: "16px",
                              fontSize: "12px",
                              letterSpacing: "0.5px",
                            }}
                          >{`${formatDate(toDate)} - ${formatDate(
                            fromDate
                          )}`}</span>
                          <FontAwesomeIcon
                            style={{
                              fontSize: "12px",
                              cursor: "pointer",
                              paddingLeft: "8px",
                            }}
                            icon={faXmark}
                            onClick={handleDateFilterDelete}
                          ></FontAwesomeIcon>
                        </li>
                      )}
                      {selectedClient && (
                        <li className="flex gap-2 items-center justify-content-center">
                          <span>{selectedClient}</span>
                          <FontAwesomeIcon
                            style={{
                              fontSize: "12px",
                              cursor: "pointer",
                              paddingLeft: "8px",
                            }}
                            icon={faXmark}
                            onClick={handleClientFilterDelete} // Clear selected client
                          />
                        </li>
                      )}
                      <li onClick={handleDeleteAllFilters}>Clear Filters</li>
                    </ul>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="table-responsive tran-tbl">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col" className="date">
                              DATE
                            </th>
                            <th scope="col" className="type">
                              TYPE
                            </th>
                            <th scope="col" className="description">
                              DESCRIPTION
                            </th>
                            <th scope="col" className="client-professional">
                              {role === 1 && "PROFESSIONAL"}
                              {role === 2 && "CLIENT"}
                            </th>
                            <th scope="col" className="amount">
                              AMOUNT
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {/* Data display Here */}
                          {filteredTransactions &&
                            filteredTransactions.map(
                              (transaction, index) =>
                                transaction.response != "error" && (
                                  <tr key={index}>
                                    <td className="date border-l border-gray-500 custome-border">
                                      {
                                        new Date(transaction.created_at)
                                          .toISOString()
                                          .split("T")[0]
                                      }
                                    </td>
                                    <td className="type custome-border">
                                      {transaction.type}
                                    </td>
                                    <td className="description custome-border">
                                      {transaction.description || "-"}
                                    </td>
                                    {role === 1 && (
                                      <td className="client-professional custome-border">
                                        {transaction.professional_user_id
                                          ?.first_name +
                                          " " +
                                          transaction.professional_user_id
                                            ?.last_name}
                                      </td>
                                    )}
                                    {role === 2 && (
                                      <td className="client-professional custome-border">
                                        {transaction.user_id?.first_name +
                                          " " +
                                          transaction.user_id?.last_name}
                                      </td>
                                    )}
                                    {role === 1 && (
                                      <td className="amount custome-border">
                                        N{transaction.amount}
                                      </td>
                                    )}
                                    {role === 2 && (
                                      <td className="amount custome-border">
                                        N
                                        {parseInt(
                                          transaction.amount -
                                            transaction.amount *
                                              (transaction.commission_rate /
                                                100)
                                        )}
                                      </td>
                                    )}
                                  </tr>
                                )
                            )}
                        </tbody>
                      </table>

                      <div className="text-center">
                        {/* if after filter data is not  available then display this msg */}
                        {filteredTransactions.length === 0 && (
                          <span
                            style={{
                              color: "#adadad",
                              fontFamily:
                                "font-family: 'Inter', sans-serif!important",
                              fontWeight: "500",
                              letterSpacing: "0.5px",
                              fontSize: "16px",
                            }}
                          >
                            There is no any transaction
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default TransactionHistory;
