import React from "react";
import { Input } from "./styledInput";
export default function FormInput({ value, onChange, ...props }) {
  return <Input value={value} onChange={onChange} {...props} />;
}
