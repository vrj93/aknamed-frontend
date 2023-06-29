import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="text-center mb-3">
          <h1>Welcome to Aknamed Dashboard</h1>
        </div>
        <div className="text-center">
          <Link href="/user-form">
            <button className="btn btn-primary btn-lg">Go to User Form</button>
          </Link>
        </div>
      </div>
    </>
  );
}
