import { getCrowdinMessages } from "@/lib/crowdin-messages";
import { Locale } from "@/lib/definitions";

interface Props {
  params: Promise<{ lang: Locale }>;
}

export default async function Page(props: Props) {
  const { lang } = await props.params;
  const messages = await getCrowdinMessages(lang);
  const entries = Object.entries(messages).sort(([a], [b]) => a.localeCompare(b));

  return (
    <ul className="font-mono text-sm leading-relaxed">
      {entries.map(([key, value]) => (
        <li key={key}>
          {key}: {value}
        </li>
      ))}
    </ul>
  );
}
