import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../components/Dashboard"),
  { ssr: false }
);

export default function Page() {
  return <DynamicComponentWithNoSSR />;
}
