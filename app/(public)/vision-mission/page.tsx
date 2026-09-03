import { redirect } from "next/navigation";

// Vision & Mission content has been merged into the About Us page.
export default function VisionMissionPage() {
  redirect("/about");
}

