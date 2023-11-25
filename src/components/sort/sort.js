import React, { useEffect, useState } from "react";
import styled from "styled-components";
const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
`;
const Select = styled.select`
  font-size: 1.4rem;
  border: none;
  // border: 1px solid var(--gray);
  // border-radius: 0.3rem;
  cursor: pointer;
`;
const Option = styled.option``;
const SortWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
export default function Sort({ setSortProp }) {
  const onChangeSelect = (e) => {
    if (e.target.id === "sort") {
      setSortProp((prop) => ({ ...prop, field: e.target.value }));
    } else {
      setSortProp((prop) => ({ ...prop, order: e.target.value }));
    }
  };

  return (
    <SortWrapper>
      <Label htmlFor="sort">Sort by :</Label>
      <Select id="sort" onChange={onChangeSelect} type="select">
        <Option value="none">none</Option>
        <Option value="price">price</Option>
        <Option value="beds">beds</Option>
      </Select>
      <Select onChange={onChangeSelect} id="sort-type" type="select">
        <Option value="asc">asc</Option>
        <Option value="desc">desc</Option>
      </Select>
    </SortWrapper>
  );
}
