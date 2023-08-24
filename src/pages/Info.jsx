import React, { useEffect, useState } from "react";
import { getUserData } from "../firebase/firebase";
import { useAuthProvider } from "../context/context";
import placeholder from "../assets/user.jpg";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const Info = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const { user, LogOut } = useAuthProvider();

  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);

    if (user) {
      getUserData(user?.uid)
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="pt-28 px-6 max-w-3xl mx-auto">
        <div className="bg-gray-200 animate-pulse w-[120px] h-[120px] rounded-full mx-auto mb-10" />
        <div className="bg-gray-200 animate-pulse max-w-[170px] rounded-lg h-5 mx-auto mb-4" />
        <div className="bg-gray-200 animate-pulse max-w-[200px] rounded-lg h-4 mx-auto mb-4" />
        <div className="border p-5 rounded-lg mt-7">
          <div className="bg-gray-200 animate-pulse max-w-[200px] rounded-lg h-5 mb-4" />
          <div className="flex gap-4 justify-between mt-6 flex-col md:flex-row">
            <div className="w-full md:w-1/3">
              <div className="bg-gray-200 animate-pulse max-w-[170px] rounded-lg h-5 mb-8" />
              <div className="bg-gray-200 animate-pulse max-w-[200px] rounded-lg h-4 mb-4" />
              <div className="bg-gray-200 animate-pulse max-w-[220px] rounded-lg h-4 mb-4" />
              <div className="bg-gray-200 animate-pulse max-w-[170px] rounded-lg h-4 mb-4" />
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-gray-200 animate-pulse max-w-[170px] rounded-lg h-5 mb-8" />
              <div className="bg-gray-200 animate-pulse max-w-[200px] rounded-lg h-4 mb-4" />
              <div className="bg-gray-200 animate-pulse max-w-[220px] rounded-lg h-4 mb-4" />
              <div className="bg-gray-200 animate-pulse max-w-[170px] rounded-lg h-4 mb-4" />
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-gray-200 animate-pulse max-w-[170px] rounded-lg h-5 mb-8" />
              <div className="bg-gray-200 animate-pulse max-w-[200px] rounded-lg h-4 mb-4" />
              <div className="bg-gray-200 animate-pulse max-w-[220px] rounded-lg h-4 mb-4" />
              <div className="bg-gray-200 animate-pulse max-w-[170px] rounded-lg h-4 mb-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const keys = userData?.sectors ? Object.keys(userData?.sectors).sort() : [];

  return (
    <div className="pt-28 px-6 pb-40">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <img
            src={user?.photoURL || placeholder}
            alt={user?.displayName}
            className="mx-auto rounded-full aspect-[1:1]"
          />
          <h2 className="text-2xl font-semibold text-primary mt-3">
            {userData?.name || user?.displayName}
          </h2>
          <p className="text-sm">{user?.email}</p>
          <div className="border p-4 rounded-lg bg-gray-100 mt-10">
            <h2 className="text-left mb-5 font-semibold mt-3 text-2xl text-primary">
              Sectors
            </h2>
            <div className="flex gap-4 justify-between mt-4 flex-col md:flex-row">
              {keys?.length > 0 ? (
                keys?.map((item, index) => (
                  <div className="w-full md:w-1/3" key={index}>
                    <h2 className="font-semibold text-xl mb-3 text-left">
                      {item}
                    </h2>
                    <ul className="text-left">
                      {userData?.sectors?.[item]?.length > 0 ? (
                        userData?.sectors?.[item]?.map((sec) => (
                          <li className="flex gap-3 items-baseline">
                            <AiFillCheckCircle className="text-primary min-w-[16px]" />
                            <span>{sec}</span>
                          </li>
                        ))
                      ) : (
                        <div>no sector selected</div>
                      )}
                    </ul>
                  </div>
                ))
              ) : (
                <div>There are no sectors added yet</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <Link
            to={"/"}
            type="button"
            className="px-6 py-2 rounded-lg bg-primary text-white"
          >
            Edit
          </Link>
          <button
            type="button"
            className="px-6 py-2 rounded-lg bg-primary text-white"
            onClick={() => setIsOpen(true)}
          >
            Log out
          </button>
        </div>

        <Modal state={isOpen} setState={setIsOpen}>
          <div className="bg-gray-200 py-10 px-6 rounded-lg flex flex-col justify-center items-center gap-4 max-w-md">
            <p>Are you sure to log out?</p>
            <div className="flex justify-between items-center gap-6">
              <button
                type="button"
                className="px-6 py-2 rounded-lg bg-primary text-white"
                onClick={() => setIsOpen(false)}
              >
                No
              </button>
              <button
                type="button"
                className="px-6 py-2 rounded-lg bg-primary text-white"
                onClick={LogOut}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Info;
