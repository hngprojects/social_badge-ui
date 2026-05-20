import { BadgeData } from "../../types/badge-published/badge";
import LiveHeroBanner from "../../components/badge-published/live-hero-banner";
import ShareableLinkCard from "../../components/badge-published/shareable-link-card";
import SpreadTheWord from "../../components/badge-published/spread-the-word";
import EmbedNewsletter from "../../components/badge-published/embed-newsletter";
import WhatsNext from "../../components/badge-published/whats-next";
const BADGE_DATA: BadgeData = {
	name: "Achieveher Summit '26",
	slug: "achieveher",
	url: "badge.build/achieveher",
	fullUrl: "https://badge.build/achieveher",
	imageUrl: "badge.build/achieveher.png",
	embedCode: `<a href="https://badge.build/achieveher">\n  <img src="badge.build/achieveher.png"/>\n</a>`,
};

export default function page() {
	return (
		<div className="w-[90%] bordet max-w-227 mx-auto">
			<LiveHeroBanner badgeName={BADGE_DATA.name} />
			<ShareableLinkCard url={BADGE_DATA.url} fullUrl={BADGE_DATA.fullUrl} />
			<SpreadTheWord url={BADGE_DATA.fullUrl} badgeName={BADGE_DATA.name} />
			<div className="mt-6">
				<EmbedNewsletter embedCode={BADGE_DATA.embedCode} />
			</div>
			<WhatsNext />
		</div>
	);
}
