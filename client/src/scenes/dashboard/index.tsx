import React, { useState, useEffect } from "react";
import { chileanIndex } from "../../state/publicApi";
import { useGetTodoQuery } from "../../state/api";
import CircularProgressWithLabel from "../../components/CircularProgress";

// type Props = {}

const Dashboard = (props: Props) => {
  const { data, isLoading } = useGetTodoQuery({});
  console.log(data);

  return (
    <>
      Dashboard
      <CircularProgressWithLabel value={70} />
    </>
  );
};

export default Dashboard;
