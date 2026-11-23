
import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-gray-600">
            Loading password reset page...
          </p>
        </main>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
