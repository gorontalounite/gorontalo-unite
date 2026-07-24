import { redirect } from "next/navigation";

/** Backward-compatible entry point for older navigation links. */
export default function LegacyLoginPage() {
  redirect("/sign-in");
}
