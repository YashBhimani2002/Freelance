import React from "react";
import { Inter,Mulish  } from "next/font/google";
import {
  tableafrica,
  tableSouthAmerica,
  paymentDetails,
  paymentTable
} from "./paymentobject";

const inter700 = Inter({ subsets: ["latin"], weight: "700" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });
const mulish800 = Mulish({ subsets: ["latin"], weight: "800" });

export default function PaymentDetail() {
  return (
    <div className=" md:px-[20px] px-[15px]  w-full">
      <div className="flex  w-full">
        <div className="  my-[1px]  w-full">
          <div className="border xl:m-[86px] lg:m-[20px] rounded-[15px] pt-[29px] md:pr-[42px]  pb-[23px] md:pl-[32px] mt-[10px] px-2">
            <div className=" w-full">
              <h1
                className={`${mulish800.className} text-center text-2xl md:text-[40px] text-[#0076cb] md:pb-[57px] pb-[20px]`}
                id="client"
              >
                Freelance Payment Policy
              </h1>
            </div>
            <div className="flex flex-wrap  md:px-[15px] w-full">
              <div className=" md:w-1/6">
                <p className={`${inter700.className} mb-[20px] text-base`}>
                  Client
                </p>
              </div>
              <div className=" md:w-5/6 w-full">
                <h4
                  className={`${mulish700.className} md:text-[26px] text-xl text-[#000000]`}
                >
                  Client Payments &amp; Transfers
                </h4>
                <div
                  className={`py-[15px] text-[#808080] tracking-wide text-base ${inter400.className}`}
                >
                  Our payment partners charge a transaction fee on every payment
                  processed depending on your country/region and where you are
                  paying from (card, mobile money, ACH etc). If you make
                  payments in a currency other than your local currency, it is
                  regarded as an international payment
                </div>
                <h5>
                  {" "}
                  <p
                    className={`${mulish700.className} tracking-wide text-[#1068AD] mb-[24px] text-[20px]`}
                  >
                    {" "}
                    India{" "}
                  </p>{" "}
                </h5>
                {/* table start */}
                <div className="w-full overflow-x-auto ">
                  <table className="w-full ">
                    <tbody className="w-full ">
                      <tr>
                        <th
                          className={` ${inter400.className} min-w-[50px] bg-[#4285f4] w-[25%] text-[20px] p-[15px] text-left  text-[white]   align-top `}
                        >
                          Country
                        </th>
                        <th
                          className={` ${inter400.className} min-w-[150px] bg-[#4285f4] w-[25%]  text-[20px] p-[15px] text-center  text-[white]  align-top   `}
                        >
                          Local cards
                        </th>
                        <th
                          className={` ${inter400.className} min-w-[250px] bg-[#4285f4] w-[25%] text-[20px] p-[15px] text-center  text-[white]  align-top `}
                        >
                          International cards
                        </th>
                        <th
                          className={` ${inter400.className} min-w-[250px]   bg-[#4285f4] w-[25%] text-[20px] p-[15px] text-center  text-[white]  align-top`}
                        >
                          Mobile money
                        </th>
                      </tr>

                      {tableafrica.map((entry, index) => (
                        <tr key={index}>
                          <td
                            className={` ${inter400.className} tracking-wide w-[25%] text-[16px] p-[16px] text-left  text-[#808080]  align-top `}
                          >
                            {entry.Country}
                          </td>
                          <td
                            className={` ${inter400.className} tracking-wide w-[25%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                          >
                            {entry.Localcards}
                          </td>
                          <td
                            className={` ${inter400.className} tracking-wide w-[25%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                          >
                            {entry.international}
                          </td>
                          <td
                            className={` ${inter400.className} tracking-wide w-[25%] text-[16px] p-[16px] text-center  text-[#808080]  align-top `}
                          >
                            {entry.mobilemoney}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* table end */}
                <h5
                  className={`${mulish700.className} text-[20px] text-[#000000] mt-[10px]`}
                >
                  *Nigeria
                </h5>
                <div
                  className={`${inter400.className} py-[15px] text-base text-[#808080] text-justify tracking-wide`}
                >
                  All local Naira payments have a maximum transaction fee of NGN
                  2,000. This means we won&apost charge you more than NGN 2,000
                  for a Naira transaction regardless of how much it is.
                  <br />
                  <br />
                  Please note that all projects listed in Naira by a client may
                  be settled in the professionals choice of currency. You bear
                  no additional charges for this.
                </div>
                <h5
                  className={`${mulish700.className} text-[20px] text-[#000000] `}
                >
                  North America
                </h5>
                <div className="w-full overflow-x-auto mt-[20px]">
                  <table className="w-full">
                    <tbody className="w-full">
                      <tr>
                        <th
                          className={` ${inter400.className} min-w-[50px] bg-[#4285f4] w-[25%] text-[20px] p-[15px] text-left  text-[white]   align-top `}
                        >
                          Country
                        </th>
                        <th
                          className={` ${inter400.className} min-w-[150px] bg-[#4285f4] w-[25%]  text-[20px] p-[15px] text-center  text-[white]  align-top   `}
                        >
                          Local cards
                        </th>
                        <th
                          className={` ${inter400.className} min-w-[240px] bg-[#4285f4] w-[25%]  text-[20px] p-[15px] text-center  text-[white]  align-top   `}
                        >
                          International cards
                        </th>
                        <th
                          className={` ${inter400.className} min-w-[250px] bg-[#4285f4] w-[25%]  text-[20px] p-[15px] text-center  text-[white]  align-top   `}
                        >
                          Mobile money
                        </th>
                      </tr>
                      <tr>
                        <td
                          className={` ${inter400.className} tracking-wide w-[25%] text-[16px] p-[16px] text-left  text-[#808080]  align-top `}
                        >
                          USA
                        </td>
                        <td
                          className={` ${inter400.className} tracking-wide w-[25%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                        >
                          2.90%
                        </td>
                        <td
                          className={` ${inter400.className} tracking-wide w-[25%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                        >
                          3.80%
                        </td>
                        <td
                          className={` ${inter400.className} tracking-wide w-[25%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                        >
                          2.90%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h5
                  className={`${mulish700.className} text-[20px] text-[#000000] `}
                >
                  South America
                </h5>
                <div className="w-full overflow-x-auto mt-[20px]">
                  <table className="w-full">
                    <tbody className="w-full">
                      <tr>
                        <th
                          className={` ${inter400.className} min-w-[50px] bg-[#4285f4] w-[20%] text-[20px] p-[15px] text-left  text-[white]   align-top `}
                        >
                          Country
                        </th>
                        <th
                          className={` ${inter400.className} min-w-[150px] bg-[#4285f4] w-[20%]  text-[20px] p-[15px] text-center  text-[white]  align-top   `}
                        >
                          Local cards
                        </th>
                        <th
                          className={` ${inter400.className} min-w-[250px] bg-[#4285f4] w-[20%]  text-[20px] p-[15px] text-center  text-[white]  align-top   `}
                        >
                          International cards
                        </th>
                        <th
                          className={` ${inter400.className} min-w-[250px] bg-[#4285f4] w-[20%]  text-[20px] p-[15px] text-center  text-[white]  align-top   `}
                        >
                          Mobile money
                        </th>
                        <th
                          className={` ${inter400.className} min-w-[150px] bg-[#4285f4] w-[20%]  text-[20px] p-[15px] text-center  text-[white]  align-top   `}
                        >
                          ACH
                        </th>
                      </tr>
                      {tableSouthAmerica.map((entry, index) => (
                        <tr key={index}>
                          <td
                            className={` ${inter400.className} tracking-wide w-[25%] text-[16px] p-[16px] text-left  text-[#808080]  align-top `}
                          >
                            {entry.Country}
                          </td>
                          <td
                            className={` ${inter400.className} tracking-wide w-[25%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                          >
                            {entry.Localcards}
                          </td>
                          <td
                            className={` ${inter400.className} tracking-wide w-[25%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                          >
                            {entry.international}
                          </td>
                          <td
                            className={` ${inter400.className} tracking-wide w-[25%] text-[16px] p-[16px] text-center  text-[#808080]  align-top `}
                          >
                            {entry.mobilemoney}
                          </td>
                          <td
                            className={` ${inter400.className} tracking-wide w-[25%] text-[16px] p-[16px] text-center  text-[#808080]  align-top `}
                          >
                            {entry.ACH}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h5
                  className={`${mulish700.className} text-[20px] mt-[10px] text-[#000000] `}
                >
                  Europe
                </h5>
                <div className="w-full overflow-x-auto mt-[20px]">
                  <table className="w-full">
                    <tbody className="w-full">
                      <tr>
                        <th
                          className={` ${inter400.className} min-w-[180px] bg-[#4285f4] w-[33.33%] text-[20px] p-[15px] text-left  text-[white]   align-top `}
                        >
                          Country
                        </th>
                        <th
                          className={` ${inter400.className} min-w-[170px] bg-[#4285f4] w-[33.33%]  text-[20px] p-[15px] text-center  text-[white]  align-top   `}
                        >
                          Local cards
                        </th>
                        <th
                          className={` ${inter400.className} min-w-[240px] bg-[#4285f4] w-[33.33%]  text-[20px] p-[15px] text-center  text-[white]  align-top   `}
                        >
                          International cards
                        </th>
                      </tr>
                      <tr>
                        <td
                          className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-left  text-[#808080]  align-top `}
                        >
                          SEPA Countries
                        </td>
                        <td
                          className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                        >
                          2.90%
                        </td>
                        <td
                          className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                        >
                          3.80%
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-left  text-[#808080]  align-top `}
                        >
                          UK
                        </td>
                        <td
                          className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                        >
                          2.90%
                        </td>
                        <td
                          className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                        >
                          3.80%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h5
                  className={`${mulish700.className} text-[20px] mt-[10px] text-[#000000] `}
                >
                  {" "}
                  Global Alternative Payment Methods{" "}
                </h5>
                <div className="w-full overflow-x-auto mt-[20px]">
                  <table className="w-full">
                    <tbody className="w-full">
                      <tr className="bg-[#4285f4]">
                        <th
                          className={` ${inter400.className} min-w-[180px]  w-[33.33%] text-[20px] p-[15px] text-left  text-[white]   align-top `}
                        >
                          Payment method
                        </th>
                        <th></th>
                      </tr>
                      <tr>
                        <td
                          className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-left  text-[#808080]  align-top `}
                        >
                          Google pay
                        </td>
                        <td
                          className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                        >
                          3.80%
                        </td>
                      </tr>
                      <tr id="professional">
                        <td
                          className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-left  text-[#808080]  align-top `}
                        >
                          Apple pay
                        </td>
                        <td
                          className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                        >
                          3.80%
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-left  text-[#808080]  align-top `}
                        >
                          Paypal
                        </td>
                        <td
                          className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                        >
                          4.4% + $0.30 fixed fee
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* profesional start */}
            <div className="flex flex-wrap md:x-[15px] w-full mt-[30px]">
              <div className=" md:w-1/6">
                <p className={`${inter700.className} mb-[20px] text-base`}>
                  Professional
                </p>
              </div>
              <div className=" md:w-5/6 w-full">
                <h4
                  className={`${mulish700.className} md:text-[26px] text-xl text-[#000000]`}
                >
                  Professional Transfers &amp; Withdrawal
                </h4>

                <p
                  className={`py-[15px] mb-[24px] text-[#808080] tracking-wide text-base ${inter400.className}`}
                >
                  Our payment partners support transfers and withdrawals to bank
                  accounts and mobile money users in several countries. This
                  pricing depends on the country in which your bank account is
                  domiciled.
                  <br />
                  <br />
                  <b className="text-[#1068AD] tracking-wider">If Nigeria, </b>
                  <br />
                  <br />
                  1. 10 Naira + 7.5% VAT for Transactions up to ₦5,000.
                  <br />
                  <br />
                  2. 25 Naira + 7.5% VAT for Transactions from ₦5,001 to
                  ₦50,000.
                  <br />
                  <br />
                  3. 50 Naira + 7.5% VAT for Transactions more than ₦50,001.
                  <br />
                  <br />
                  <b className={`text-[#000000]`}>Note:</b> Praiki currently
                  bears the above fees for earnings transferred/withdrawn to
                  your local account. This is subject to change at any time,
                  without notice
                  <br />
                  <br />
                  To make withdrawals from your Praiki earnings in Naira to your
                  Dollar account, you will be charged a minimum of $40 per
                  transaction (excluding other charges). The exchange rate is
                  determined at the discretion of our payment partners. It may
                  differ from official and parallel market rate.
                  <br />
                  <br />
                  <b className={`text-[#000000]`}>
                    If Britain and the United States,
                  </b>
                  <br />
                  The fee for GBP transfers is ₤35 while for USD bank transfers
                  is 0.5% with a minimum fee of $40 per transaction.
                  <br />
                  <br />
                  <b className={`text-[#000000]`}>For the rest of India,</b>
                  <br />
                  <br />
                </p>

                <div className="w-full overflow-x-auto mt-[20px]">
                  <table className="w-full">
                    <tbody className="w-full">
                      <tr>
                        <th
                          className={` ${inter400.className} min-w-[180px] bg-[#4285f4] w-[33.33%] text-[20px] p-[15px] text-left  text-[white]   align-top `}
                        >
                          Country
                        </th>
                        <th
                          className={` ${inter400.className} min-w-[350px] bg-[#4285f4] w-[33.33%]  text-[20px] p-[15px] text-center  text-[white]  align-top   `}
                        >
                          Transfers to Mobile Money (where applicable)
                        </th>
                        <th
                          className={` ${inter400.className} min-w-[240px] bg-[#4285f4] w-[33.33%]  text-[20px] p-[15px] text-center  text-[white]  align-top   `}
                        >
                          Transfers to Bank
                        </th>
                      </tr>
                      {paymentDetails.map((item, index) => (
                        <tr key={index}>
                          <td
                            className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-left  text-[#808080]  align-top `}
                          >
                            {item.Country}
                          </td>
                          <td
                            className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                          >
                            {item.TransfersToMobileMoney}
                          </td>
                          <td
                            className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                          >
                            {item.TransfersToBank}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h5
                  className={`${mulish700.className} text-[20px] text-[#000000] tracking-wide mt-[10px] `}
                >
                  South America
                </h5>

                <div className="w-full overflow-x-auto mt-[20px]">
                  <table className="w-full">
                    <tbody className="w-full">
                      <tr>
                        <th
                          className={` ${inter400.className} min-w-[180px] bg-[#4285f4] w-[33.33%] text-[20px] p-[15px] text-left  text-[white]   align-top `}
                        >
                          Country
                        </th>
                        <th
                          className={` ${inter400.className} min-w-[350px] bg-[#4285f4] w-[33.33%]  text-[20px] p-[15px] text-center  text-[white]  align-top   `}
                        >
                          Bank
                        </th>
                        <th
                          className={` ${inter400.className} min-w-[240px] bg-[#4285f4] w-[33.33%]  text-[20px] p-[15px] text-center  text-[white]  align-top   `}
                        >
                          Boleto / Cash pickup
                        </th>
                      </tr>
                      {paymentTable.map((item, index) => (
                        <tr key={index}>
                          <td
                            className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-left  text-[#808080]  align-top `}
                          >
                            {item.Country}
                          </td>
                          <td
                            className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                          >
                            {item.Bank}
                          </td>
                          <td
                            className={` ${inter400.className} tracking-wide w-[33.33%] text-[16px] p-[16px] text-center  text-[#808080] align-top  `}
                          >
                            {item.Cash}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
