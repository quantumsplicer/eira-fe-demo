import { ApiResponse, postgresApi } from "..";
// import { SessionsResponse } from "../../flows/tutorDashboard/interfaces";
// import { CreateSessionLinkRequest } from "../../flows/tutorDashboard/interfaces";
// export const sessionsList = postgresApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getSessionsList: builder.query<SessionsResponse, void>({
//       query: () => {
//         const userId = localStorage.getItem("userId");
//         return {
//           url: `sessions/list/?user_id=${userId}`,
//           method: "GET",
//         };
//       },
//     }),
//     createSessionLink: builder.mutation<ApiResponse, CreateSessionLinkRequest>({
//       query: (body) => ({
//         url: `sessions/create/`,
//         method: "POST",
//         body: new URLSearchParams({
//           subject: body.subject,
//           amount: body.amount.toString(),
//           title: body.title,
//           starttime: body.starttime,
//           endtime: body.endtime,
//           teacher_id: body.teacher_id,
//           student_id: body.student_id || "",
//         }),
//         headers: {
//           Authorization: `Token ${localStorage.getItem("access-token")}`,
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }),
//     }),
//   }),
// });

// export const { useGetSessionsListQuery, useCreateSessionLinkMutation } =
//   sessionsList;
