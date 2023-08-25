import React, { useEffect, useState } from "react";
import SelectSectors from "../components/SelectSectors";
import { getSectors, getUserData, submitData } from "../firebase/firebase";
import CheckBox from "../components/CheckBox";
import Modal from "../components/Modal";
import { useAuthProvider } from "../context/context";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState("loading");
  const [error, setError] = useState(null);
  const [isFilledData, setIsFilledData] = useState(true);
  const [selectedData, setSelectedData] = useState({
    name: "",
    Service: [],
    Manufacturing: [],
    Other: [],
    agree_to_terms: false,
  });

  // get user data from context
  const { user } = useAuthProvider();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(true);
      getSectors()
        .then((sectors) => {
          setSectors(sectors);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });

      // get user name

      getUserData(user?.uid).then((data) => {
        if (data?.sectors) {
          const { Manufacturing, Other, Service } = data.sectors;
          setSelectedData((prev) => {
            return {
              ...prev,
              name: data.name,
              Manufacturing,
              Service,
              Other,
              agree_to_terms: data.agree_to_terms,
            };
          });
        } else {
          setSelectedData((prev) => {
            return { ...prev, name: user.displayName };
          });
        }
        // setSelectedData()
      });
    } else {
      navigate("/login");
    }
  }, [user]);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, Manufacturing, Service, Other, agree_to_terms } =
      selectedData;

    const data = {
      name: name,
      sectors: {
        Manufacturing,
        Service,
        Other,
      },
      agree_to_terms,
    };

    const totalLen = Manufacturing.length + Service.length + Other.length;

    if (name && totalLen > 0 && agree_to_terms) {
      setIsFilledData(true);
      setSubmitLoading("");
      submitData(data, user?.uid)
        .then((res) => {
          setSubmitLoading(res);
          setSelectedData({
            name: "",
            Service: [],
            Manufacturing: [],
            Other: [],
            agree_to_terms: false,
          });

          setIsSubmitted(true);
        })
        .catch((err) => console.log(err));
    } else {
      setIsFilledData(false);
    }
  };

  // handle errors

  if (error) {
    return (
      <div className="flex h-screen justify-center items-center font-semibold text-2xl">
        Something went wrong.
      </div>
    );
  }

  return (
    <div className="w-full pt-28 pb-10 px-6 mb-52">
      <form action="" onSubmit={handleSubmit}>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-primary text-center text-xl sm:text-2xl lg:text-3xl font-semibold">
            Please enter your name and pick the Sectors you are currently
            involved in.
          </h1>
          <div className="mt-8">
            <div className="form-control font-semibold">
              <input
                required={true}
                type="text"
                name="name"
                value={selectedData.name}
                onChange={(e) => {
                  setSelectedData((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
              />
              <hr />
              <label>
                <span style={{ transitionDelay: "400ms" }}>Y</span>
                <span style={{ transitionDelay: "350ms" }}>o</span>
                <span style={{ transitionDelay: "300ms" }}>u</span>
                <span style={{ transitionDelay: "250ms" }}>r</span>
                <span style={{ transitionDelay: "200ms" }}> </span>
                <span style={{ transitionDelay: "150ms" }}> n</span>
                <span style={{ transitionDelay: "100ms" }}>a</span>
                <span style={{ transitionDelay: "50ms" }}>m</span>
                <span style={{ transitionDelay: "0ms" }}>e</span>
              </label>
            </div>
          </div>

          <SelectSectors
            selectedData={selectedData}
            setSelectedData={setSelectedData}
            sectors={sectors}
            loading={loading}
            error={error}
          />
          <div className="mt-8">
            <label
              htmlFor="terms-and-condition"
              className="flex w-fit gap-4 items-center cursor-pointer"
            >
              <CheckBox
                id={"terms-and-condition"}
                name={"Agree to terms"}
                checked={selectedData.agree_to_terms}
                onChange={(e) => {
                  setSelectedData((prev) => {
                    return { ...prev, agree_to_terms: e.target.checked };
                  });
                }}
              />
              Agree to terms
            </label>
          </div>
          {!isFilledData && (
            <p className="text-red-600 mt-3">Please, fill all the data.</p>
          )}
          <div className="flex justify-end mt-6">
            <button className="button" type="submit">
              {!submitLoading ? "Saving" : "Save"}
            </button>
          </div>
        </div>
      </form>

      <Modal state={isSubmitted} setState={setIsSubmitted}>
        <div className="bg-gray-200 text-primary font-semibold rounded-lg py-7 px-6 flex flex-col justify-center items-center max-w-xs max-h-[200px] gap-4">
          <p className="text-center">
            Successfully submitted your data. You can edit your data anytime.
          </p>
          <button
            type="button"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-80"
            onClick={() => setIsSubmitted(false)}
          >
            Ok
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
