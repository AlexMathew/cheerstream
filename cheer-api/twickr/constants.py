from enum import Enum

DEFAULT_VALUE = "default"


class Sports(Enum):
    CRICKET = "cricket"
    FOOTBALL = "football"
    F1 = "formula1"


class Events(Enum):
    IPL = "indian-premier-league"
    T20_WC = "icc-mens-t20-world-cup"


class IPLTeams(Enum):
    CSK = "chennai-super-kings"
    DC = "delhi-capitals"
    KKR = "kolkata-knight-riders"
    MI = "mumbai-indians"
    PBKS = "punjab-kings"
    RCB = "royal-challengers-bangalore"
    RR = "rajasthan-royals"
    SRH = "sunrisers-hyderabad"


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
