/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";

import { ReportManagementContext } from "../../../contexts/ReportContext";
import { api } from "../../../services";
import { CandidateReportViewCard } from "./CandidateReportViewCard";
import { CandidateReportCard } from "./CandidateReportCard";
export const ListReportUsers = () => {
  const [loading, setLoading] = useState(false);
  const {
    reportViewCandidates,
    setReportViewCandidates,
    reportCandidates,
    setReportCandidates,
  } = useContext(ReportManagementContext);
  const getReportCandidates = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("@TOKEN");
      const [candidatesStatisticResponse, candidatesReport] = await Promise.all(
        [
          api.get("/candidates-report/view", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/candidates-report", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]
      );

      if (candidatesStatisticResponse.status === 200) {
        setReportViewCandidates(candidatesStatisticResponse.data);
      }
      if (candidatesReport.status === 200) {
        setReportCandidates(candidatesReport.data);
      }
    } catch (error) {
      console.error("Error fetching report candidates", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReportCandidates();
  }, []);
  console.log(reportCandidates);
  return (
    <div>
      {loading && <p>Carregando...</p>}
      <ul className="h-full w-full flex flex-col gap-3">
        {/* {reportCandidates?.map((candidate) => {
          return (
            // <CandidateReportViewCard {...candidate} />
          ); */}
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        <CandidateReportCard />
        {/* })} */}
      </ul>
    </div>
  );
};
// <li
//   className="w-full max-w-[306px] max-h-[439px] rounded-[20px] custom-shadow hover:scale-[102%] transition-transform duration-300 ease-out gap-6 flex flex-col justify-center items-center pt-8 pb-5 pl-1.5 pr-1.5"
//   key={candidate.userId}
// >
//   <div className="flex flex-col items-center gap-5 w-full">
//     <div className="flex items-center justify-center bg-brand-1 w-[60px] h-[60px] rounded-[8px]">
//       <img src={user} alt="User" />
//     </div>
//     <h3 className="font-semibold text-2xl text-center">
//       {candidate.fullName}
//     </h3>
//     <ul className="flex flex-col gap-2.5 items-center w-full p-3">
//       <li className="w-full space-y-4">
//         <div className="bg-brand-2/10 p-4 rounded-lg">
//           <div className="flex justify-between mb-2">
//             <span className="text-gray-700">
//               Vagas não elegíveis
//             </span>
//             <span className="font-semibold">0%</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div
//               className="bg-brand-2 h-2.5 rounded-full"
//               style={{ width: "0%" }}
//             ></div>
//           </div>
//         </div>
//       </li>
//       <li className="max-w-[200px] bg-brand-2/20 text-brand-1 pr-3 pl-3 pt-1.5 pb-1.5 rounded-1 leading-3">
//         {`${candidate.applied}% vagas aplicadas`}
//       </li>
//       <li className="max-w-[200px] bg-brand-2/20 text-brand-1 pr-3 pl-3 pt-1.5 pb-1.5 rounded-1 leading-3">
//         {`${candidate.inProgress}% vagas em processo`}
//       </li>
//       <li className="max-w-[200px] bg-brand-2/20 text-brand-1 pr-3 pl-3 pt-1.5 pb-1.5 rounded-1 leading-3">
//         {`${candidate.approved}% vagas aprovadas`}
//       </li>
//       <li className="max-w-[200px] bg-brand-2/20 text-brand-1 pr-3 pl-3 pt-1.5 pb-1.5 rounded-1 leading-3">
//         {`${candidate.rejected}% vagas reprovadas`}
//       </li>
//       <li className="max-w-[200px] bg-brand-2/20 text-brand-1 pr-3 pl-3 pt-1.5 pb-1.5 rounded-1 leading-3">
//         {`${candidate.closed}% vagas fechadas`}
//       </li>
//     </ul>
//   </div>
// </li>
