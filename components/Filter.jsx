import * as React from "react";
import styled from "styled-components";

const FilterWrapper = styled.div`
  display:flex;
  padding:1rem;
  gap:1rem;
`;

const Label = styled.label`
  font-size: 18px;
  font-family: "Open Sans", "Arial";
  color: black;
  font-weight:600;
`;

const Select = styled.select`
  font-size: 18px;
  font-family: "Open Sans", "Arial";
  color: black;
  border: 0px solid white;
  -webkit-appearance: none;
  border-radius: 0px;
`;

export default function Filter({value, options, onChange, label }) {

  function handleChange(event) {
    const value = event.target.value

    if (event.target.value == 0) {
      onChange({value: value, label: "All"})
    } else 
   onChange({value: value, label: event.target[event.target.value].innerHTML})
}

    return (
      <FilterWrapper>
        <Label>{label}</Label>
        <Select
          id={label}
          name={label}
          onChange={handleChange}
          value={value}
      >
      <option value={0}>All</option>
            {options.map(option => {
                return (
                    <option key={option.value} value={option.value}>{option.label}</option>
                )
            })}
    </Select>
    </FilterWrapper>
    )
}