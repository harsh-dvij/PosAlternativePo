import "server-only";

import { createIntl } from "@formatjs/intl";
import type { Locale } from "@/lib/definitions";

async function loadMessages(locale: Locale) {
  try {
    return (await import(`../lang/${locale}.json`)).default;
  } catch {
    return (await import(`../lang/en.json`)).default;
  }
}

export async function getIntl(locale: Locale) {
  return createIntl({
    locale: locale,
    messages: await loadMessages(locale),
  });
}
