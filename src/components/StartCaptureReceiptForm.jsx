import { A, useNavigate } from "@solidjs/router";
import { useFormHandler } from "solid-form-handler";

import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";
import TextInput from "./TextInput";
import { createSignal, createResource } from "solid-js";
import { createStore } from "solid-js/store";

import CaptureReceiptForm from "./CaptureReceiptForm";
import Failure from "./icons/Failure";
import Loading from "./Loading";

const schema = z.object({
  ledger_number: z.string().min(7, "*Invalid"),
});

const VITE_API_URL = import.meta.env["VITE_API_URL"];

export default function StartCaptureReceiptForm() {
  const [isProcessing, setIsProcessing] = createSignal(false);
  const [student, setStudent] = createStore([]);
  const [showUserPop, setShowUserPop] = createSignal(false);
  const [portalWallet, setPortalWallet] = createSignal();
  const [accommodationWallet, setAccommodationWallet] = createSignal();
  const [receiptLog, setReceiptLog] = createStore([]);
  const [user, setUser] = createStore([]);
  const [periodId, setPeriodId] = createSignal("");
  const [captureStatus, setCaptureStatus] = createSignal("");

  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const fetchPeriods = async () => {
    const navigate = useNavigate();

    if (
      localStorage.getItem("jetsUser") &&
      JSON.parse(localStorage.getItem("jetsUser")).role === "admin"
    ) {
      try {
        const res = await fetch(VITE_API_URL + "/api/view-periods", {
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
        setPeriodId(result.response[0].period_id);
        return result.response[0];
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/", { replace: true });
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch(
        VITE_API_URL +
          "/api/view-student-by-ledger?ledger_number=" +
          formData().ledger_number,
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
      setStudent(result.response);
      setShowUserPop(true);
      setIsProcessing(false);
      if (Object.keys(student).length > 0) {
        const request1 = fetch(
          VITE_API_URL + "/api/portal-wallet/" + student[0].custom_id,
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
        const request2 = fetch(
          VITE_API_URL + "/api/user/" + student[0].custom_id,
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
        const request3 = fetch(
          VITE_API_URL + "/api/receipt/" + student[0].custom_id,
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
        const request4 = fetch(
          VITE_API_URL + "/api/accommodation-wallet/" + student[0].custom_id,
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
        const request5 = fetch(
          VITE_API_URL +
            "/api/registration/" +
            student[0].custom_id +
            "?period_id=" +
            periodId(),
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
        Promise.all([request1, request2, request3, request4, request5]).then(
          ([data1, data2, data3, data4, data5]) => {
            if (data5.response) {
              if (
                data5.response.registration_status === "completed" ||
                data5.response.registration_status === "incomplete"
              ) {
                setCaptureStatus("qualified");
              } else {
                setCaptureStatus("unqualified");
              }
            } else {
              setCaptureStatus("unqualified");
            }
            console.log(data5.response.registration_status, captureStatus());
            setPortalWallet(data1.response.amount);
            setAccommodationWallet(data4.response.amount);
            setUser(data2.response);
            if (data3.response) {
              setReceiptLog(JSON.parse(data3.response.log));
            }
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  const [periods] = createResource(fetchPeriods);

  return (
    <>
      <Show
        fallback={
          <div>
            <Show when={showUserPop()}>
              <div class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90 h-screen w-screen flex items-center">
                <Show
                  when={Object.keys(student).length > 0}
                  fallback={
                    <div class="w-80 sm:w-10/12 lg:w-6/12 mx-auto bg-white rounded-md p-6">
                      <h2 class="text-center text-blue-900 font-semibold">
                        Not Found
                      </h2>
                      <div class="my-2 border-t border-b py-4 border-black text-center">
                        <Failure />
                        <p class="text-center">
                          Inputed Ledger Number was not found.
                        </p>
                      </div>

                      <div class="text-right">
                        <button
                          onClick={() => setShowUserPop(false)}
                          class="gray2-btn text-white p-3 hover:opacity-60"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  }
                >
                  <div class="w-80 sm:w-10/12 lg:w-6/12 mx-auto bg-white rounded-md p-3 h-5/6 overflow-hidden">
                    <h2 class="text-center text-blue-900 font-semibold">
                      Capture Receipt
                    </h2>
                    <div class="my-2 border-t border-b border-black py-4 h-5/6 overflow-y-scroll">
                      <CaptureReceiptForm
                        user={user}
                        portalWallet={portalWallet()}
                        accommodationWallet={accommodationWallet()}
                        student={student}
                        log={receiptLog.length > 0 ? receiptLog : "no"}
                        capture_status={captureStatus()}
                      />
                      <Show when={receiptLog.length > 0}>
                        {console.log(receiptLog.sort())}
                      </Show>
                    </div>
                    <div class="text-right">
                      <button
                        onClick={() => setShowUserPop(false)}
                        class="gray2-btn text-white p-3 hover:opacity-60"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </Show>
              </div>
            </Show>
            <form autocomplete="off" onSubmit={submit} class="flex space-x-2">
              <div class="grow">
                <TextInput
                  label="Ledger Number:"
                  name="ledger_number"
                  required={true}
                  type="text"
                  formHandler={formHandler}
                />
              </div>
              <div class="w-34 pt-4">
                <Show
                  when={formHandler.isFormInvalid()}
                  fallback={
                    <>
                      <Show
                        when={isProcessing()}
                        fallback={
                          <button
                            type="submit"
                            class="red-btn w-full p-3 text-center hover:opacity-60"
                          >
                            Capture
                          </button>
                        }
                      >
                        <button
                          disabled
                          class="gray-btn cursor-none w-full p-3 text-center animate-pulse"
                        >
                          Wait.. .
                        </button>
                      </Show>
                    </>
                  }
                >
                  <button
                    disabled
                    class="gray2-btn w-full p-3 text-center cursor-not-allowed"
                  >
                    Capture
                  </button>
                </Show>
              </div>
            </form>
          </div>
        }
        when={periods.loading}
      >
        <Loading />
      </Show>
    </>
  );
}
