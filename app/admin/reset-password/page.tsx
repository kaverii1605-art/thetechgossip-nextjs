import ResetPasswordForm from "./ResetPasswordForm";

type PageProps = {
  searchParams: Promise<{
    token?: string | string[];
  }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const token = Array.isArray(params.token)
    ? params.token[0] ?? null
    : params.token ?? null;

  return <ResetPasswordForm token={token} />;
}