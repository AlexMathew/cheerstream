from enum import Enum

DEFAULT_VALUE = "default"
MOST_RECENT_TWEET_TIMESTAMP_KEY = "most_recent_tweet_timestamp"


class Sports(Enum):
    CRICKET = "cricket"
    FOOTBALL = "football"
    F1 = "formula1"


class CricketEvents(Enum):
    IPL = "tata-ipl-2022"
    IPL_ORIGINAL = "indian-premier-league"
    T20_WC = "icc-mens-t20-world-cup"
    NZ_TOUR_OF_INDIA = "new-zealand-tour-of-india-202122"
    ASIA_CUP = "asia-cup-2022"
    ASIA_CUP_ALT = "mens-t20-asia-cup"


class FootballEvents(Enum):
    ENGLISH_PREMIER_LEAGUE = "english-premier-league"
    INDIAN_SUPER_LEAGUE = "indian-super-league"


class IPLTeams(Enum):
    CSK = "chennai-super-kings"
    DC = "delhi-capitals"
    GT = "gujarat-titans"
    KKR = "kolkata-knight-riders"
    LSG = "lucknow-super-giants"
    MI = "mumbai-indians"
    PBKS = "punjab-kings"
    RCB = "royal-challengers-bangalore"
    RR = "rajasthan-royals"
    SRH = "sunrisers-hyderabad"


class IPLTeamsAbbrev(Enum):
    CSK = "csk"
    DC = "dc"
    GT = "gt"
    KKR = "kkr"
    LSG = "lsg"
    MI = "mi"
    PBKS = "pbks"
    RCB = "rcb"
    RR = "rr"
    SRH = "srh"


class CricketBilateralSeriesTeams(Enum):
    IND = "india"
    NZ = "new-zealand"


class T20WCTeams(Enum):
    AFG = "afghanistan"
    AUS = "australia"
    BAN = "bangladesh"
    ENG = "england"
    IND = "india"
    IRE = "ireland"
    NAM = "namibia"
    NED = "netherlands"
    NZ = "new-zealand"
    OMA = "oman"
    PAK = "pakistan"
    PNG = "papua-new-guinea"
    SA = "south-africa"
    SCO = "scotland"
    SL = "sri-lanka"
    WI = "west-indies"


class EPLTeams(Enum):
    ARS = "arsenal"
    AVL = "aston-villa"
    BRE = "brentford"
    BHA = "brighton"
    BUR = "burnley"
    CHE = "chelsea"
    CRY = "crystal-palace"
    EVE = "everton"
    LEE = "leeds-united"
    LEI = "leicester"
    LIV = "liverpool"
    MCI = "manchester-city"
    MUN = "manchester-united"
    NEW = "newcastle"
    NOR = "norwich"
    SOU = "southampton"
    TOT = "tottenham"
    WAT = "watford"
    WHU = "west-ham"
    WOL = "wolves"


EPLTeamsList = [team.value for team in EPLTeams]


class ISLTeams(Enum):
    ATK = "atkmb"
    BEN = "bengaluru"
    CHE = "chennaiyin"
    EBE = "east-bengal"
    GOA = "goa"
    HYD = "hyderabad"
    JAM = "jamshedpur"
    KER = "kerala-blasters"
    MUM = "mumbai-city"
    NEU = "northeast-united"
    ODI = "odisha"


ISLTeamsList = [team.value for team in ISLTeams]


class F1Teams(Enum):
    ALFA_ROMEO = "alfa_romeo"
    ALPHATAURI = "alphatauri"
    ALPINE = "alpine"
    ASTON_MARTIN = "aston_martin"
    FERRARI = "ferrari"
    HAAS = "haas"
    MCLAREN = "mclaren"
    MERCEDES = "mercedes"
    RED_BULL = "red_bull"
    WILLIAMS = "williams"


PLACEHOLDER_KEEP_ALIVE = "placeholder_keep_alive"
