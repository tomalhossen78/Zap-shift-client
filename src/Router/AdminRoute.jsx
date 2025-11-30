import React from "react";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import Container from "../Utility/Container";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <p>Loading.......</p>;
  }

  if (role !== "admin") {
    return (
      <Container className={"mt-20"}>
        You are not allowed to access this page.
      </Container>
    );
  }

  return children;
};

export default AdminRoute;
