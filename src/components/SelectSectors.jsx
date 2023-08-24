import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import CheckBox from "./CheckBox";

const SelectSectors = ({ sectors, loading, selectedData, setSelectedData }) => {
  const [activeSector, setActiveSector] = useState(null);
  const [activeLevel2, setActiveLevel2] = useState(null);
  const [activeLevel3, setActiveLevel3] = useState(null);

  const handleActiveSector = (sectorName) => {
    setActiveSector(sectorName !== activeSector ? sectorName : null);
  };

  const handleActiveLevel2 = (sectorName) => {
    setActiveLevel2(sectorName !== activeLevel2 ? sectorName : null);
  };

  const handleActiveLevel3 = (sectorName) => {
    setActiveLevel3(sectorName !== activeLevel3 ? sectorName : null);
  };

  const handleSelect = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name) {
      const items = [...selectedData[name]];

      const index = items.indexOf(value);

      if (index === -1) {
        items.push(value);
      } else {
        items.splice(index, 1);
      }

      setSelectedData((prev) => {
        return { ...prev, [name]: items };
      });
    }
  };

  if (loading) {
    return (
      <div className="mt-5">
        <div className="w-full sm:w-[160px] h-6 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="mt-5 flex gap-5 flex-wrap">
          <div className="w-full sm:w-[160px] h-12 rounded-lg bg-gray-200 animate-pulse"></div>
          <div className="w-full sm:w-[160px] h-12 rounded-lg bg-gray-200 animate-pulse"></div>
          <div className="w-full sm:w-[160px] h-12 rounded-lg bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="sectors mt-5">
      <div>
        <p className="mb-4 text-[18px] text-black font-semibold">
          Select Sectors:
        </p>
        <ul className="flex gap-5 items-center flex-wrap">
          {sectors?.map((sector) => (
            <li
              className="bg-primary relative text-white rounded-lg shadow-lg w-full sm:w-[160px] cursor-pointer"
              key={sector?.id}
              onClick={() => handleActiveSector(sector?.title)}
            >
              <span
                className={`${
                  selectedData[sector.title]?.length > 0
                    ? "opacity-100 -top-2 -right-1"
                    : "top-0 opacity-0 right-0"
                } absolute bg-primary h-5 w-5 flex justify-center items-center rounded-full transition-all duration-300`}
              >
                {selectedData[sector.title]?.length}
              </span>
              <button
                type="button"
                className="flex justify-between items-center px-4 py-2 w-full rounded-lg"
              >
                {sector.title}
                {sector.sub_categories && (
                  <IoIosArrowDown
                    className={`${
                      activeSector === sector?.title ? "rotate-180" : "rotate-0"
                    } transition-all duration-300`}
                  />
                )}
              </button>

              {/* dropdown */}
              {/* level-2 */}
              {sector.sub_categories && (
                <ul
                  className={`${
                    activeSector === sector?.title
                      ? "translate-y-0 visible opacity-100"
                      : "translate-y-3 invisible opacity-0"
                  } dropdown absolute top-full left-0 bg-gray-100 shadow-lg text-black z-30 max-h-[250px] w-[250px] overflow-auto overflow-x-hidden transition-all duration-300`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {sector.sub_categories?.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleActiveLevel2(item.title)}
                    >
                      <label
                        htmlFor={item.title}
                        className={`${
                          item.title === activeLevel2
                            ? "bg-primary text-white"
                            : ""
                        } flex w-full h-full text-left cursor-pointer justify-between items-center`}
                      >
                        {item?.title}
                        {item?.sub_categories && (
                          <IoIosArrowDown
                            className={`${
                              item.title === activeLevel2
                                ? "rotate-180"
                                : "rotate-0"
                            } min-w-[20px]`}
                          />
                        )}
                        {!item?.sub_categories && (
                          <CheckBox
                            checked={selectedData[sector.title]?.includes(
                              item.title
                            )}
                            id={item.title}
                            name={sector.title}
                            value={item.title}
                            onChange={handleSelect}
                          />
                        )}
                      </label>
                      {/* level-3 */}
                      {item?.sub_categories && (
                        <ul
                          className={`${
                            item.title === activeLevel2
                              ? "max-h-[500px]"
                              : "max-h-0"
                          } pl-3 overflow-hidden transition-all duration-300 bg-gray-300`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {item?.sub_categories?.map((item, index) => (
                            <li
                              key={index}
                              onClick={() => handleActiveLevel3(item.title)}
                            >
                              <label
                                type="button"
                                className="flex w-full h-full text-left cursor-pointer justify-between items-center"
                              >
                                {item.title}
                                {item?.sub_categories && (
                                  <IoIosArrowDown
                                    className={`${
                                      item.title === activeLevel3
                                        ? "rotate-180"
                                        : "rotate-0"
                                    } min-w-[20px]`}
                                  />
                                )}
                                {!item?.sub_categories && (
                                  <CheckBox
                                    checked={selectedData[
                                      sector?.title
                                    ]?.includes(item.title)}
                                    id={item.title}
                                    name={sector.title}
                                    value={item.title}
                                    onChange={handleSelect}
                                  />
                                )}
                              </label>

                              {/* level-4 */}

                              {item?.sub_categories && (
                                <ul
                                  className={`${
                                    item.title === activeLevel3
                                      ? "max-h-[500px]"
                                      : "max-h-0"
                                  } pl-3 bg-gray-200 transition-all duration-300 overflow-hidden`}
                                >
                                  {item?.sub_categories?.map((item, index) => (
                                    <li key={index}>
                                      <label
                                        htmlFor={item.title}
                                        className="flex w-full h-full text-left cursor-pointer justify-between items-center"
                                      >
                                        {item.title}
                                        {item?.sub_categories && (
                                          <IoIosArrowDown />
                                        )}
                                        {!item?.sub_categories && (
                                          <CheckBox
                                            checked={selectedData[
                                              sector.title
                                            ]?.includes(item.title)}
                                            id={item.title}
                                            name={sector.title}
                                            value={item.title}
                                            onChange={handleSelect}
                                          />
                                        )}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectSectors;
