export const DOMCustomEventType = {
  TWITTER_EMBED: 'twickr_twitter_embed',
};

export const SPORTS = {
  CRICKET: 'cricket',
  FOOTBALL: 'football',
  F1: 'formula1',
};

export const HOTSTAR_DEFAULT_SPORT = 'sports';

export const EVENTS = {
  IPL: 'indian-premier-league',
  T20_WC: 'icc-mens-t20-world-cup',
  NZ_TOUR_OF_INDIA: 'new-zealand-tour-of-india-202122',
  SYED_MUSHTAQ_ALI_TROPHY: 'syed-mushtaq-ali-trophy',
};

export const SUPPORTED_SPORTS = [SPORTS.FOOTBALL, SPORTS.F1];
export const FALLBACK_SUPPORTED_SPORTS = [...SUPPORTED_SPORTS, SPORTS.CRICKET];
export const SUPPORTED_EVENTS = [
  EVENTS.IPL,
  EVENTS.T20_WC,
  EVENTS.NZ_TOUR_OF_INDIA,
  EVENTS.SYED_MUSHTAQ_ALI_TROPHY,
];

export const TWEETS_LOCAL_STORAGE_PREFIX = 'twickr_tweets_';

export const MESSAGE_ACTIONS = {
  GA_SIDEBAR_LOADED: 'GA_SIDEBAR_LOADED',
  GA_TWEET_EMBEDDED: 'GA_TWEET_EMBEDDED',
  GA_SIDEBAR_DISCONNECTED: 'GA_SIDEBAR_DISCONNECTED',
};
