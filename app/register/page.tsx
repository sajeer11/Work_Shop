import { Suspense } from "react";
import authPagesJson from "../_data/auth-pages.json";
import type { AuthPagesContent } from "../_data/page-content.types";
import DarkAuthForm from "../dark-version/components/DarkAuthForm";

const authPages = authPagesJson as AuthPagesContent;

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <DarkAuthForm {...authPages.register} />
    </Suspense>
  );
}
