import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";

import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { A, useNavigate, useParams } from "@solidjs/router";

import Header from "../components/Header";
import { Select } from "../components/Select";
import TextInput from "../components/TextInput";
import Success from "../components/icons/Success";
import { createSignal, createResource } from "solid-js";
import Loading from "../components/Loading";
import { createStore } from "solid-js/store";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

const schema = z.object({
  faculty: z.string().min(1, "*Required"),
});

export default function AssignCourses() {
  const params = useParams();

  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const [isProcessing, setIsProcessing] = createSignal(false);
  const [semester, setSemester] = createSignal("");
  const [session, setSession] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [code, setCode] = createSignal("");
  const [title, setTitle] = createSignal("");
  const [courses, setCourses] = createStore([]);
  const [displayFaculty, setDisplayFaculty] = createStore([]);
  const [showModal, setShowModal] = createSignal(false);
  const [showSuccess, setShowSuccess] = createSignal(false);

  const facultyArray = [];
  const fetchResources = async () => {
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
        navigate("/");
      } else {
        await fetchPeriod();
        const request1 = fetch(VITE_API_URL + "/api/view-courses", {
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

        Promise.all([request1, request2])
          .then(([data1, data3]) => {
            setCourses(data1.response);
            var allFaculty = data3.response.filter(
              (faculty) => faculty.user_role == "Faculty"
            );
            console.log(allFaculty);
            for (let i = 0; i < allFaculty.length; i++) {
              var fac = {
                value: allFaculty[i].custom_id,
                label:
                  allFaculty[i].title +
                  " " +
                  allFaculty[i].surname +
                  " " +
                  allFaculty[i].first_name +
                  " " +
                  allFaculty[i].other_names,
              };
              facultyArray.push(fac);
            }
            setDisplayFaculty(facultyArray);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      return {
        courses,
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

  const doShowModal = (code, title) => {
    setCode(code);
    setTitle(title);
    setShowModal(true);
  };

  const submit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
  };

  const [resources] = createResource(fetchResources);

  return (
    <MetaProvider>
      <Title>Assign Courses - ECWA Theological Seminary, Jos (JETS)</Title>
      <Meta
        name="description"
        content="Assign Courses on ECWA Theological Seminary, Jos (JETS)"
      />
      <div class="text-sm">
        <Header />
        <Show when={showModal()}>
          <div class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90 h-screen w-screen flex items-center">
            <div class="w-80 sm:w-10/12 lg:w-6/12 mx-auto bg-white rounded-md p-6">
              <h2 class="text-center text-blue-900 font-semibold">
                Assign Course to Lecturer
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
                      <div class="flex justify-between space-x-4">
                        <div>
                          <b>Couse Code:</b>
                          <br />
                          {code()}
                        </div>
                        <div>
                          <b>Couse Title:</b>
                          <br />
                          {title()}
                        </div>
                      </div>
                      <div>
                        <Select
                          label="Faculty:"
                          name="faculty"
                          placeholder="Select"
                          required={true}
                          options={displayFaculty}
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
                  <p>The course was assigned successfully!</p>
                </div>
                <div class="text-right space-x-3">
                  <button
                    onClick={() =>
                      (window.location.href =
                        "/admin/assign-courses/" + params.periodId)
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
        <div class="mt-8 w-11/12 mx-auto space-y-4">
          <h2 class="text-lg font-semibold text-center border-b border-red-600">
            Assign Courses{" "}
            <Show when={session() !== "" && semester() !== ""}>
              <span class="block font-normal capitalize">
                {semester()} Semester - {session()} Session
              </span>
            </Show>
          </h2>
          <div class="bg-yellow-100 rounded-md border border-yellow-200  p-1 space-y-0.5">
            <b class="block">Instruction:</b>
            <p>
              Click on the button labelled 'Asign' to assign the corresponding
              course to a lecturer.
            </p>
          </div>
          <div class="border border-gray-600 shadow-md rounded p-2 lg:p-4">
            <table
              cellPadding={0}
              cellSpacing={0}
              class="w-full my-4 border border-black"
            >
              <thead class="bg-blue-950 text-white border-b border-black">
                <tr>
                  <td class="p-4 border-r border-black">#.</td>
                  <td class="p-4 border-r border-black">Code</td>
                  <td class="p-4 border-r border-black">Title</td>
                  <td class="p-4 border-r border-black">CH</td>
                  <td class="p-4 border-r border-black">Action</td>
                  <td class="p-4">Assigned To</td>
                </tr>
              </thead>
              <tbody>
                <Show
                  when={resources.loading}
                  fallback={
                    <Show when={resources().courses.length > 0}>
                      <For each={resources().courses}>
                        {(course, i) => (
                          <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                            <td class="p-4 border-r border-black font-semibold">
                              {i() + 1}.
                            </td>
                            <td class="p-4 border-r border-black uppercase">
                              {course.code}
                            </td>
                            <td class="p-4 border-r border-black">
                              {course.title}
                            </td>
                            <td class="p-4 border-r border-black">
                              {course.hours}
                            </td>
                            <td class="p-4 border-r border-black">
                              <button
                                onClick={() =>
                                  doShowModal(course.code, course.title)
                                }
                                class="green-btn p-3 border border-black text-center hover:opacity-60"
                              >
                                Assign
                              </button>
                            </td>
                            <td class="p-4">No one yet</td>
                          </tr>
                        )}
                      </For>
                    </Show>
                  }
                >
                  <tr>
                    <td colSpan={6} class="p-1 text-center">
                      <Loading />
                    </td>
                  </tr>
                </Show>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MetaProvider>
  );
}
