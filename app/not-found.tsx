import { redirect } from "next/navigation";
import { useLocale } from 'next-intl';
export default function Notfound() {
  const local = useLocale();

  redirect(`/${local}/not-found`)
}
