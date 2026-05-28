import SettingTabs from "./components/settings-pages";
import SettingsHeader from "./components/settings-header";

export default function Settings() {
  return (
    <section className="flex flex-col gap-6 pt-8 max-w-[768px]">
      <SettingsHeader />
      <SettingTabs />
    </section>
  );
}
