import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";

import Header from "../components/Header";
import TextInput from "../components/TextInput";
import { Select } from "../components/Select";
import { Show, createSignal, createEffect, Switch, Match } from "solid-js";
import Success from "../components/icons/Success";
import Loading from "../components/Loading";

const schema = z.object({
  ledger_number: z.string().min(7, "*Invalid").toUpperCase(),
  date_of_birth: z.string().min(1, "*Required"),
  state_of_origin: z.string().min(1, "*Required"),
  country_of_origin: z.string().min(1, "*Required"),
  denomination: z.string().min(1, "*Required"),
  local_church: z.string().min(1, "*Required"),
  name_of_pastor: z.string().min(1, "*Required"),
  work_fulltime: z.string().min(1, "*Required"),
  ministry: z.string().min(1, "*Required"),
  year_of_admission: z.string().min(1, "*Required"),
  programme_category: z.string().min(1, "*Required"),
  department: z.string().min(1, "*Required"),
  faculty: z.string().min(1, "*Required"),
  programme: z.string().min(1, "*Required"),
  affiliation_status: z.string().min(1, "*Required"),
  special_student_category: z.string().optional(),
});

export default function CompleteProfile() {
  const [isProcessing, setIsProcessing] = createSignal(false);
  const [message, setMessage] = createSignal("");
  const [showSuccess, setShowSuccess] = createSignal(false);
  const [loading, setLoading] = createSignal(true);
  const [studentId, setStudentId] = createSignal("");
  const [studentEmail, setStudentEmail] = createSignal("");
  const [matriculationNumber, setMatriculationNumber] = createSignal("");
  const VITE_API_URL = import.meta.env["VITE_API_URL"];

  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const doSetMatriculationNumber = async (programme, year) => {
    var yrr = year.toString();
    let yr = yrr.substring(2, 4);

    if (programme === "Bachelor of Arts in Theology (Theological Studies)") {
      setMatriculationNumber("JETS/UG" + yr + "/TS/" + studentId());
    }
    if (programme === "Bachelor of Arts in Theology (Pastoral Studies)") {
      setMatriculationNumber("JETS/UG" + yr + "/PS/" + studentId());
    }
    if (programme === "Bachelor of Arts in Theology (Christian Education)") {
      setMatriculationNumber("JETS/UG" + yr + "/CE/" + studentId());
    }
    if (programme === "Bachelor of Arts in Theology (Evangelism & Missions)") {
      setMatriculationNumber("JETS/UG" + yr + "/EM/" + studentId());
    }
    if (programme === "Bachelor of Arts in Theology (Biblical Studies)") {
      setMatriculationNumber("JETS/UG" + yr + "/BS/" + studentId());
    }
    if (programme === "Bachelor of Arts in Theology (Youth Ministry)") {
      setMatriculationNumber("JETS/UG" + yr + "/YM/" + studentId());
    }
    if (programme === "Post-Graduate Diploma of Theology") {
      setMatriculationNumber("JETS/PG" + yr + "/PGDT/" + studentId());
    }
    if (programme === "Master of Divinity (Pastoral Studies)") {
      setMatriculationNumber("JETS/PG" + yr + "/MD/" + studentId());
    }
    if (programme === "Master of Arts (Biblical Studies - Old Testament)") {
      setMatriculationNumber("JETS/PG" + yr + "/OT/" + studentId());
    }
    if (programme === "Master of Arts (Biblical Studies - New Testament)") {
      setMatriculationNumber("JETS/PG" + yr + "/NT/" + studentId());
    }
    if (programme === "Master of Arts (Systematic Theology)") {
      setMatriculationNumber("JETS/PG" + yr + "/ST/" + studentId());
    }
    if (programme === "Master of Arts (Church History & Historical Theology)") {
      setMatriculationNumber("JETS/PG" + yr + "/CH/" + studentId());
    }
    if (programme === "Master of Arts (Christian Ethics & Public Theology)") {
      setMatriculationNumber("JETS/PG" + yr + "/CP/" + studentId());
    }
    if (programme === "Master of Arts (Christian Apologetics)") {
      setMatriculationNumber("JETS/PG" + yr + "/CA/" + studentId());
    }
    if (programme === "Master of Arts (Pastoral Studies)") {
      setMatriculationNumber("JETS/PG" + yr + "/PA/" + studentId());
    }
    if (programme === "Master of Arts (Christian Education)") {
      setMatriculationNumber("JETS/PG" + yr + "/CE/" + studentId());
    }
    if (programme === "Master of Arts (Mission & Intercultural Studies)") {
      setMatriculationNumber("JETS/PG" + yr + "/MI/" + studentId());
    }
    if (programme === "Master of Arts (Leadership & Administration)") {
      setMatriculationNumber("JETS/PG" + yr + "/LA/" + studentId());
    }
    if (programme === "Master of Arts (Biblical Counseling & Psychology)") {
      setMatriculationNumber("JETS/PG" + yr + "/BP/" + studentId());
    }
    if (programme === "Master of Arts (Peace & Conflict Studies)") {
      setMatriculationNumber("JETS/PG" + yr + "/PC/" + studentId());
    }
    if (programme === "Master of Arts (Youth Ministry)") {
      setMatriculationNumber("JETS/PG" + yr + "/YM/" + studentId());
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    await doSetMatriculationNumber(
      formData().programme,
      formData().year_of_admission
    );

    const request1 = fetch(VITE_API_URL + "/api/create-student", {
      mode: "cors",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("jetsUser")).token
        }`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        custom_id: JSON.parse(localStorage.getItem("jetsUser")).custom_id,
        ledger_number: formData().ledger_number.toUpperCase(),
        date_of_birth: formData().date_of_birth,
        email: studentEmail().toLowerCase().replace(/\s/g, ""),
        matriculation_number: matriculationNumber(),
        state_of_origin: formData().state_of_origin,
        country_of_origin: formData().country_of_origin,
        denomination: formData().denomination,
        local_church: formData().local_church,
        name_of_pastor: formData().name_of_pastor,
        work_fulltime: formData().work_fulltime,
        ministry: formData().ministry,
        year_of_admission: formData().year_of_admission,
        programme_category: formData().programme_category,
        programme: formData().programme,
        department: formData().department,
        faculty: formData().faculty,
        affiliation_status: formData().affiliation_status,
        special_student_category: formData().special_student_category,
      }),
    }).then((response) => response.json());
    const request2 = fetch(
      VITE_API_URL +
        "/api/edit-user/" +
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
        method: "PATCH",
        body: JSON.stringify({
          status: "upload passport",
        }),
      }
    ).then((response) => response.json());
    const request3 = fetch(VITE_API_URL + "/api/create-portal-wallet", {
      mode: "cors",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("jetsUser")).token
        }`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        amount: "00",
        custom_id: JSON.parse(localStorage.getItem("jetsUser")).custom_id,
      }),
    }).then((response) => response.json());
    const request4 = fetch(VITE_API_URL + "/api/create-accommodation-wallet", {
      mode: "cors",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("jetsUser")).token
        }`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        amount: "00",
        custom_id: JSON.parse(localStorage.getItem("jetsUser")).custom_id,
      }),
    }).then((response) => response.json());
    Promise.all([request1, request2, request3, request4])
      .then(([data1, data2, data3, data4]) => {
        if (data1.success && data2.success && data3.success && data4.success) {
          setIsProcessing(false);
          setShowSuccess(true);
        } else {
          setIsProcessing(false);
          setMessage(
            data1.response
              ? data1.response
              : "An error occurred! Contact ICT Dept."
          );
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage(error);
      });
  };

  createEffect(async () => {
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
          },
          method: "GET",
        }
      );
      const result = await response.json();
      if (result.response === "Expired token") {
        localStorage.removeItem("jetsUser");
        navigate("/", { replace: true });
      } else {
        if (result.response.status !== "complete profile") {
          navigate("/student/downloads", { replace: true });
        } else {
          setStudentEmail(
            result.response.first_name +
              "." +
              result.response.username +
              "@jets.edu.ng"
          );
          setStudentId(result.response.username);
          setLoading(false);
        }
      }
    } else {
      navigate("/", { replace: true });
    }
  });

  return (
    <MetaProvider>
      <Title>Complete Profile - ECWA Theological Seminary, Jos (JETS)</Title>
      <Meta
        name="description"
        content="Complete your online profile on ECWA Theological Seminary, Jos (JETS)"
      />
      <div class="text-sm">
        <Show when={showSuccess()}>
          <div class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90 h-screen w-screen flex items-center">
            <div class="w-80 sm:w-10/12 lg:w-6/12 mx-auto bg-white rounded-md p-6">
              <h2 class="text-center text-blue-900 font-semibold">
                Profile Completed
              </h2>
              <div class="my-2 border-t border-b py-4 border-black">
                <Success />
                <p>
                  You have successfully updated your profile. Click the OK to
                  continue.
                </p>
              </div>
              <div class="text-right space-x-3">
                <button
                  onClick={() => (window.location.href = "/student/downloads")}
                  class="blue-btn text-white p-3 hover:opacity-60"
                >
                  Ok. Continue
                </button>
              </div>
            </div>
          </div>
        </Show>
        <Header />
        <Show when={!loading()} fallback={<Loading />}>
          <div class="mt-8 mb-20 w-11/12 mx-auto space-y-4">
            <h2 class="text-lg font-semibold text-center border-b border-red-600">
              Complete Profile
            </h2>
            <div class="bg-yellow-100 rounded-md border border-yellow-200 p-1 space-y-0.5">
              <b class="block">Instruction:</b>
              <p>
                Ensure to fill all required fields correctly. Please
                double-check your entries before you submit.
              </p>
            </div>
            <div class="border border-gray-600 shadow-md rounded p-1 lg:p-4">
              <form autocomplete="off" onSubmit={submit} class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
                  <div>
                    <TextInput
                      label="Ledger Number:"
                      name="ledger_number"
                      required={true}
                      formHandler={formHandler}
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Date of Birth:"
                      name="date_of_birth"
                      required={true}
                      formHandler={formHandler}
                      type="date"
                    />
                  </div>
                  <div>
                    <TextInput
                      label="State of Origin:"
                      name="state_of_origin"
                      required={true}
                      formHandler={formHandler}
                    />
                  </div>
                  <div>
                    <Select
                      label="Country of Origin:"
                      name="country_of_origin"
                      placeholder="Select"
                      required={true}
                      options={[
                        { value: "Nigeria", label: "Nigeria" },
                        { value: "Cameroon", label: "Cameroon" },
                        { value: "Liberia", label: "Liberia" },
                        { value: "Chad", label: "Chad" },
                        { value: "Ghana", label: "Ghana" },
                        { value: "Niger", label: "Niger" },
                        { value: "Sudan", label: "Sudan" },
                        { value: "Benin", label: "Benin" },
                      ]}
                      formHandler={formHandler}
                    />
                  </div>
                  <div>
                    <Select
                      label="Denomination:"
                      name="denomination"
                      placeholder="Select"
                      required={true}
                      options={[
                        { value: "ECWA", label: "ECWA" },
                        { value: "Non-ECWA", label: "Non-ECWA" },
                      ]}
                      formHandler={formHandler}
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Local Church:"
                      name="local_church"
                      required={true}
                      formHandler={formHandler}
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Name of Pastor:"
                      name="name_of_pastor"
                      required={true}
                      formHandler={formHandler}
                    />
                  </div>
                  <div>
                    <Select
                      label="Work fulltime?"
                      name="work_fulltime"
                      placeholder="Select"
                      required={true}
                      options={[
                        { value: "No", label: "No" },
                        { value: "Yes", label: "Yes" },
                      ]}
                      formHandler={formHandler}
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Type of Ministry:"
                      name="ministry"
                      required={true}
                      formHandler={formHandler}
                    />
                  </div>
                  <div>
                    <Select
                      label="Year of Admission:"
                      name="year_of_admission"
                      placeholder="Select"
                      required={true}
                      options={[
                        { value: "2015", label: "2015" },
                        { value: "2016", label: "2016" },
                        { value: "2017", label: "2017" },
                        { value: "2018", label: "2018" },
                        { value: "2019", label: "2019" },
                        { value: "2020", label: "2020" },
                        { value: "2021", label: "2021" },
                        { value: "2022", label: "2022" },
                        { value: "2023", label: "2023" },
                        { value: "2024", label: "2024" },
                        { value: "2025", label: "2025" },
                        { value: "2026", label: "2026" },
                        { value: "2027", label: "2027" },
                        { value: "2028", label: "2028" },
                        { value: "2029", label: "2029" },
                        { value: "2030", label: "2030" },
                        { value: "2031", label: "2031" },
                      ]}
                      formHandler={formHandler}
                    />
                  </div>

                  <div>
                    <Select
                      label="Faculty:"
                      name="faculty"
                      placeholder="Select"
                      required={true}
                      options={[
                        {
                          value: "Faculty of Biblical Studies",
                          label: "Faculty of Biblical Studies",
                        },
                        {
                          value: "Faculty of Theological Studies",
                          label: "Faculty of Theological Studies",
                        },
                        {
                          value: "Faculty of Practical Theology",
                          label: "Faculty of Practical Theology",
                        },
                        {
                          value: "Faculty of Education",
                          label: "Faculty of Education",
                        },
                      ]}
                      formHandler={formHandler}
                    />
                  </div>
                  <div>
                    <Switch>
                      <Match when={formData().faculty === ""}>
                        <Select
                          label="Department:"
                          name="department"
                          placeholder="Select"
                          required={true}
                          options={[]}
                          formHandler={formHandler}
                        />
                      </Match>
                      <Match
                        when={
                          formData().faculty === "Faculty of Biblical Studies"
                        }
                      >
                        <Select
                          label="Department:"
                          name="department"
                          placeholder="Select"
                          required={true}
                          options={[
                            {
                              value: "Old Testament",
                              label: "Department of Old Testament",
                            },
                            {
                              value: "New Testament",
                              label: "Department of New Testament",
                            },
                          ]}
                          formHandler={formHandler}
                        />
                      </Match>
                      <Match
                        when={
                          formData().faculty ===
                          "Faculty of Theological Studies"
                        }
                      >
                        <Select
                          label="Department:"
                          name="department"
                          placeholder="Select"
                          required={true}
                          options={[
                            {
                              value: "Systematic Theology",
                              label: "Department of Systematic Theology",
                            },
                            {
                              value: "Church History and Historical Theology",
                              label:
                                "Department of Church History and Historical Theology",
                            },
                            {
                              value: "Christian Ethics and Public Theology",
                              label:
                                "Department of Christian Ethics and Public Theology",
                            },
                            {
                              value: "Christian Apologetics",
                              label: "Department of Christian Apologetics",
                            },
                            {
                              value: "Theological Studies",
                              label: "Department of Theological Studies",
                            },
                          ]}
                          formHandler={formHandler}
                        />
                      </Match>
                      <Match
                        when={
                          formData().faculty === "Faculty of Practical Theology"
                        }
                      >
                        <Select
                          label="Department:"
                          name="department"
                          placeholder="Select"
                          required={true}
                          options={[
                            {
                              value: "Pastoral Studies",
                              label: "Department of Pastoral Studies",
                            },
                            {
                              value: "Missions and Intercultural Studies",
                              label:
                                "Department of Missions and Intercultural Studies",
                            },
                            {
                              value: "Youth Ministry",
                              label: "Department of Youth Ministry",
                            },
                            {
                              value: "Leadership and Administration",
                              label:
                                "Department of Leadership and Administration",
                            },
                            {
                              value: "Peace and Conflict Studies",
                              label: "Department of Peace and Conflict Studies",
                            },
                            {
                              value: "Community Development",
                              label: "Department of Community Development",
                            },
                          ]}
                          formHandler={formHandler}
                        />
                      </Match>
                      <Match
                        when={formData().faculty === "Faculty of Education"}
                      >
                        <Select
                          label="Department:"
                          name="department"
                          placeholder="Select"
                          required={true}
                          options={[
                            {
                              value: "Christian Education",
                              label: "Department of Christian Education",
                            },
                            {
                              value: "Biblical Counselling and Psychology",
                              label:
                                "Department of Biblical Counselling and Psychology",
                            },
                          ]}
                          formHandler={formHandler}
                        />
                      </Match>
                    </Switch>
                  </div>
                  <div>
                    <Select
                      label="Programme Category:"
                      name="programme_category"
                      placeholder="Select"
                      required={true}
                      options={[
                        {
                          value: "Masters Programme",
                          label: "Masters Programme",
                        },
                        {
                          value: "Master of Divinity Programme",
                          label: "Master of Divinity Programme",
                        },
                        { value: "PGDT Programme", label: "PGDT Programme" },
                        {
                          value: "Bachelor of Arts Programme",
                          label: "Bachelor of Arts Programme",
                        },
                      ]}
                      formHandler={formHandler}
                    />
                  </div>
                  <div>
                    <Switch>
                      <Match
                        when={
                          formData().programme_category ===
                          "Bachelor of Arts Programme"
                        }
                      >
                        <Select
                          label="Programme of Study:"
                          name="programme"
                          placeholder="Select"
                          required={true}
                          options={[
                            {
                              value:
                                "Bachelor of Arts in Theology (Theological Studies)",
                              label:
                                "Bachelor of Arts in Theology (Theological Studies)",
                            },
                            {
                              value:
                                "Bachelor of Arts in Theology (Pastoral Studies)",
                              label:
                                "Bachelor of Arts in Theology (Pastoral Studies)",
                            },
                            {
                              value:
                                "Bachelor of Arts in Theology (Christian Education)",
                              label:
                                "Bachelor of Arts in Theology (Christian Education)",
                            },
                            {
                              value:
                                "Bachelor of Arts in Theology (Evangelism & Missions)",
                              label:
                                "Bachelor of Arts in Theology (Evangelism & Missions)",
                            },
                            {
                              value:
                                "Bachelor of Arts in Theology (Biblical Studies)",
                              label:
                                "Bachelor of Arts in Theology (Biblical Studies)",
                            },
                            {
                              value:
                                "Bachelor of Arts in Theology (Youth Ministry)",
                              label:
                                "Bachelor of Arts in Theology (Youth Ministry)",
                            },
                          ]}
                          formHandler={formHandler}
                        />
                      </Match>
                      <Match
                        when={
                          formData().programme_category === "PGDT Programme"
                        }
                      >
                        <Select
                          label="Programme of Study:"
                          name="programme"
                          placeholder="Select"
                          required={true}
                          options={[
                            {
                              value: "Post-Graduate Diploma of Theology",
                              label: "Post-Graduate Diploma of Theology",
                            },
                          ]}
                          formHandler={formHandler}
                        />
                      </Match>
                      <Match
                        when={
                          formData().programme_category ===
                          "Master of Divinity Programme"
                        }
                      >
                        <Select
                          label="Programme of Study:"
                          name="programme"
                          placeholder="Select"
                          required={true}
                          options={[
                            {
                              value: "Master of Divinity (Pastoral Studies)",
                              label: "Master of Divinity (Pastoral Studies)",
                            },
                          ]}
                          formHandler={formHandler}
                        />
                      </Match>
                      <Match
                        when={
                          formData().programme_category === "Masters Programme"
                        }
                      >
                        <Select
                          label="Programme of Study:"
                          name="programme"
                          placeholder="Select"
                          required={true}
                          options={[
                            {
                              value:
                                "Master of Arts (Biblical Studies - Old Testament)",
                              label:
                                "Master of Arts (Biblical Studies - Old Testament)",
                            },
                            {
                              value:
                                "Master of Arts (Biblical Studies - New Testament)",
                              label:
                                "Master of Arts (Biblical Studies - New Testament)",
                            },
                            {
                              value: "Master of Arts (Systematic Theology)",
                              label: "Master of Arts (Systematic Theology)",
                            },
                            {
                              value:
                                "Master of Arts (Church History & Historical Theology)",
                              label:
                                "Master of Arts (Church History & Historical Theology)",
                            },
                            {
                              value:
                                "Master of Arts (Christian Ethics & Public Theology)",
                              label:
                                "Master of Arts (Christian Ethics & Public Theology)",
                            },
                            {
                              value: "Master of Arts (Christian Apologetics)",
                              label: "Master of Arts (Christian Apologetics)",
                            },
                            {
                              value: "Master of Arts (Pastoral Studies)",
                              label: "Master of Arts (Pastoral Studies)",
                            },
                            {
                              value: "Master of Arts (Christian Education)",
                              label: "Master of Arts (Christian Education)",
                            },
                            {
                              value:
                                "Master of Arts (Mission & Intercultural Studies)",
                              label:
                                "Master of Arts (Mission & Intercultural Studies)",
                            },
                            {
                              value:
                                "Master of Arts (Leadership & Administration)",
                              label:
                                "Master of Arts (Leadership & Administration)",
                            },
                            {
                              value:
                                "Master of Arts (Biblical Counseling & Psychology)",
                              label:
                                "Master of Arts (Biblical Counseling & Psychology)",
                            },
                            {
                              value:
                                "Master of Arts (Peace & Conflict Studies)",
                              label:
                                "Master of Arts (Peace & Conflict Studies)",
                            },
                            {
                              value: "Master of Arts (Youth Ministry)",
                              label: "Master of Arts (Youth Ministry)",
                            },
                          ]}
                          formHandler={formHandler}
                        />
                      </Match>

                      <Match when={formData().programme_category === ""}>
                        <Select
                          label="Programme of Study:"
                          name="programme"
                          placeholder="Select"
                          required={true}
                          options={[
                            {
                              value: "",
                              label: "",
                            },
                          ]}
                          formHandler={formHandler}
                        />
                      </Match>
                    </Switch>
                  </div>
                  <div>
                    <Show
                      when={
                        formData().programme_category ===
                        "Bachelor of Arts Programme"
                      }
                      fallback={
                        <Select
                          label="Are you an Affiliation Student?"
                          name="affiliation_status"
                          placeholder="Select"
                          required={true}
                          options={[{ value: "no", label: "No" }]}
                          formHandler={formHandler}
                        />
                      }
                    >
                      <Select
                        label="Are you an Affiliation Student?"
                        name="affiliation_status"
                        placeholder="Select"
                        required={true}
                        options={[
                          { value: "yes", label: "Yes" },
                          { value: "no", label: "No" },
                        ]}
                        formHandler={formHandler}
                      />
                    </Show>
                  </div>
                  <div>
                    <TextInput
                      label="Special Student Category:"
                      name="special_student_category"
                      required={false}
                      formHandler={formHandler}
                    />
                  </div>
                </div>

                <Show when={message() !== ""}>
                  <div class="bg-purple-200 text-purple-900 p-3 text-center animate-pulse border-l-2 border-black">
                    {message()}
                  </div>
                </Show>

                <div class="sm:flex">
                  <div class="hidden sm:block sm:grow">&nbsp;</div>
                  <div class="w-full sm:w-60">
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
                                Proceed
                              </button>
                            }
                          >
                            <button
                              disabled
                              class="gray2-btn cursor-wait w-full p-3 text-center hover:opacity-60"
                            >
                              Processing.. .
                            </button>
                          </Show>
                        </>
                      }
                    >
                      <button
                        disabled
                        class="gray-btn w-full p-3 text-center cursor-not-allowed"
                      >
                        Proceed
                      </button>
                    </Show>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Show>
      </div>
    </MetaProvider>
  );
}
