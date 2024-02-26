import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { Show, createSignal, createResource, Switch, Match } from "solid-js";
import { createStore } from "solid-js/store";

import Header from "../components/Header";
import { Select } from "../components/Select";
import TextInput from "../components/TextInput";
import Success from "../components/icons/Success";

const schema = z.object({
  undergraduate_postgraduate: z.string().min(1, "*Required"),
  new_returning: z.string().min(1, "*Required"),
  item: z.string().min(1, "*Required"),
  amount: z.string().min(1, "*Required"),
});

const VITE_API_URL = import.meta.env["VITE_API_URL"];

const [uGNewStudent, setUGNewStudent] = createStore([]);
const [uGReturningStudent, setUGReturningStudent] = createStore([]);
const [pGNewStudent, setPGNewStudent] = createStore([]);
const [pGReturningStudent, setPGReturningStudent] = createStore([]);
const [showWhat, setShowWhat] = createSignal("");

const fetchCharges = async () => {
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
          "Cache-Control": "no-cache",
        },
        method: "GET",
      }
    );
    const result = await response.json();
    if (result.response === "Expired token") {
      localStorage.removeItem("jetsUser");
      navigate("/", { replace: true });
    } else {
      fetch(VITE_API_URL + "/api/view-charges", {
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
      })
        .then((res1) => {
          return res1.json();
        })
        .then((data1) => {
          if (
            data1.response[0].new_student &&
            data1.response[0].new_student !== "undefined"
          ) {
            setUGNewStudent(JSON.parse(data1.response[0].new_student));
          }
          if (
            data1.response[0].returning_student &&
            data1.response[0].returning_student !== "undefined"
          ) {
            setUGReturningStudent(
              JSON.parse(data1.response[0].returning_student)
            );
          }
          if (
            data1.response[1].new_student &&
            data1.response[1].new_student !== "undefined"
          ) {
            setPGNewStudent(JSON.parse(data1.response[1].new_student));
          }
          if (
            data1.response[1].returning_student &&
            data1.response[1].returning_student !== "undefined"
          ) {
            setPGReturningStudent(
              JSON.parse(data1.response[1].returning_student)
            );
          }
          console.log(data1);
        })
        .catch((error) => {
          console.error(error);
        });

      return {
        uGNewStudent,
        pGNewStudent,
        uGReturningStudent,
        pGReturningStudent,
      };
    }
  } else {
    navigate("/", { replace: true });
  }
};

export default function ManageAdminCharges() {
  const [isProcessing, setIsProcessing] = createSignal(false);
  const [message, setMessage] = createSignal("");
  const [showModal, setShowModal] = createSignal(false);
  const [showSuccess, setShowSuccess] = createSignal(false);
  const [showSuccess2, setShowSuccess2] = createSignal(false);

  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const ugnewstudentObj = {};
  const ugreturningstudentObj = {};
  const pgnewstudentObj = {};
  const pgreturningstudentObj = {};
  const submit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (
      formData().undergraduate_postgraduate === "undergraduate" &&
      formData().new_returning === "new"
    ) {
      if (Object.keys(uGNewStudent).length > 0) {
        console.log(uGNewStudent);
        for (let key in uGNewStudent) {
          console.log(key, `${uGNewStudent[key]}`);
          ugnewstudentObj[key] = uGNewStudent[key];
        }
        ugnewstudentObj[formData().item] = formData().amount;

        var theData = JSON.stringify({
          new_student: ugnewstudentObj,
        });
      } else {
        ugnewstudentObj[formData().item] = formData().amount;
        console.log(ugnewstudentObj);
        var theData = JSON.stringify({
          new_student: ugnewstudentObj,
        });
      }
    }
    if (
      formData().undergraduate_postgraduate === "undergraduate" &&
      formData().new_returning === "returning"
    ) {
      if (Object.keys(uGReturningStudent).length > 0) {
        console.log(uGReturningStudent);
        for (let key in uGReturningStudent) {
          ugreturningstudentObj[key] = uGReturningStudent[key];
        }
        ugreturningstudentObj[formData().item] = formData().amount;

        var theData = JSON.stringify({
          returning_student: ugreturningstudentObj,
        });
      } else {
        ugreturningstudentObj[formData().item] = formData().amount;
        var theData = JSON.stringify({
          returning_student: ugreturningstudentObj,
        });
      }
    }
    if (
      formData().undergraduate_postgraduate === "postgraduate" &&
      formData().new_returning === "new"
    ) {
      if (Object.keys(pGNewStudent).length > 0) {
        console.log(pGNewStudent);
        for (let key in pGNewStudent) {
          pgnewstudentObj[key] = pGNewStudent[key];
        }
        pgnewstudentObj[formData().item] = formData().amount;

        var theData = JSON.stringify({
          new_student: pgnewstudentObj,
        });
      } else {
        pgnewstudentObj[formData().item] = formData().amount;
        var theData = JSON.stringify({
          new_student: pgnewstudentObj,
        });
      }
    }
    if (
      formData().undergraduate_postgraduate === "postgraduate" &&
      formData().new_returning === "returning"
    ) {
      if (Object.keys(pGReturningStudent).length > 0) {
        console.log(pGReturningStudent);
        for (let key in pGReturningStudent) {
          pgreturningstudentObj[key] = pGReturningStudent[key];
        }
        pgreturningstudentObj[formData().item] = formData().amount;

        var theData = JSON.stringify({
          returning_student: pgreturningstudentObj,
        });
      } else {
        pgreturningstudentObj[formData().item] = formData().amount;
        var theData = JSON.stringify({
          returning_student: pgreturningstudentObj,
        });
      }
    }

    try {
      const response = await fetch(
        VITE_API_URL +
          "/api/edit-charge/" +
          formData().undergraduate_postgraduate,
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
          method: "PATCH",
          body: theData,
        }
      );

      const result = await response.json();

      if (!result.success) {
        setMessage(result.response);
        setIsProcessing(false);
      } else {
        setIsProcessing(false);
        setShowSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const update = async (code, status) => {
    setIsProcessing(true);

    try {
      const response = await fetch(VITE_API_URL + "/api/edit-course/" + code, {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("jetsUser")).token
          }`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        method: "PATCH",
        body: JSON.stringify({
          status: status !== "available" ? "available" : "unavailable",
        }),
      });

      const result = await response.json();

      if (!result.success) {
        console.log(result);
        setIsProcessing(false);
      } else {
        setIsProcessing(false);
        setShowSuccess2(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [charges] = createResource(fetchCharges);

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  return (
    <MetaProvider>
      <Title>
        Manage Admin Charges - ECWA Theological Seminary, Jos (JETS)
      </Title>
      <Meta
        name="description"
        content="Manage Admin Charges on ECWA Theological Seminary, Jos (JETS)"
      />
      <div class="text-sm">
        <Show when={showModal()}>
          <div class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90 h-screen w-screen flex items-center">
            <div class="w-80 sm:w-10/12 lg:w-6/12 mx-auto bg-white rounded-md p-6">
              <h2 class="text-center text-blue-900 font-semibold">
                Input New Charge
              </h2>
              <Show
                when={showSuccess()}
                fallback={
                  <div class="my-2 border-t border-b py-4 border-black">
                    <form
                      autocomplete="off"
                      onSubmit={submit}
                      class="space-y-4"
                    >
                      <div>
                        <Select
                          label="Undergraduate or Postgraduate:"
                          name="undergraduate_postgraduate"
                          placeholder="Select"
                          required={true}
                          options={[
                            {
                              value: "undergraduate",
                              label: "Undergraduate",
                            },
                            {
                              value: "postgraduate",
                              label: "Postgraduate",
                            },
                          ]}
                          formHandler={formHandler}
                        />
                      </div>
                      <div>
                        <Select
                          label="New or Returning Students:"
                          name="new_returning"
                          placeholder="Select"
                          required={true}
                          options={[
                            {
                              value: "new",
                              label: "New Student",
                            },
                            {
                              value: "returning",
                              label: "Returning Student",
                            },
                          ]}
                          formHandler={formHandler}
                        />
                      </div>
                      <div>
                        <Select
                          label="Item:"
                          name="item"
                          placeholder="Select"
                          required={true}
                          options={[
                            {
                              label: "Adminsitrative Services",
                              value: "admin",
                            },
                            {
                              label: "New Student Matriculation",
                              value: "matric",
                            },
                            {
                              label: "Examination/Stationery",
                              value: "exam",
                            },
                            {
                              label: "Library Use and Services",
                              value: "library",
                            },
                            {
                              label: "ICT Dev & Internet Access",
                              value: "ict",
                            },
                            {
                              label: "ECWA Education Dept Levy",
                              value: "ecwa",
                            },
                            {
                              label: "Campus Dev. Levy",
                              value: "campus",
                            },
                            {
                              label: "Seminary Student/Library ID Card",
                              value: "card",
                            },
                            {
                              label: "ACTEA Accreditation",
                              value: "actea",
                            },
                            {
                              label: "Health Insurance",
                              value: "insurance",
                            },
                            {
                              label: "SUG Charges",
                              value: "sug",
                            },
                            {
                              label: "Late Registration",
                              value: "late",
                            },
                            {
                              label: "Academic Catalogue",
                              value: "catalogue",
                            },
                          ]}
                          formHandler={formHandler}
                        />
                      </div>
                      <div>
                        <TextInput
                          label="Amount:"
                          name="amount"
                          required={true}
                          type="number"
                          formHandler={formHandler}
                        />
                      </div>
                      <Show when={message() !== ""}>
                        <div class="bg-purple-200 text-purple-900 p-3 text-center animate-pulse border-l-2 border-black">
                          {message()}
                        </div>
                      </Show>
                      <div class="text-right space-x-3">
                        <Show
                          when={formHandler.isFormInvalid()}
                          fallback={
                            <>
                              <Show
                                when={isProcessing()}
                                fallback={
                                  <button
                                    type="submit"
                                    class="red-btn p-3 hover:opacity-60"
                                  >
                                    Submit
                                  </button>
                                }
                              >
                                <button
                                  disabled
                                  class="gray-btn cursor-wait p-3"
                                >
                                  Processing.. .
                                </button>
                              </Show>
                            </>
                          }
                        >
                          <button
                            disabled
                            class="gray2-btn p-3 cursor-not-allowed"
                          >
                            Submit
                          </button>
                        </Show>
                        <button
                          onClick={() => setShowModal(false)}
                          class="gray-btn text-white p-3 hover:opacity-60"
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                }
              >
                <div class="my-2 border-t border-b py-4 border-black text-center">
                  <Success />
                  <p>The specified fee was inputed successfully!</p>
                </div>
                <div class="text-right space-x-3">
                  <button
                    onClick={() =>
                      (window.location.href = "/admin/manage-admin-charges")
                    }
                    class="blue-btn text-white p-3 hover:opacity-60"
                  >
                    Ok. Continue
                  </button>
                </div>
              </Show>
            </div>
          </div>
        </Show>
        <Show when={showSuccess2()}>
          <div class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90 h-screen w-screen flex items-center">
            <div class="w-80 sm:w-10/12 lg:w-6/12 mx-auto bg-white rounded-md p-6">
              <h2 class="text-center text-blue-900 font-semibold">
                Status Changed
              </h2>
              <div class="my-2 border-t border-b py-4 border-black text-center">
                <Success />
                <p>
                  The status of the particular course was changed successfully!
                </p>
              </div>
              <div class="text-right space-x-3">
                <button
                  onClick={() =>
                    (window.location.href = "/admin/manage-courses")
                  }
                  class="blue-btn text-white p-3 hover:opacity-60"
                >
                  Ok. Continue
                </button>
              </div>
            </div>
          </div>
        </Show>
        <Header />
        <div class="mt-8 w-11/12 mx-auto space-y-4">
          <h2 class="text-lg font-semibold text-center border-b border-red-600">
            Manage Charges
          </h2>
          <div class="bg-yellow-100 rounded-md border border-yellow-200 p-1 space-y-0.5">
            <b class="block">Instruction:</b>
            <p>Input and manage admin charges here.</p>
          </div>
          <div class="border border-gray-600 shadow-md rounded p-2 lg:p-4">
            <Show
              when={charges.loading}
              fallback={
                <div>
                  <span>
                    +
                    <span
                      onClick={() => setShowModal(true)}
                      class="border-b border-red-600 font-semibold hover:opacity-60 cursor-pointer"
                    >
                      Input New Charge
                    </span>
                  </span>
                  <div class="mt-3 flex space-x-4">
                    <Switch>
                      <Match when={charges().uGNewStudent}>
                        <span
                          onClick={() => setShowWhat("ug_new")}
                          class="blue-btn p-3 cursor-pointer hover:opacity-60"
                        >
                          UG New
                        </span>
                      </Match>
                    </Switch>
                    <span
                      onClick={() => setShowWhat("ug_returning")}
                      class="blue-btn p-3 cursor-pointer hover:opacity-60"
                    >
                      UG Returning
                    </span>
                    <span
                      onClick={() => setShowWhat("pg_new")}
                      class="blue-btn p-3 cursor-pointer hover:opacity-60"
                    >
                      PG New
                    </span>
                    <span
                      onClick={() => setShowWhat("pg_returning")}
                      class="blue-btn p-3 cursor-pointer hover:opacity-60"
                    >
                      PG Returning
                    </span>
                  </div>
                </div>
              }
            >
              Wait.. .
            </Show>

            <div class="overflow-x-auto">
              <table
                cellPadding={0}
                cellSpacing={0}
                class="w-full my-4 border border-black"
              >
                <thead class="bg-blue-950 text-white border-b border-black">
                  <tr>
                    <td class="p-4 border-r border-black">#.</td>
                    <td class="p-4 border-r border-black">Item</td>
                    <td class="p-4 border-r border-black">Amount</td>
                    <td class="p-4">Update</td>
                  </tr>
                </thead>
                <tbody>
                  <Show
                    when={charges.loading}
                    fallback={
                      <Switch>
                        <Match when={showWhat() === "ug_new"}>
                          <>
                            <tr class="border-b border-bottom">
                              <td
                                class="font-semibold text-center p-4"
                                colSpan={4}
                              >
                                Undergraduate: New Students
                              </td>
                            </tr>
                            <Show
                              when={charges().uGNewStudent}
                              fallback={
                                <tr class="border-b border-bottom">
                                  <td class="p-4 text-center" colSpan={4}>
                                    No record(s) found
                                  </td>
                                </tr>
                              }
                            >
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">1.</td>
                                <td class="p-4">Administrative Services</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGNewStudent["admin"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().uGNewStudent["admin"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">2.</td>
                                <td class="p-4">New Student Matriculation</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGNewStudent["matric"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().uGNewStudent["matric"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">3.</td>
                                <td class="p-4">Examination/Stationery</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGNewStudent["exam"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().uGNewStudent["exam"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">4.</td>
                                <td class="p-4">Library Use and Services</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGNewStudent["library"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().uGNewStudent["library"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">5.</td>
                                <td class="p-4">ICT Dev. & Internet Access</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGNewStudent["ict"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().uGNewStudent["ict"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">6.</td>
                                <td class="p-4">ECWA Education Dept Levy</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGNewStudent["ecwa"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().uGNewStudent["ecwa"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">7.</td>
                                <td class="p-4">Campus Development Levy</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGNewStudent["campus"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().uGNewStudent["campus"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">8.</td>
                                <td class="p-4">
                                  Seminary Student/Library ID Card
                                </td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGNewStudent["card"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().uGNewStudent["card"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">9.</td>
                                <td class="p-4">
                                  ACTEA Accreditation/Services
                                </td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGNewStudent["actea"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().uGNewStudent["actea"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">10.</td>
                                <td class="p-4">Health Insurance</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGNewStudent["insurance"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().uGNewStudent["insurance"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">11.</td>
                                <td class="p-4">SUG Charges</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGNewStudent["sug"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().uGNewStudent["sug"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">12.</td>
                                <td class="p-4">Late Registration</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGNewStudent["late"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().uGNewStudent["late"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">13.</td>
                                <td class="p-4">Academic Catalogue</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGNewStudent["catalogue"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().uGNewStudent["catalogue"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                            </Show>
                          </>
                        </Match>
                        <Match when={showWhat() === "pg_new"}>
                          <>
                            <tr class="border-b border-bottom">
                              <td
                                class="font-semibold text-center p-4"
                                colSpan={4}
                              >
                                Postgraduate: New Students
                              </td>
                            </tr>
                            <Show
                              when={charges().pGNewStudent}
                              fallback={
                                <tr class="border-b border-bottom">
                                  <td class="p-4 text-center" colSpan={4}>
                                    No record(s) found
                                  </td>
                                </tr>
                              }
                            >
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">1.</td>
                                <td class="p-4">Administrative Services</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGNewStudent["admin"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().pGNewStudent["admin"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">2.</td>
                                <td class="p-4">New Student Matriculation</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGNewStudent["matric"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().pGNewStudent["matric"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">3.</td>
                                <td class="p-4">Examination/Stationery</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGNewStudent["exam"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().pGNewStudent["exam"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">4.</td>
                                <td class="p-4">Library Use and Services</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGNewStudent["library"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().pGNewStudent["library"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">5.</td>
                                <td class="p-4">ICT Dev. & Internet Access</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGNewStudent["ict"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().pGNewStudent["ict"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">6.</td>
                                <td class="p-4">ECWA Education Dept Levy</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGNewStudent["ecwa"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().pGNewStudent["ecwa"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">7.</td>
                                <td class="p-4">Campus Development Levy</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGNewStudent["campus"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().pGNewStudent["campus"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">8.</td>
                                <td class="p-4">
                                  Seminary Student/Library ID Card
                                </td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGNewStudent["card"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().pGNewStudent["card"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">9.</td>
                                <td class="p-4">
                                  ACTEA Accreditation/Services
                                </td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGNewStudent["actea"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().pGNewStudent["actea"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">10.</td>
                                <td class="p-4">Health Insurance</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGNewStudent["insurance"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().pGNewStudent["insurance"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">11.</td>
                                <td class="p-4">SUG Charges</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGNewStudent["sug"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().pGNewStudent["sug"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">12.</td>
                                <td class="p-4">Late Registration</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGNewStudent["late"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(charges().pGNewStudent["late"])
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">13.</td>
                                <td class="p-4">Academic Catalogue</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGNewStudent["catalogue"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().pGNewStudent["catalogue"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                            </Show>
                          </>
                        </Match>

                        <Match when={showWhat() === "ug_returning"}>
                          <>
                            <tr class="border-b border-bottom">
                              <td
                                class="font-semibold text-center p-4"
                                colSpan={4}
                              >
                                Undergraduate: New Students
                              </td>
                            </tr>
                            <Show
                              when={charges().uGReturningStudent}
                              fallback={
                                <tr class="border-b border-bottom">
                                  <td class="p-4 text-center" colSpan={4}>
                                    No record(s) found
                                  </td>
                                </tr>
                              }
                            >
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">1.</td>
                                <td class="p-4">Administrative Services</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGReturningStudent["admin"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().uGReturningStudent["admin"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">2.</td>
                                <td class="p-4">New Student Matriculation</td>
                                <td class="p-4">
                                  <Show
                                    when={
                                      charges().uGReturningStudent["matric"]
                                    }
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().uGReturningStudent["matric"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">3.</td>
                                <td class="p-4">Examination/Stationery</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGReturningStudent["exam"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().uGReturningStudent["exam"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">4.</td>
                                <td class="p-4">Library Use and Services</td>
                                <td class="p-4">
                                  <Show
                                    when={
                                      charges().uGReturningStudent["library"]
                                    }
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().uGReturningStudent["library"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">5.</td>
                                <td class="p-4">ICT Dev. & Internet Access</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGReturningStudent["ict"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().uGReturningStudent["ict"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">6.</td>
                                <td class="p-4">ECWA Education Dept Levy</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGReturningStudent["ecwa"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().uGReturningStudent["ecwa"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">7.</td>
                                <td class="p-4">Campus Development Levy</td>
                                <td class="p-4">
                                  <Show
                                    when={
                                      charges().uGReturningStudent["campus"]
                                    }
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().uGReturningStudent["campus"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">8.</td>
                                <td class="p-4">
                                  Seminary Student/Library ID Card
                                </td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGReturningStudent["card"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().uGReturningStudent["card"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">9.</td>
                                <td class="p-4">
                                  ACTEA Accreditation/Services
                                </td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGReturningStudent["actea"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().uGReturningStudent["actea"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">10.</td>
                                <td class="p-4">Health Insurance</td>
                                <td class="p-4">
                                  <Show
                                    when={
                                      charges().uGReturningStudent["insurance"]
                                    }
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().uGReturningStudent[
                                          "insurance"
                                        ]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">11.</td>
                                <td class="p-4">SUG Charges</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGReturningStudent["sug"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().uGReturningStudent["sug"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">12.</td>
                                <td class="p-4">Late Registration</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().uGReturningStudent["late"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().uGReturningStudent["late"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">13.</td>
                                <td class="p-4">Academic Catalogue</td>
                                <td class="p-4">
                                  <Show
                                    when={
                                      charges().uGReturningStudent["catalogue"]
                                    }
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().uGReturningStudent[
                                          "catalogue"
                                        ]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                            </Show>
                          </>
                        </Match>

                        <Match when={showWhat() === "pg_returning"}>
                          <>
                            <tr class="border-b border-bottom">
                              <td
                                class="font-semibold text-center p-4"
                                colSpan={4}
                              >
                                Undergraduate: New Students
                              </td>
                            </tr>
                            <Show
                              when={charges().pGReturningStudent}
                              fallback={
                                <tr class="border-b border-bottom">
                                  <td class="p-4 text-center" colSpan={4}>
                                    No record(s) found
                                  </td>
                                </tr>
                              }
                            >
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">1.</td>
                                <td class="p-4">Administrative Services</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGReturningStudent["admin"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().pGReturningStudent["admin"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">2.</td>
                                <td class="p-4">New Student Matriculation</td>
                                <td class="p-4">
                                  <Show
                                    when={
                                      charges().pGReturningStudent["matric"]
                                    }
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().pGReturningStudent["matric"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">3.</td>
                                <td class="p-4">Examination/Stationery</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGReturningStudent["exam"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().pGReturningStudent["exam"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">4.</td>
                                <td class="p-4">Library Use and Services</td>
                                <td class="p-4">
                                  <Show
                                    when={
                                      charges().pGReturningStudent["library"]
                                    }
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().pGReturningStudent["library"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">5.</td>
                                <td class="p-4">ICT Dev. & Internet Access</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGReturningStudent["ict"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().pGReturningStudent["ict"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">6.</td>
                                <td class="p-4">ECWA Education Dept Levy</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGReturningStudent["ecwa"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().pGReturningStudent["ecwa"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">7.</td>
                                <td class="p-4">Campus Development Levy</td>
                                <td class="p-4">
                                  <Show
                                    when={
                                      charges().pGReturningStudent["campus"]
                                    }
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().pGReturningStudent["campus"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">8.</td>
                                <td class="p-4">
                                  Seminary Student/Library ID Card
                                </td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGReturningStudent["card"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().pGReturningStudent["card"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">9.</td>
                                <td class="p-4">
                                  ACTEA Accreditation/Services
                                </td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGReturningStudent["actea"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().pGReturningStudent["actea"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">10.</td>
                                <td class="p-4">Health Insurance</td>
                                <td class="p-4">
                                  <Show
                                    when={
                                      charges().pGReturningStudent["insurance"]
                                    }
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().pGReturningStudent[
                                          "insurance"
                                        ]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">11.</td>
                                <td class="p-4">SUG Charges</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGReturningStudent["sug"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().pGReturningStudent["sug"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">12.</td>
                                <td class="p-4">Late Registration</td>
                                <td class="p-4">
                                  <Show
                                    when={charges().pGReturningStudent["late"]}
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().pGReturningStudent["late"]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                              <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                                <td class="p-4 font-semibold">13.</td>
                                <td class="p-4">Academic Catalogue</td>
                                <td class="p-4">
                                  <Show
                                    when={
                                      charges().pGReturningStudent["catalogue"]
                                    }
                                    fallback={<>-</>}
                                  >
                                    {formatter.format(
                                      parseInt(
                                        charges().pGReturningStudent[
                                          "catalogue"
                                        ]
                                      )
                                    )}
                                  </Show>
                                </td>
                                <td>
                                  <button class="green-btn p-3">Update</button>
                                </td>
                              </tr>
                            </Show>
                          </>
                        </Match>
                      </Switch>
                    }
                  >
                    <tr class="">
                      <td class="p-4 text-center" colSpan={6}>
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
    </MetaProvider>
  );
}
