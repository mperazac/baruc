import React, { useState } from "react";
import { createFilter } from "react-select";
import AsyncSelect from "react-select/async";

import { sins } from "../data/sins";
import commandments from "../data/commandments";

interface ISelectorProps {}

const Selector: React.FunctionComponent<ISelectorProps> = props => {
  const [inputValue, setInputValue] = useState();
  const [commandment, setCommandment] = useState();

  const filterOptions = (inputValue: string) => {
    return sins;
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: any) => void
  ) => {
    setTimeout(() => {
      callback(filterOptions(inputValue));
    }, 300);
  };

  const handleOnChange = (option: any) => {
    setInputValue(option);
    if (option) {
      setCommandment(commandments.find(cmmd => cmmd.id === option.value));
    } else {
      setCommandment(null);
    }
  };

  return (
    <>
      <h3>Escribí tu pecado:</h3>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        filterOption={createFilter({
          ignoreCase: true,
          ignoreAccents: true,
          trim: true,
          matchFrom: "start",
        })}
        noOptionsMessage={() => "Dale, escribílo"}
        value={inputValue}
        onChange={handleOnChange}
        isClearable
      />
      {inputValue && (
        <div
          style={{
            marginTop: `30px`,
          }}
        >
          <p>
            Has roto el mandamiento: <b>{commandment?.commandment}</b>, por
            tanto, la consecuencia la encontrarás en <b>{commandment?.verse}</b>
          </p>
          <div dangerouslySetInnerHTML={{ __html: commandment?.text }} />
        </div>
      )}
    </>
  );
};

export default Selector;
