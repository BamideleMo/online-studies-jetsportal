import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";

import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { A, useNavigate, useParams } from "@solidjs/router";

import Header from "../components/Header";
import { createSignal, createResource, Show } from "solid-js";
import { createStore } from "solid-js/store";
import Loading from "../components/Loading";
import Success from "../components/icons/Success";

const schema = z.object({
  undertaking: z.string().min(1, "*Required"),
});

export default function RegistrationLog() {
  const params = useParams();

  const [undertakingPop, setUndertakingPop] = createSignal(false);
  const [scustomID, setSCustomId] = createSignal("");
  const [speriodId, setSPeriodId] = createSignal("");
  const [sLNo, setSLNo] = createSignal("");
  const [sId, setSId] = createSignal("");
  const [showSuccess, setShowSuccess] = createSignal(false);
  const [semester, setSemester] = createSignal("");
  const [session, setSession] = createSignal("");
  const [MAStudents, setMAStudents] = createStore([]);
  const [NewStudents, setNewStudents] = createStore([]);
  const [PGDTStudents, setPGDTStudents] = createStore([]);
  const [BAStudents, setBAStudents] = createStore([]);
  const [DipStudents, setDipStudents] = createStore([]);
  const [MAStudentsEmpty, setMAStudentsEmpty] = createSignal(false);
  const [NewStudentsEmpty, setNewStudentsEmpty] = createSignal(false);
  const [PGDTStudentsEmpty, setPGDTStudentsEmpty] = createSignal(false);
  const [BAStudentsEmpty, setBAStudentsEmpty] = createSignal(false);
  const [DipStudentsEmpty, setDipStudentsEmpty] = createSignal(false);

  const VITE_API_URL = import.meta.env["VITE_API_URL"];

  const fetchRegistrations = async () => {
    const navigate = useNavigate();
    if (
      localStorage.getItem("jetsUser") &&
      JSON.parse(localStorage.getItem("jetsUser")).role === "admin"
    ) {
      const response = await fetch(
        VITE_API_URL +
          "/api/user/" +
          JSON.parse(localStorage.getItem("jetsUser")).custom_id,
        {
          mode: "cors",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("jetsUser")).token
            }`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          method: "GET",
        }
      );
      const result = await response.json();
      if (result.response === "Expired token") {
        localStorage.removeItem("jetsUser");
        navigate("/", { replace: true });
      } else {
        await fetchPeriod();
        const request1 = fetch(
          VITE_API_URL + "/api/view-registrations/" + params.periodId,
          {
            mode: "cors",
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("jetsUser")).token
              }`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            method: "GET",
          }
        ).then((response) => response.json());

        const request2 = fetch(VITE_API_URL + "/api/view-users", {
          mode: "cors",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("jetsUser")).token
            }`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          method: "GET",
        }).then((response) => response.json());

        const request3 = fetch(VITE_API_URL + "/api/view-students", {
          mode: "cors",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("jetsUser")).token
            }`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          method: "GET",
        }).then((response) => response.json());

        Promise.all([request1, request2, request3])
          .then(([data1, data2, data3]) => {
            var registrations = data1.response;
            var allUsers = data2.response;
            var allStudents = data3.response;

            const NewStudents_array = [];

            for (let i = 0; i < registrations.length; i++) {
              if (
                registrations[i].registration_status === "completed" &&
                registrations[i].fresh_returning === "new"
              ) {
                const new_student = allStudents.find(
                  (allStudent) =>
                    allStudent.custom_id === registrations[i].custom_id
                );
                if (typeof new_student !== "undefined") {
                  const user = allUsers.find(
                    (allUser) => allUser.custom_id === new_student.custom_id
                  );
                  var student = {
                    ledger_number: new_student.ledger_number,
                    programme: new_student.programme,
                    surname: user.surname,
                    first_name: user.first_name,
                    other_names: user.other_names,
                    student_id: user.username,
                    custom_id: new_student.custom_id,
                    status: registrations[i].registration_status,
                    undertaking: registrations[i].undertaking,
                    fresh_returning: registrations[i].fresh_returning,
                    current_level: registrations[i].current_level,
                  };
                  NewStudents_array.push(student);
                }
              }
            }

            setNewStudents(NewStudents_array);

            if (NewStudents_array.length < 1) {
              setNewStudentsEmpty(true);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      return {
        NewStudents,
      };
    } else {
      navigate("/", { replace: true });
    }
  };

  const fetchPeriod = async () => {
    try {
      const res = await fetch(VITE_API_URL + "/api/period/" + params.periodId, {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("jetsUser")).token
          }`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "GET",
      });
      const result = await res.json();
      setSemester(result.response.semester);
      setSession(result.response.session);
    } catch (error) {
      console.error(error);
    }
  };

  const [resources] = createResource(fetchRegistrations);

  return (
    <MetaProvider>
      <Title>New Students Log - ECWA Theological Seminary, Jos (JETS)</Title>
      <Meta
        name="description"
        content="New Students Log on ECWA Theological Seminary, Jos (JETS)"
      />
      <div class="text-sm">
        <Header />
        <div class="mt-8 w-11/12 mx-auto space-y-4">
          <h2 class="text-lg font-semibold text-center border-b border-red-600">
            New Students Log{" "}
            <Show when={session() !== "" && semester() !== ""}>
              <span class="block font-normal capitalize">
                {semester()} Semester - {session()} Session
              </span>
            </Show>
          </h2>
          <div class="bg-yellow-100 rounded-md border border-yellow-200  p-1 space-y-0.5">
            <b class="block">Instruction:</b>
            <p>
              Here's a list of all new students that have completed registration
              for the chosen semester.
            </p>
          </div>
          <div class="border border-gray-600 shadow-md rounded p-1 lg:p-4 overflow-y-scroll">
            <Show
              when={resources.loading}
              fallback={
                <div class="space-y-6">
                  <table cellPadding={0} cellSpacing={0} class="w-full my-4">
                    <thead class="bg-blue-950 text-white border-b border-black">
                      <tr>
                        <td class="p-4 border-r border-black">#.</td>
                        <td class="p-4 border-r border-black">Fullname</td>
                        <td class="p-4 border-r border-black">Prog.</td>
                        <td class="p-4 border-r border-black">Stud. ID</td>
                        <td class="p-4 border-r border-black">Ledger No.</td>
                        <td class="p-4">Year</td>
                      </tr>
                    </thead>
                    <tbody>
                      <Show
                        when={
                          resources().NewStudents.length !== "undefined" &&
                          resources().NewStudents.length > 0
                        }
                        fallback={
                          <Show
                            when={NewStudentsEmpty()}
                            fallback={
                              <tr class="border-b border-black">
                                <td colSpan={6} class="p-4 text-center">
                                  <Loading />
                                </td>
                              </tr>
                            }
                          >
                            <tr class="border-b border-black">
                              <td colSpan={6} class="p-4 text-center">
                                No record(s) found.
                              </td>
                            </tr>
                          </Show>
                        }
                      >
                        <For each={resources().NewStudents}>
                          {(registration, i) => (
                            <tr class="even:bg-gray-200 odd:bg-white border-b border-black">
                              <td class="p-4 font-semibold border-r border-black">
                                {i() + 1}.
                              </td>
                              <td class="p-4 border-r border-black space-x-1">
                                <b class="uppercase">{registration.surname}</b>
                                <span class="capitalize">
                                  {registration.first_name}
                                </span>
                                <span class="capitalize">
                                  {registration.other_names}
                                </span>
                              </td>
                              <td class="p-4 border-r border-black">
                                {registration.programme}
                              </td>
                              <td class="p-4 border-r border-black">
                                {registration.student_id}
                              </td>
                              <td class="p-4 border-r border-black">
                                {registration.ledger_number}
                              </td>
                              <td class="p-4">
                                {registration.current_level} (
                                <span class="uppercase">
                                  {registration.fresh_returning}
                                </span>{" "}
                                Student )
                              </td>
                            </tr>
                          )}
                        </For>
                      </Show>
                    </tbody>
                  </table>
                </div>
              }
            >
              <div class="p-1 text-center">
                <Loading />
              </div>
            </Show>
          </div>
        </div>
      </div>
    </MetaProvider>
  );
}
