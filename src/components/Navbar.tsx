// "use client";

// import Link from "next/link";
// import useUser from "@/hooks/useUser";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";

// export default function Navbar() {
//   const router = useRouter();
//   const { user, loading } = useUser();

// const handleLogout = () => {
//   Cookies.remove("token");
//   window.dispatchEvent(new Event("auth-change")); // trigger reactive update
//   router.push("/login");
// };
//   // while loading token info, don't render user links
//   if (loading) return null;

//   return (
//     <nav className="flex justify-between items-center p-4 bg-gray-100 shadow">
//       <h1 className="text-xl font-bold">LMS</h1>
//       <div className="space-x-4">
//         {user ? (
//           <>
//             <span className="font-medium">{user.name}</span>
//             <Link href="/dashboard" className="hover:underline">Dashboard</Link>
//             <Link href="/profile" className="hover:underline">Profile</Link>
//             <button
//               onClick={handleLogout}
//               className="text-red-500 hover:underline"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link href="/login" className="hover:underline">Login</Link>
//             <Link href="/register" className="hover:underline">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }
"use client";

import Link from "next/link";
import useUser from "@/hooks/useUser";

export default function Navbar() {
  const { user, loading, logout } = useUser();

  if (loading) return null;
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <h1 className="text-xl font-bold">LMS</h1>
      <div className="space-x-4">
        {user ? (
          <>
            <span className="font-medium">{user.name} ({user.role})</span>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/profile">Profile</Link>
            <button
              onClick={logout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
  