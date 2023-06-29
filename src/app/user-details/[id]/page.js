"use client";
import { useEffect, useState } from "react";

export default function UserDetails({ params }) {
  const [user, setUser] = useState([]);

  const getUser = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/list-user/${params.id}`
    );

    const response = await res.json();

    if (res.status == 200) {
      const userData = response.data;
      setUser({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        dob: userData.dob,
      });
    } else {
      console.log(response.error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  return (
    <div
      className="justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#0072B5" }}
    >
      <div className="d-flex justify-content-center align-items-center px-4">
        <h1 className="rounded p-2 mt-5 text-light">User Details</h1>
      </div>
      <div className="container d-flex justify-content-center py-5">
        <div className="col-lg-6">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th scope="row">Name</th>
                <td className="text-start">{user.name}</td>
              </tr>
              <tr>
                <th scope="row">Email</th>
                <td className="text-start">{user.email}</td>
              </tr>
              <tr>
                <th scope="row">Phone</th>
                <td className="text-start">{user.phone}</td>
              </tr>
              <tr>
                <th scope="row">Date of Birth</th>
                <td className="text-start">{user.dob}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
