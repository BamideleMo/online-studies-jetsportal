import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { A, useNavigate } from "@solidjs/router";

import Header from "../components/Header";
import { Show, createResource, createSignal } from "solid-js";
import Loading from "../components/Loading";
import { createStore } from "solid-js/store";

export default function PrintOuts() {
  const VITE_API_URL = import.meta.env["VITE_API_URL"];
  const [loading, setLoading] = createSignal(true);
  const [registrations, setRegistrations] = createStore([]);

  const periodsObj = {};
  const fetchAll = async () => {
    const navigate = useNavigate();
    if (localStorage.getItem("jetsUser")) {
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
            "Cache-Control": "no-cache",
          },
          method: "GET",
        }
      );
      const result = await response.json();
      if (result.response === "Expired token") {
        localStorage.removeItem("jetsUser");
        navigate("/", { replace: true });
      } else if (result.response.status === "change password") {
        navigate("/student/change-default-password", { replace: true });
      } else if (result.response.status === "upload passport") {
        navigate("/student/passport", { replace: true });
      } else if (result.response.status === "complete profile") {
        navigate("/student/complete-profile", { replace: true });
      } else {
        try {
          const response = await fetch(
            VITE_API_URL +
              "/api/view-registrations-by-student/" +
              JSON.parse(localStorage.getItem("jetsUser")).custom_id,
            {
              mode: "cors",
              headers: {
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem("jetsUser")).token
                }`,
                "Content-Type": "application/json",
                Accept: "application/json",
                "Cache-Control": "no-cache",
              },
              method: "GET",
            }
          );
          const result = await response.json();

          for (let i = 0; i < result.response.length; i++) {
            const response = await fetch(
              VITE_API_URL + "/api/period/" + result.response[i].period_id,
              {
                mode: "cors",
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("jetsUser")).token
                  }`,
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "Cache-Control": "no-cache",
                },
                method: "GET",
              }
            );
            const result2 = await response.json();
            periodsObj[result.response[i].period_id] = [
              result2.response.semester,
              result2.response.session,
            ];
          }

          setRegistrations(result.response);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }

      return {
        registrations,
      };
    } else {
      navigate("/", { replace: true });
    }
  };

  const [resources] = createResource(fetchAll);
  return (
    <MetaProvider>
      <Title>Print Outs - ECWA Theological Seminary, Jos (JETS)</Title>
      <Meta
        name="description"
        content="Print Outs on ECWA Theological Seminary, Jos (JETS)"
      />
      <div class="text-sm">
        <Header />
        <Show when={!loading()} fallback={<Loading />}>
          <div class="mt-8 mb-20 w-11/12 mx-auto space-y-4">
            <h2 class="text-lg font-semibold text-center border-b border-red-600">
              Print Outs
            </h2>
            <div class="bg-yellow-100 rounded-md border border-yellow-200 p-1 space-y-0.5">
              <b class="block">Instruction:</b>
              <p>
                You are REQUIRED to print and keep copies of these documents for
                future use.
              </p>
            </div>
            <div class="border border-gray-600 shadow-md rounded p-1 lg:p-4">
              <div class="space-y-6">
                <div class="overflow-x-auto">
                  <table
                    cellPadding={0}
                    cellSpacing={0}
                    class="w-full my-4 border border-black"
                  >
                    <thead>
                      <tr class="bg-blue-950 text-white border-b border-black">
                        <th class="p-4" colSpan={6}>
                          Print Registration Forms
                        </th>
                      </tr>
                      <tr class="text-left border-b border-black">
                        <th
                          class="p-4 border-r border-black"
                          id="registration-forms"
                        >
                          #.
                        </th>
                        <th class="p-4 border-r border-black">Year</th>
                        <th class="p-4 border-r border-black">Semester</th>
                        <th class="p-4 border-r border-black">Session</th>
                        <th class="p-4 border-r border-black">
                          Registration Status
                        </th>
                        <th class="p-4 border-r border-black">?</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Show
                        when={resources.loading}
                        fallback={
                          <Show
                            when={resources().registrations.length > 0}
                            fallback={
                              <tr>
                                <td colSpan={6} class="p-3 text-center">
                                  No record found.
                                </td>
                              </tr>
                            }
                          >
                            <For each={resources().registrations}>
                              {(registration, i) => (
                                <tr class="text-left border-b border-black">
                                  <td class="p-4 border-r border-black font-semibold">
                                    {i() + 1}.
                                  </td>
                                  <td class="p-4 border-r border-black">
                                    {registration.current_level}
                                  </td>
                                  <td class="p-4 border-r border-black">
                                    <span class="capitalize">
                                      {periodsObj[registration.period_id][0]}
                                    </span>
                                  </td>
                                  <td class="p-4 border-r border-black">
                                    {periodsObj[registration.period_id][1]}
                                  </td>
                                  <td class="p-4 border-r border-black">
                                    <span class="capitalize">
                                      {registration.registration_status}
                                    </span>
                                  </td>
                                  <td class="p-4 border-r border-black">
                                    <Show
                                      when={
                                        registration.registration_status ===
                                        "completed"
                                      }
                                      fallback={
                                        <span
                                          disabled
                                          class="gray-btn p-3 cursor-not-allowed line-through"
                                        >
                                          Print
                                        </span>
                                      }
                                    >
                                      <A
                                        target="_blank"
                                        href={
                                          "/student/print-registration-form/" +
                                          registration.period_id +
                                          "/" +
                                          JSON.parse(
                                            localStorage.getItem("jetsUser")
                                          ).custom_id
                                        }
                                        class="green-btn p-3 hover:opacity-60"
                                      >
                                        Print
                                      </A>
                                    </Show>
                                  </td>
                                </tr>
                              )}
                            </For>
                          </Show>
                        }
                      >
                        <tr class="text-left border-b border-black">
                          <td class="p-4 border-r border-black" colSpan={6}>
                            Fetching.. .
                          </td>
                        </tr>
                      </Show>
                    </tbody>
                  </table>
                </div>
                <div class="overflow-x-auto">
                  <table
                    cellPadding={0}
                    cellSpacing={0}
                    class="w-full my-4 border border-black"
                  >
                    <thead>
                      <tr class="bg-blue-950 text-white border-b border-black">
                        <th class="p-4" colSpan={6}>
                          Print Add/Drop Forms
                        </th>
                      </tr>
                      <tr class="text-left border-b border-black">
                        <th
                          class="p-4 border-r border-black"
                          id="registration-forms"
                        >
                          #.
                        </th>
                        <th class="p-4 border-r border-black">Year</th>
                        <th class="p-4 border-r border-black">Semester</th>
                        <th class="p-4 border-r border-black">Session</th>
                        <th class="p-4 border-r border-black">
                          Add/Drop Status
                        </th>
                        <th class="p-4 border-r border-black">?</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Show
                        when={resources.loading}
                        fallback={
                          <Show
                            when={resources().registrations.length > 0}
                            fallback={
                              <tr>
                                <td colSpan={6} class="p-3 text-center">
                                  No record found.
                                </td>
                              </tr>
                            }
                          >
                            <For each={resources().registrations}>
                              {(registration, i) => (
                                <tr class="text-left border-b border-black">
                                  <td class="p-4 border-r border-black font-semibold">
                                    {i() + 1}.
                                  </td>
                                  <td class="p-4 border-r border-black">
                                    {registration.current_level}
                                  </td>
                                  <td class="p-4 border-r border-black">
                                    <span class="capitalize">
                                      {periodsObj[registration.period_id][0]}
                                    </span>
                                  </td>
                                  <td class="p-4 border-r border-black">
                                    {periodsObj[registration.period_id][1]}
                                  </td>
                                  <td class="p-4 border-r border-black">
                                    <span class="capitalize">
                                      {registration.add_drop_status}
                                    </span>
                                  </td>
                                  <td class="p-4 border-r border-black">
                                    <Show
                                      when={
                                        registration.add_drop_status ===
                                        "completed"
                                      }
                                      fallback={
                                        <span
                                          disabled
                                          class="gray-btn p-3 cursor-not-allowed line-through"
                                        >
                                          Print
                                        </span>
                                      }
                                    >
                                      <A
                                        target="_blank"
                                        href={
                                          "/student/print-add-drop-form/" +
                                          registration.period_id +
                                          "/" +
                                          JSON.parse(
                                            localStorage.getItem("jetsUser")
                                          ).custom_id
                                        }
                                        class="green-btn p-3 hover:opacity-60"
                                      >
                                        Print
                                      </A>
                                    </Show>
                                  </td>
                                </tr>
                              )}
                            </For>
                          </Show>
                        }
                      >
                        <tr class="text-left border-b border-black">
                          <td class="p-4 border-r border-black" colSpan={6}>
                            Fetching.. .
                          </td>
                        </tr>
                      </Show>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Show>
      </div>
    </MetaProvider>
  );
}
