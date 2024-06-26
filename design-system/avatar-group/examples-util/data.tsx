export const RANDOM_USERS = [
	{ email: 'chaki@me.com', name: 'Chaki Caronni' },
	{ email: 'nanop@outlook.com', name: 'Nanop Rgiersig' },
	{ email: 'dowdy@outlook.com', name: 'Dowdy Metzzo' },
	{ email: 'daveewart@msn.com', name: 'Daveewart Grdschl' },
	{ email: 'fwitness@optonline.net', name: 'Fwitness Tezbo' },
	{ email: 'nighthawk@yahoo.com', name: 'Nighthawk Wikinerd' },
	{ email: 'naupa@me.com', name: 'Naupa Telbij' },
	{ email: 'jsmith@verizon.net', name: 'Jsmith Rnelson' },
	{ email: 'maneesh@msn.com', name: 'Maneesh Solomon' },
	{ email: 'kiddailey@yahoo.com', name: 'Kiddailey Kodeman' },
	{ email: 'kodeman@att.net', name: 'Kodeman Kiddailey' },
	{ email: 'solomon@att.net', name: 'Solomon Maneesh' },
	{ email: 'rnelson@optonline.net', name: 'Rnelson Jsmith' },
	{ email: 'telbij@msn.com', name: 'Telbij Naupa' },
	{ email: 'wikinerd@gmail.com', name: 'Wikinerd Nighthawk' },
	{ email: 'tezbo@optonline.net', name: 'Tezbo Fwitness' },
	{ email: 'grdschl@att.net', name: 'Grdschl Daveewart' },
	{ email: 'metzzo@msn.com', name: 'Metzzo Dowdy' },
	{ email: 'rgiersig@att.net', name: 'Rgiersig Nanop' },
	{ email: 'caronni@optonline.net', name: 'Caronni Chaki' },
];

// See https://randomuser.me/copyright — all images were supplied by people who gave their consent for them to be used on live websites (not just mockups)
export const getFreeToUseAvatarImage = (number: number) =>
	`https://randomuser.me/api/portraits/${number % 2 === 0 ? 'men' : 'women'}/${number}.jpg`;
