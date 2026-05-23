export type SubscribePayload = {
	email: string;
};

export type SubscribeResponse = {
	status: string;
	message: string;
	data: {
		email: string;
		subscribed_at: string;
	};
};
